use rocket::serde::Json;
use rocket::State;
use rocket::response::status::Created;
use rocket::http::uri::Absolute;
use crate::db::DbConn;
use crate::models::inotropic_support::{InotropicSupport, NewInotropicSupport};
use crate::api::api_response::ApiResponse;

#[post("/", data = "<new_inotropic_support>")]
pub async fn create_inotropic_support(
    conn: &State<DbConn>,
    new_inotropic_support: Json<NewInotropicSupport>,
    uri: &Absolute<'_>
) -> ApiResponse<Created<Json<InotropicSupport>>> {
    let inotropic_support = NewInotropicSupport {
        baby_id: new_inotropic_support.baby_id,
        drug_name: new_inotropic_support.drug_name.clone(),
        rationale: new_inotropic_support.rationale.clone(),
        ampule_composition: new_inotropic_support.ampule_composition.clone(),
        units_per_ml: new_inotropic_support.units_per_ml.clone(),
        total_units: new_inotropic_support.total_units.clone(),
        mixing_fluid_amount: new_inotropic_support.mixing_fluid_amount.clone(),
        mixing_fluid_composition: new_inotropic_support.mixing_fluid_composition.clone(),
        flow_rate: new_inotropic_support.flow_rate,
        flow_rate_units: new_inotropic_support.flow_rate_units.clone(),
        start_time: new_inotropic_support.start_time,
        end_time: new_inotropic_support.end_time,
    };

    let result = InotropicSupport::create(inotropic_support, &conn).await;

    match result {
        Ok(inotropic_support) => {
            let inotropic_support_uri = uri.to_string() + "/" + &inotropic_support.id.to_string();
            ApiResponse::success(Created::new(inotropic_support_uri).body(Json(inotropic_support)))
        }
        Err(e) => ApiResponse::error(e.into())
    }
}

#[get("/{id}")]
pub async fn get_inotropic_support(
    conn: &State<DbConn>,
    id: i32,
) -> ApiResponse<Json<InotropicSupport>> {
    let result = InotropicSupport::read_by_id(id, &conn).await;
    match result {
        Ok(inotropic_support) => ApiResponse::success(Json(inotropic_support)),
        Err(e) => ApiResponse::error(e.into()),
    }
}

#[get("/babies/<baby_id>")]
pub async fn get_baby_inotropic_supports(
    conn: &State<DbConn>,
    baby_id: i32,
) -> ApiResponse<Json<Vec<InotropicSupport>>> {
    let result = InotropicSupport::read_all_by_baby_id(baby_id, &conn).await;
    match result {
        Ok(inotropic_supports) => ApiResponse::success(Json(inotropic_supports)),
        Err(e) => ApiResponse::error(e.into()),
    }
}


#[put("/{id}", data = "<inotropic_support_update>")]
pub async fn update_inotropic_support(
    conn: &State<DbConn>,
    id: i32,
    inotropic_support_update: Json<NewInotropicSupport>,
) -> ApiResponse<Json<InotropicSupport>> {
    let result = InotropicSupport::update_by_id(id, inotropic_support_update.into_inner(), &conn).await;
    match result {
        Ok(inotropic_support) => ApiResponse::success(Json(inotropic_support)),
        Err(e) => ApiResponse::error(e.into()),
    }
}

#[delete("/{id}")]
pub async fn delete_inotropic_support(
    conn: &State<DbConn>,
    id: i32,
) -> ApiResponse<()> {
    let result = InotropicSupport::delete_by_id(id, &conn).await;
    match result {
        Ok(_) => ApiResponse::success(()),
        Err(e) => ApiResponse::error(e.into()),
    }
}