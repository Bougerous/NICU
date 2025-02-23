use diesel::prelude::*;
use serde::{Deserialize, Serialize};

use crate::models::ventilator_setting::VentilatorSetting;

#[derive(Debug, Serialize, Deserialize, Queryable, Insertable)]
#[diesel(table_name = cpap_settings)]
pub struct CpapSetting {
    pub id: i32,
    pub ventilator_setting_id: i32,
    pub peep: Option<f32>, // cmH2O - Positive End-Expiratory Pressure
    pub fio2: Option<f32>, // % - Fraction of Inspired Oxygen
}

#[derive(Debug, Deserialize, Insertable)]
#[diesel(table_name = cpap_settings)]
pub struct NewCpapSetting {
    pub ventilator_setting_id: i32,
    pub peep: Option<f32>, // cmH2O - Positive End-Expiratory Pressure
    pub fio2: Option<f32>, // % - Fraction of Inspired Oxygen
}

table! {
    cpap_settings (id) {
        id -> Int4,
        ventilator_setting_id -> Int4,
        peep -> Nullable<Float4>,
        fio2 -> Nullable<Float4>,
    }
}

joinable!(cpap_settings -> ventilator_settings (ventilator_setting_id));

allow_tables_to_appear_in_same_query!(ventilator_settings, cpap_settings);

impl CpapSetting {
    pub async fn create(new_cpap_setting: NewCpapSetting, conn: &DbConn) -> Result<Self, diesel::result::Error> {
        use crate::schema::cpap_settings::dsl::*;

        let res = diesel::insert_into(cpap_settings)
            .values(&new_cpap_setting)
            .get_result::<CpapSetting>(&conn.pg_conn);
        
        match res {
            Ok(cpap_setting) => Ok(cpap_setting),
            Err(e) => Err(e)
        }
    }

    pub async fn read_by_id(setting_id: i32, conn: &DbConn) -> Result<Self, diesel::result::Error> {
        use crate::schema::cpap_settings::dsl::*;
        cpap_settings.filter(id.eq(setting_id)).first::<CpapSetting>(&conn.pg_conn)
    }


    pub async fn update_by_id(setting_id: i32, updated_setting: NewCpapSetting, conn: &DbConn) -> Result<Self, diesel::result::Error> {
        use crate::schema::cpap_settings::dsl::*;
        diesel::update(cpap_settings.filter(id.eq(setting_id)))
            .set((
                ventilator_setting_id.eq(updated_setting.ventilator_setting_id),
                peep.eq(updated_setting.peep),
                fio2.eq(updated_setting.fio2),
            ))
            .get_result::<CpapSetting>(&conn.pg_conn)
    }

    pub async fn delete_by_id(setting_id: i32, conn: &DbConn) -> Result<usize, diesel::result::Error> {
        use crate::schema::cpap_settings::dsl::*;
        diesel::delete(cpap_settings.filter(id.eq(setting_id))).execute(&conn.pg_conn)
    }
}