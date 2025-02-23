use diesel::prelude::*;
use serde::{Deserialize, Serialize};
use chrono::{DateTime, Utc};

#[derive(Debug, Serialize, Deserialize, Queryable, Insertable)]
#[diesel(table_name = cannula_sites)]
pub struct CannulaSite {
    pub id: i32,
    pub vitals_id: i32,
    pub site_name: String,
    pub insertion_time: Option<DateTime<Utc>>,
    pub line_type: Option<String>,
    pub xray_post_insertion: Option<bool>,
    pub time_since_insertion: Option<i32>,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Deserialize, Insertable)]
#[diesel(table_name = cannula_sites)]
pub struct NewCannulaSite {
    pub vitals_id: i32,
    pub site_name: String,
    pub insertion_time: Option<DateTime<Utc>>,
    pub line_type: Option<String>,
    pub xray_post_insertion: Option<bool>,
    pub time_since_insertion: Option<i32>,
}

table! {
    cannula_sites (id) {
        id -> Int4,
        vitals_id -> Int4,
        site_name -> Varchar,
        insertion_time -> Nullable<Timestamp>,
        line_type -> Nullable<Varchar>,
        xray_post_insertion -> Nullable<Bool>,
        time_since_insertion -> Nullable<Int4>,
        created_at -> Timestamp,
        updated_at -> Timestamp,
    }
}

joinable!(cannula_sites -> vitals (vitals_id));

allow_tables_to_appear_in_same_query!(cannula_sites, vitals);