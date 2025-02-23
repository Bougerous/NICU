use rocket::{get, post, put, delete, Route};
// Updated DbConn import, assuming the connection module is under db::pool
use crate::db::pool::DbConn;
// Updated models import with correct path and added DSL import
use crate::models::airway_options::AirwayOption;
use crate::models::airway_options::airway_options::dsl::airway_options;
use diesel::prelude::*;
// Removed unused imports:
// use diesel::pg::Pg;
// use diesel::sql_types::Jsonb;
use serde_json::Value;
use rocket::serde::json::Json;
use rocket::http::Status;

// Removed AsChangeset from AirwayOption to avoid updating the primary key.
#[derive(rocket::serde::Serialize, rocket::serde::Deserialize, Queryable, Insertable)] // changed here
#[serde(crate = "rocket::serde")]
use crate::api::api_response::ApiResponse;
use rocket::State;
use rocket::response::status::Created;
use rocket::http::uri::Absolute;

#[post("/", data = "<new_airway_option>")]
pub async fn create_airway_option(
    conn: &State<DbConn>,
    new_airway_option: Json<NewAirwayOption>,
    uri: &Absolute<'_>
) -> ApiResponse<Created<Json<AirwayOption>>> {
    let airway_option = NewAirwayOption {
        vitals_id: new_airway_option.vitals_id,
        option_type: new_airway_option.option_type.clone(),
        option_name: new_airway_option.option_name.clone(),
        fio2: new_airway_option.fio2,
        peep: new_airway_option.peep,
        rate: new_airway_option.rate,
        pip: new_airway_option.pip,
        mode: new_airway_option.mode.clone(),
        settings_json: new_airway_option.settings_json.clone(),
    };

    let result = AirwayOption::create(airway_option, &conn).await;

    match result {
        Ok(airway_option) => {
            let airway_option_uri = uri.to_string() + "/" + &airway_option.id.to_string();
            ApiResponse::success(Created::new(airway_option_uri).body(Json(airway_option)))
        }
        Err(e) => ApiResponse::error(e.into())
    }
}

#[get("/{id}")]
pub async fn get_airway_option(
    conn: &State<DbConn>,
    id: i32,
) -> ApiResponse<Json<AirwayOption>> {
    let result = AirwayOption::read_by_id(id, &conn).await;
    match result {
        Ok(airway_option) => ApiResponse::success(Json(airway_option)),
        Err(e) => ApiResponse::error(e.into()),
    }
}

#[put("/{id}", data = "<airway_option_update>")]
pub async fn update_airway_option(
    conn: &State<DbConn>,
    id: i32,
    airway_option_update: Json<NewAirwayOption>,
) -> ApiResponse<Json<AirwayOption>> {
    let result = AirwayOption::update_by_id(id, airway_option_update.into_inner(), &conn).await;
    match result {
        Ok(airway_option) => ApiResponse::success(Json(airway_option)),
        Err(e) => ApiResponse::error(e.into()),
    }
}

#[delete("/{id}")]
pub async fn delete_airway_option(
    conn: &State<DbConn>,
    id: i32,
) -> ApiResponse<()> {
    let result = AirwayOption::delete_by_id(id, &conn).await;
    match result {
        Ok(_) => ApiResponse::success(()),
        Err(e) => ApiResponse::error(e.into()),
    }
}

#[get("/vitals/<vitals_id>")]
pub async fn get_vitals_airway_options(
    conn: &State<DbConn>,
    vitals_id: i32,
) -> ApiResponse<Json<Vec<AirwayOption>>> {
    let result = AirwayOption::read_all_by_vitals_id(vitals_id, &conn).await;
    match result {
        Ok(airway_options) => ApiResponse::success(Json(airway_options)),
        Err(e) => ApiResponse::error(e.into()),
    }
}

#[get("/")]
pub async fn get_all_airway_options(
    conn: &State<DbConn>,
) -> ApiResponse<Json<Vec<AirwayOption>>> {
    let result = AirwayOption::read_all(&conn).await;
    match result {
        Ok(airway_options) => ApiResponse::success(Json(airway_options)),
        Err(e) => ApiResponse::error(e.into()),
    }
}

pub fn airway_options_routes() -> Vec<Route> {
    routes![
        create_airway_option,
        get_airway_option,
        update_airway_option,
        delete_airway_option,
        get_vitals_airway_options,
        get_all_airway_options,
    ]
}