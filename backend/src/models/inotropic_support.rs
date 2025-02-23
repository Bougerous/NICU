use diesel::prelude::*;
use serde::{Deserialize, Serialize};
use chrono::{DateTime, Utc};

#[derive(Debug, Serialize, Deserialize, Queryable, Insertable)]
#[diesel(table_name = inotropic_supports)]
pub struct InotropicSupport {
    pub id: i32,
    pub baby_id: i32,
    pub drug_name: Option<String>,
    pub rationale: Option<String>,
    pub ampule_composition: Option<String>,
    pub units_per_ml: Option<String>,
    pub total_units: Option<String>,
    pub mixing_fluid_amount: Option<String>,
    pub mixing_fluid_composition: Option<String>,
    pub flow_rate: Option<f32>,
    pub flow_rate_units: Option<String>, // e.g., "ml/hr", "mcg/kg/min"
    pub start_time: DateTime<Utc>,
    pub end_time: Option<DateTime<Utc>>,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Deserialize, Insertable)]
#[diesel(table_name = inotropic_supports)]
pub struct NewInotropicSupport {
    pub baby_id: i32,
    pub drug_name: Option<String>,
    pub rationale: Option<String>,
    pub ampule_composition: Option<String>,
    pub units_per_ml: Option<String>,
    pub total_units: Option<String>,
    pub mixing_fluid_amount: Option<String>,
    pub mixing_fluid_composition: Option<String>,
    pub flow_rate: Option<f32>,
    pub flow_rate_units: Option<String>, // e.g., "ml/hr", "mcg/kg/min"
    pub start_time: DateTime<Utc>,
    pub end_time: Option<DateTime<Utc>>,
}

table! {
    inotropic_supports (id) {
        id -> Int4,
        baby_id -> Int4,
        drug_name -> Nullable<Varchar>,
        rationale -> Nullable<Varchar>,
        ampule_composition -> Nullable<Varchar>,
        units_per_ml -> Nullable<Varchar>,
        total_units -> Nullable<Varchar>,
        mixing_fluid_amount -> Nullable<Varchar>,
        mixing_fluid_composition -> Nullable<Varchar>,
        flow_rate -> Nullable<Float4>,
        flow_rate_units -> Nullable<Varchar>,
        start_time -> Timestamptz,
        end_time -> Nullable<Timestamptz>,
        created_at -> Timestamptz,
        updated_at -> Timestamptz,
    }
}

joinable!(inotropic_supports -> babies (baby_id));

allow_tables_to_appear_in_same_query!(babies, inotropic_supports);

impl InotropicSupport {
    pub async fn create(new_inotropic_support: NewInotropicSupport, conn: &DbConn) -> Result<Self, diesel::result::Error> {
        use crate::schema::inotropic_supports::dsl::*;

        let res = diesel::insert_into(inotropic_supports)
            .values(&new_inotropic_support)
            .get_result::<InotropicSupport>(&conn.pg_conn);
        
        match res {
            Ok(inotropic_support) => Ok(inotropic_support),
            Err(e) => Err(e)
        }
    }

    pub async fn read_by_id(setting_id: i32, conn: &DbConn) -> Result<Self, diesel::result::Error> {
        use crate::schema::inotropic_supports::dsl::*;
        inotropic_supports.filter(id.eq(setting_id)).first::<InotropicSupport>(&conn.pg_conn)
    }

    pub async fn read_all_by_baby_id(baby_id_param: i32, conn: &DbConn) -> Result<Vec<Self>, diesel::result::Error> {
        use crate::schema::inotropic_supports::dsl::*;
        inotropic_supports.filter(baby_id.eq(baby_id_param)).load::<InotropicSupport>(&conn.pg_conn)
    }


    pub async fn update_by_id(setting_id: i32, updated_setting: NewInotropicSupport, conn: &DbConn) -> Result<Self, diesel::result::Error> {
        use crate::schema::inotropic_supports::dsl::*;
        diesel::update(inotropic_supports.filter(id.eq(setting_id)))
            .set((
                baby_id.eq(updated_setting.baby_id),
                drug_name.eq(updated_setting.drug_name),
                rationale.eq(updated_setting.rationale),
                ampule_composition.eq(updated_setting.ampule_composition),
                units_per_ml.eq(updated_setting.units_per_ml),
                total_units.eq(updated_setting.total_units),
                mixing_fluid_amount.eq(updated_setting.mixing_fluid_amount),
                mixing_fluid_composition.eq(updated_setting.mixing_fluid_composition),
                flow_rate.eq(updated_setting.flow_rate),
                flow_rate_units.eq(updated_setting.flow_rate_units),
                start_time.eq(updated_setting.start_time),
                end_time.eq(updated_setting.end_time),
                updated_at.eq(Utc::now()),
            ))
            .get_result::<InotropicSupport>(&conn.pg_conn)
    }

    pub async fn delete_by_id(setting_id: i32, conn: &DbConn) -> Result<usize, diesel::result::Error> {
        use crate::schema::inotropic_supports::dsl::*;
        diesel::delete(inotropic_supports.filter(id.eq(setting_id))).execute(&conn.pg_conn)
    }
}