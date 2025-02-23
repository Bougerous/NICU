use diesel::prelude::*;
use serde::{Deserialize, Serialize};
use chrono::{DateTime, Utc};

#[derive(Debug, Serialize, Deserialize, Queryable, Insertable)]
#[diesel(table_name = ventilator_settings)]
pub struct VentilatorSetting {
    pub id: i32,
    pub baby_id: i32,
    pub start_time: DateTime<Utc>,
    pub end_time: Option<DateTime<Utc>>,
    pub setting_type: String, // Enum: CPAP, HFOV, HFNC, VentilatorAssist, VentilatorControl
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Deserialize, Insertable)]
#[diesel(table_name = ventilator_settings)]
pub struct NewVentilatorSetting {
    pub baby_id: i32,
    pub start_time: DateTime<Utc>,
    pub end_time: Option<DateTime<Utc>>,
    pub setting_type: String, // Enum: CPAP, HFOV, HFNC, VentilatorAssist, VentilatorControl
}

table! {
    ventilator_settings (id) {
        id -> Int4,
        baby_id -> Int4,
        start_time -> Timestamptz,
        end_time -> Nullable<Timestamptz>,
        setting_type -> Varchar,
        created_at -> Timestamptz,
        updated_at -> Timestamptz,
    }
}

joinable!(ventilator_settings -> babies (baby_id));

allow_tables_to_appear_in_same_query!(babies, ventilator_settings);

impl VentilatorSetting {
    pub async fn create(new_ventilator_setting: NewVentilatorSetting, conn: &DbConn) -> Result<Self, diesel::result::Error> {
        use crate::schema::ventilator_settings::dsl::*;

        let res = diesel::insert_into(ventilator_settings)
            .values(&new_ventilator_setting)
            .get_result::<VentilatorSetting>(&conn.pg_conn);
        
        match res {
            Ok(ventilator_setting) => Ok(ventilator_setting),
            Err(e) => Err(e)
        }
    }

    pub async fn read_by_id(setting_id: i32, conn: &DbConn) -> Result<Self, diesel::result::Error> {
        use crate::schema::ventilator_settings::dsl::*;
        ventilator_settings.filter(id.eq(setting_id)).first::<VentilatorSetting>(&conn.pg_conn)
    }

    pub async fn read_all_by_baby_id(baby_id_param: i32, conn: &DbConn) -> Result<Vec<Self>, diesel::result::Error> {
        use crate::schema::ventilator_settings::dsl::*;
        ventilator_settings.filter(baby_id.eq(baby_id_param)).load::<VentilatorSetting>(&conn.pg_conn)
    }

    pub async fn update_by_id(setting_id: i32, updated_setting: NewVentilatorSetting, conn: &DbConn) -> Result<Self, diesel::result::Error> {
        use crate::schema::ventilator_settings::dsl::*;
        diesel::update(ventilator_settings.filter(id.eq(setting_id)))
            .set((
                baby_id.eq(updated_setting.baby_id),
                start_time.eq(updated_setting.start_time),
                end_time.eq(updated_setting.end_time),
                setting_type.eq(updated_setting.setting_type),
                updated_at.eq(Utc::now()),
            ))
            .get_result::<VentilatorSetting>(&conn.pg_conn)
    }

    pub async fn delete_by_id(setting_id: i32, conn: &DbConn) -> Result<usize, diesel::result::Error> {
        use crate::schema::ventilator_settings::dsl::*;
        diesel::delete(ventilator_settings.filter(id.eq(setting_id))).execute(&conn.pg_conn)
    }
}