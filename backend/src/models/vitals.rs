use diesel::prelude::*;
use serde::{Deserialize, Serialize};
use chrono::{DateTime, Utc};

#[derive(Debug, Serialize, Deserialize, Queryable, Insertable)]
#[diesel(table_name = vitals)]
pub struct Vitals {
    pub id: i32,
    pub baby_id: i32,
    pub heart_rate: Option<i32>,
    pub respiratory_rate: Option<i32>,
    pub blood_pressure_systolic: Option<i32>,
    pub blood_pressure_diastolic: Option<i32>,
    pub temperature: Option<f32>,
    pub capillary_refill_time: Option<i32>,
    pub perfusion_index: Option<f32>,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Deserialize, Insertable)]
#[diesel(table_name = vitals)]
pub struct NewVitals {
    pub baby_id: i32,
    pub heart_rate: Option<i32>,
    pub respiratory_rate: Option<i32>,
    pub blood_pressure_systolic: Option<i32>,
    pub blood_pressure_diastolic: Option<i32>,
    pub temperature: Option<f32>,
    pub capillary_refill_time: Option<i32>,
    pub perfusion_index: Option<f32>,
}

table! {
    vitals (id) {
        id -> Int4,
        baby_id -> Int4,
        heart_rate -> Nullable<Int4>,
        respiratory_rate -> Nullable<Int4>,
        blood_pressure_systolic -> Nullable<Int4>,
        blood_pressure_diastolic -> Nullable<Int4>,
        temperature -> Nullable<Float4>,
        capillary_refill_time -> Nullable<Int4>,
        perfusion_index -> Nullable<Float4>,
        created_at -> Timestamptz,
        updated_at -> Timestamptz,
    }
}

joinable!(vitals -> babies (baby_id));

allow_tables_to_appear_in_same_query!(babies, vitals);