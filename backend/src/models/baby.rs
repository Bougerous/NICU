use diesel::prelude::*;
use serde::{Deserialize, Serialize};
use chrono::{DateTime, Utc};

#[derive(Debug, Serialize, Deserialize, Queryable, Insertable)]
#[diesel(table_name = babies)]
pub struct Baby {
    pub id: i32,
    pub baby_name: Option<String>,
    pub sex: String, // options: "boy", "girl", "unknown", required
    pub birth_weight: Option<f32>,
    pub head_circumference: Option<i32>,
    pub length: Option<i32>,
    pub gestational_age_weeks: Option<i32>,
    pub gestational_age_days: Option<i32>,
    pub corrected_gestational_age_weeks: Option<i32>,
    pub corrected_gestational_age_days: Option<i32>,
    pub time_of_birth: Option<DateTime<Utc>>,
    pub hour_of_life: Option<i32>, // calculated
    pub time_of_first_meconium: Option<DateTime<Utc>>,
    pub time_of_first_urine: Option<DateTime<Utc>>,
    pub msaf_induced: Option<bool>,
    pub msaf_method_used: Option<String>,
    pub msaf_toco_changes: Option<String>, // dropdown with common toco changes
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Deserialize, Insertable)]
#[diesel(table_name = babies)]
pub struct NewBaby {
    pub baby_name: Option<String>,
    pub sex: String, // options: "boy", "girl", "unknown", required
    pub birth_weight: Option<f32>,
    pub head_circumference: Option<i32>,
    pub length: Option<i32>,
    pub gestational_age_weeks: Option<i32>,
    pub gestational_age_days: Option<i32>,
    pub corrected_gestational_age_weeks: Option<i32>,
    pub corrected_gestational_age_days: Option<i32>,
    pub time_of_birth: Option<DateTime<Utc>>,
    pub time_of_first_meconium: Option<DateTime<Utc>>,
    pub time_of_first_urine: Option<DateTime<Utc>>,
    pub msaf_induced: Option<bool>,
    pub msaf_method_used: Option<String>,
    pub msaf_toco_changes: Option<String>,
}

table! {
    babies (id) {
        id -> Int4,
        baby_name -> Nullable<Varchar>,
        sex -> Varchar,
        birth_weight -> Nullable<Float4>,
        head_circumference -> Nullable<Int4>,
        length -> Nullable<Int4>,
        gestational_age_weeks -> Nullable<Int4>,
        gestational_age_days -> Nullable<Int4>,
        corrected_gestational_age_weeks -> Nullable<Int4>,
        corrected_gestational_age_days -> Nullable<Int4>,
        time_of_birth -> Nullable<Timestamptz>,
        hour_of_life -> Nullable<Int4>,
        time_of_first_meconium -> Nullable<Timestamptz>,
        time_of_first_urine -> Nullable<Timestamptz>,
        msaf_induced -> Nullable<Bool>,
        msaf_method_used -> Nullable<Varchar>,
        msaf_toco_changes -> Nullable<Varchar>,
        created_at -> Timestamptz,
        updated_at -> Timestamptz,
    }
}