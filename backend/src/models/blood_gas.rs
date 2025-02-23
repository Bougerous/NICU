use diesel::prelude::*;
use serde::{Deserialize, Serialize};
use chrono::{DateTime, Utc};

#[derive(Debug, Serialize, Deserialize, Queryable, Insertable)]
#[diesel(table_name = blood_gases)]
pub struct BloodGas {
    pub id: i32,
    pub baby_id: i32,
    pub blood_gas_type: String, // Enum: ABG, VBG, Capillary
    pub ph: Option<f32>,
    pub pco2: Option<f32>,
    pub po2: Option<f32>,
    pub hco3: Option<f32>,
    pub base_excess: Option<f32>,
    pub lactate: Option<f32>,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Deserialize, Insertable)]
#[diesel(table_name = blood_gases)]
pub struct NewBloodGas {
    pub baby_id: i32,
    pub blood_gas_type: String, // Enum: ABG, VBG, Capillary
    pub ph: Option<f32>,
    pub pco2: Option<f32>,
    pub po2: Option<f32>,
    pub hco3: Option<f32>,
    pub base_excess: Option<f32>,
    pub lactate: Option<f32>,
}

table! {
    blood_gases (id) {
        id -> Int4,
        baby_id -> Int4,
        blood_gas_type -> Varchar,
        ph -> Nullable<Float4>,
        pco2 -> Nullable<Float4>,
        po2 -> Nullable<Float4>,
        hco3 -> Nullable<Float4>,
        base_excess -> Nullable<Float4>,
        lactate -> Nullable<Float4>,
        created_at -> Timestamptz,
        updated_at -> Timestamptz,
    }
}

joinable!(blood_gases -> babies (baby_id));

allow_tables_to_appear_in_same_query!(babies, blood_gases);