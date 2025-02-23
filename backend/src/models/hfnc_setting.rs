use diesel::prelude::*;
use serde::{Deserialize, Serialize};

use crate::models::ventilator_setting::VentilatorSetting;

#[derive(Debug, Serialize, Deserialize, Queryable, Insertable)]
#[diesel(table_name = hfnc_settings)]
pub struct HfncSetting {
    pub id: i32,
    pub ventilator_setting_id: i32,
    pub flow_rate: Option<f32>, // LPM - Flow rate
    pub fio2: Option<f32>,      // % - Fraction of Inspired Oxygen
}

#[derive(Debug, Deserialize, Insertable)]
#[diesel(table_name = hfnc_settings)]
pub struct NewHfncSetting {
    pub ventilator_setting_id: i32,
    pub flow_rate: Option<f32>, // LPM - Flow rate
    pub fio2: Option<f32>,      // % - Fraction of Inspired Oxygen
}

table! {
    hfnc_settings (id) {
        id -> Int4,
        ventilator_setting_id -> Int4,
        flow_rate -> Nullable<Float4>,
        fio2 -> Nullable<Float4>,
    }
}

joinable!(hfnc_settings -> ventilator_settings (ventilator_setting_id));

allow_tables_to_appear_in_same_query!(ventilator_settings, hfnc_settings);

impl HfncSetting {
    pub async fn create(new_hfnc_setting: NewHfncSetting, conn: &DbConn) -> Result<Self, diesel::result::Error> {
        use crate::schema::hfnc_settings::dsl::*;

        let res = diesel::insert_into(hfnc_settings)
            .values(&new_hfnc_setting)
            .get_result::<HfncSetting>(&conn.pg_conn);
        
        match res {
            Ok(hfnc_setting) => Ok(hfnc_setting),
            Err(e) => Err(e)
        }
    }

    pub async fn read_by_id(setting_id: i32, conn: &DbConn) -> Result<Self, diesel::result::Error> {
        use crate::schema::hfnc_settings::dsl::*;
        hfnc_settings.filter(id.eq(setting_id)).first::<HfncSetting>(&conn.pg_conn)
    }

    pub async fn update_by_id(setting_id: i32, updated_setting: NewHfncSetting, conn: &DbConn) -> Result<Self, diesel::result::Error> {
        use crate::schema::hfnc_settings::dsl::*;
        diesel::update(hfnc_settings.filter(id.eq(setting_id)))
            .set((
                ventilator_setting_id.eq(updated_setting.ventilator_setting_id),
                flow_rate.eq(updated_setting.flow_rate),
                fio2.eq(updated_setting.fio2),
            ))
            .get_result::<HfncSetting>(&conn.pg_conn)
    }

    pub async fn delete_by_id(setting_id: i32, conn: &DbConn) -> Result<usize, diesel::result::Error> {
        use crate::schema::hfnc_settings::dsl::*;
        diesel::delete(hfnc_settings.filter(id.eq(setting_id))).execute(&conn.pg_conn)
    }
}