use diesel::prelude::*;
use serde::{Deserialize, Serialize};
use chrono::{DateTime, Utc};
use serde_json::Value as JsonValue;

#[derive(Debug, Serialize, Deserialize, Queryable, Insertable)]
#[diesel(table_name = inotropic_supports)]
pub struct InotropicSupport {
    pub id: i32,
    pub vitals_id: i32,
    pub drug_used: String,
    pub rationale: Option<String>,
    pub ampule_details_json: Option<JsonValue>,
    pub mixing_details_json: Option<JsonValue>,
    pub flow_rate: Option<f32>,
    pub flow_rate_unit: Option<String>,
    pub escalation_deescalation_events_json: Option<JsonValue>,
    pub start_stop_events_json: Option<JsonValue>,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Deserialize, Insertable)]
#[diesel(table_name = inotropic_supports)]
pub struct NewInotropicSupport {
    pub vitals_id: i32,
    pub drug_used: String,
    pub rationale: Option<String>,
    pub ampule_details_json: Option<JsonValue>,
    pub mixing_details_json: Option<JsonValue>,
    pub flow_rate: Option<f32>,
    pub flow_rate_unit: Option<String>,
    pub escalation_deescalation_events_json: Option<JsonValue>,
    pub start_stop_events_json: Option<JsonValue>,
}

table! {
    inotropic_supports (id) {
        id -> Int4,
        vitals_id -> Int4,
        drug_used -> Varchar,
        rationale -> Nullable<Text>,
        ampule_details_json -> Nullable<Jsonb>,
        mixing_details_json -> Nullable<Jsonb>,
        flow_rate -> Nullable<Float4>,
        flow_rate_unit -> Nullable<Varchar>,
        escalation_deescalation_events_json -> Nullable<Jsonb>,
        start_stop_events_json -> Nullable<Jsonb>,
        created_at -> Timestamp,
        updated_at -> Timestamp,
    }
}

joinable!(inotropic_supports -> vitals (vitals_id));

allow_tables_to_appear_in_same_query!(inotropic_supports, vitals);