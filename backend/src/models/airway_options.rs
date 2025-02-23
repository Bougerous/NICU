use diesel::prelude::*;
use serde::{Serialize, Deserialize};
use chrono::{DateTime, Utc};
use diesel::sql_types::Jsonb;

#[derive(Debug, Clone, Serialize, Deserialize, Queryable, Insertable, AsChangeset)]
#[diesel(table_name = airway_options)]
pub struct AirwayOption {
    pub id: i32,
    pub vitals_id: i32,
    pub option_type: String,
    pub option_name: String,
    pub fio2: Option<f32>,
    pub peep: Option<f32>,
    pub rate: Option<i32>,
    pub pip: Option<f32>,
    pub mode: Option<String>,
    pub settings_json: Option<serde_json::Value>,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Clone, Serialize, Deserialize, Insertable)]
#[diesel(table_name = airway_options)]
pub struct NewAirwayOption {
    pub vitals_id: i32,
    pub option_type: String,
    pub option_name: String,
    pub fio2: Option<f32>,
    pub peep: Option<f32>,
    pub rate: Option<i32>,
    pub pip: Option<f32>,
    pub mode: Option<String>,
    pub settings_json: Option<serde_json::Value>,
}

table! {
    airway_options (id) {
        id -> Int4,
        vitals_id -> Int4,
        option_type -> Varchar,
        option_name -> Varchar,
        fio2 -> Nullable<Float4>,
        peep -> Nullable<Float4>,
        rate -> Nullable<Int4>,
        pip -> Nullable<Float4>,
        mode -> Nullable<Varchar>,
        settings_json -> Nullable<Jsonb>,
        created_at -> Timestamp,
        updated_at -> Timestamp,
    }
}

joinable!(airway_options -> vitals (vitals_id));

allow_tables_to_appear_in_same_query!(airway_options, vitals);