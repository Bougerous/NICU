use diesel::prelude::*;
use serde::{Deserialize, Serialize};

use crate::models::ventilator_setting::VentilatorSetting;

#[derive(Debug, Serialize, Deserialize, Queryable, Insertable)]
#[diesel(table_name = hfov_settings)]
pub struct HfovSetting {
    pub id: i32,
    pub ventilator_setting_id: i32,
    pub amplitude: Option<f32>, // ΔP - Pressure amplitude
    pub frequency: Option<f32>, // Hz - Oscillations per second
    pub map: Option<f32>,       // cmH2O - Mean Airway Pressure
    pub fio2: Option<f32>,      // % - Fraction of Inspired Oxygen
    pub ie_ratio: Option<f32>,  // % - Inspiratory to Expiratory ratio
}

#[derive(Debug, Deserialize, Insertable)]
#[diesel(table_name = hfov_settings)]
pub struct NewHfovSetting {
    pub ventilator_setting_id: i32,
    pub amplitude: Option<f32>, // ΔP - Pressure amplitude
    pub frequency: Option<f32>, // Hz - Oscillations per second
    pub map: Option<f32>,       // cmH2O - Mean Airway Pressure
    pub fio2: Option<f32>,      // % - Fraction of Inspired Oxygen
    pub ie_ratio: Option<f32>,  // % - Inspiratory to Expiratory ratio
}

table! {
    hfov_settings (id) {
        id -> Int4,
        ventilator_setting_id -> Int4,
        amplitude -> Nullable<Float4>,
        frequency -> Nullable<Float4>,
        map -> Nullable<Float4>,
        fio2 -> Nullable<Float4>,
        ie_ratio -> Nullable<Float4>,
    }
}

joinable!(hfov_settings -> ventilator_settings (ventilator_setting_id));

allow_tables_to_appear_in_same_query!(ventilator_settings, hfov_settings);

impl HfovSetting {
    pub async fn create(new_hfov_setting: NewHfovSetting, conn: &DbConn) -> Result<Self, diesel::result::Error> {
        use crate::schema::hfov_settings::dsl::*;

        let res = diesel::insert_into(hfov_settings)
            .values(&new_hfov_setting)
            .get_result::<HfovSetting>(&conn.pg_conn);
        
        match res {
            Ok(hfov_setting) => Ok(hfov_setting),
            Err(e) => Err(e)
        }
    }

    pub async fn read_by_id(setting_id: i32, conn: &DbConn) -> Result<Self, diesel::result::Error> {
        use crate::schema::hfov_settings::dsl::*;
        hfov_settings.filter(id.eq(setting_id)).first::<HfovSetting>(&conn.pg_conn)
    }

    pub async fn update_by_id(setting_id: i32, updated_setting: NewHfovSetting, conn: &DbConn) -> Result<Self, diesel::result::Error> {
        use crate::schema::hfov_settings::dsl::*;
        diesel::update(hfov_settings.filter(id.eq(setting_id)))
            .set((
                ventilator_setting_id.eq(updated_setting.ventilator_setting_id),
                amplitude.eq(updated_setting.amplitude),
                frequency.eq(updated_setting.frequency),
                map.eq(updated_setting.map),
                fio2.eq(updated_setting.fio2),
                ie_ratio.eq(updated_setting.ie_ratio),
            ))
            .get_result::<HfovSetting>(&conn.pg_conn)
    }

    pub async fn delete_by_id(setting_id: i32, conn: &DbConn) -> Result<usize, diesel::result::Error> {
        use crate::schema::hfov_settings::dsl::*;
        diesel::delete(hfov_settings.filter(id.eq(setting_id))).execute(&conn.pg_conn)
    }
}