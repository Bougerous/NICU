use diesel::prelude::*;
use serde::{Deserialize, Serialize};

use super::ventilator_setting::VentilatorSetting;

#[derive(Debug, Serialize, Deserialize, Queryable, Insertable)]
#[diesel(table_name = ventilator_control_settings)]
pub struct VentilatorControlSetting {
    pub id: i32,
    pub ventilator_setting_id: i32,
    pub mode: Option<String>,          // Dropdown: VC-CMV, PC-CMV
    pub rate: Option<i32>,           // bpm - Breaths per minute
    pub pip: Option<f32>,            // cmH2O - Peak Inspiratory Pressure
    pub peep: Option<f32>,           // cmH2O - Positive End-Expiratory Pressure
    pub fio2: Option<f32>,           // % - Fraction of Inspired Oxygen
    pub inspiratory_time: Option<f32>, // s - Duration of inspiration
    pub flow: Option<f32>,           // LPM - Liters Per Minute (for Volume Control modes)
}

#[derive(Debug, Deserialize, Insertable)]
#[diesel(table_name = ventilator_control_settings)]
pub struct NewVentilatorControlSetting {
    pub ventilator_setting_id: i32,
    pub mode: Option<String>,          // Dropdown: VC-CMV, PC-CMV
    pub rate: Option<i32>,           // bpm - Breaths per minute
    pub pip: Option<f32>,            // cmH2O - Peak Inspiratory Pressure
    pub peep: Option<f32>,           // cmH2O - Positive End-Expiratory Pressure
    pub fio2: Option<f32>,           // % - Fraction of Inspired Oxygen
    pub inspiratory_time: Option<f32>, // s - Duration of inspiration
    pub flow: Option<f32>,           // LPM - Liters Per Minute (for Volume Control modes)
}

table! {
    ventilator_control_settings (id) {
        id -> Int4,
        ventilator_setting_id -> Int4,
        mode -> Nullable<Varchar>,
        rate -> Nullable<Int4>,
        pip -> Nullable<Float4>,
        peep -> Nullable<Float4>,
        fio2 -> Nullable<Float4>,
        inspiratory_time -> Nullable<Float4>,
        flow -> Nullable<Float4>,
    }
}

joinable!(ventilator_control_settings -> ventilator_settings (ventilator_setting_id));

allow_tables_to_appear_in_same_query!(ventilator_settings, ventilator_control_settings);

impl VentilatorControlSetting {
    pub async fn create(new_ventilator_control_setting: NewVentilatorControlSetting, conn: &DbConn) -> Result<Self, diesel::result::Error> {
        use crate::schema::ventilator_control_settings::dsl::*;

        let res = diesel::insert_into(ventilator_control_settings)
            .values(&new_ventilator_control_setting)
            .get_result::<VentilatorControlSetting>(&conn.pg_conn);
        
        match res {
            Ok(ventilator_control_setting) => Ok(ventilator_control_setting),
            Err(e) => Err(e)
        }
    }

    pub async fn read_by_id(setting_id: i32, conn: &DbConn) -> Result<Self, diesel::result::Error> {
        use crate::schema::ventilator_control_settings::dsl::*;
        ventilator_control_settings.filter(id.eq(setting_id)).first::<VentilatorControlSetting>(&conn.pg_conn)
    }

    pub async fn update_by_id(setting_id: i32, updated_setting: NewVentilatorControlSetting, conn: &DbConn) -> Result<Self, diesel::result::Error> {
        use crate::schema::ventilator_control_settings::dsl::*;
        diesel::update(ventilator_control_settings.filter(id.eq(setting_id)))
            .set((
                ventilator_setting_id.eq(updated_setting.ventilator_setting_id),
                mode.eq(updated_setting.mode),
                rate.eq(updated_setting.rate),
                pip.eq(updated_setting.pip),
                peep.eq(updated_setting.peep),
                fio2.eq(updated_setting.fio2),
                inspiratory_time.eq(updated_setting.inspiratory_time),
                flow.eq(updated_setting.flow),
            ))
            .get_result::<VentilatorControlSetting>(&conn.pg_conn)
    }

    pub async fn delete_by_id(setting_id: i32, conn: &DbConn) -> Result<usize, diesel::result::Error> {
        use crate::schema::ventilator_control_settings::dsl::*;
        diesel::delete(ventilator_control_settings.filter(id.eq(setting_id))).execute(&conn.pg_conn)
    }
}