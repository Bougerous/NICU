use rocket::serde::Json;
use rocket::State;
use rocket::response::status::Created;
use rocket::http::uri::Absolute;
use crate::db::DbConn;
use crate::models::cbc::{Cbc, NewCbc};
use crate::api::api_response::ApiResponse;
use rocket::Route;

#[post("/", data = "<new_cbc>")]
pub async fn create_cbc(
    conn: &State<DbConn>,
    new_cbc: Json<NewCbc>
) -> ApiResponse<Created<Json<Cbc>>> {
    let cbc = NewCbc {
        baby_id: new_cbc.baby_id,
        hemoglobin: new_cbc.hemoglobin,
        total_count: new_cbc.total_count,
        platelets: new_cbc.platelets,
    };

    let result = Cbc::create(cbc, &conn).await;

    match result {
        Ok(cbc) => {
            let cbc_uri = uri.to_string() + "/" + &cbc.id.to_string();
            ApiResponse::success(Created::new(cbc_uri).body(Json(cbc)))
        }
        Err(e) => ApiResponse::error(e.into())
    }
}

#[get("/{id}")]
pub async fn get_cbc(
    conn: &State<DbConn>,
    id: i32,
) -> ApiResponse<Json<Cbc>> {
    let result = Cbc::read_by_id(id, &conn).await;
    match result {
        Ok(cbc) => ApiResponse::success(Json(cbc)),
        Err(e) => ApiResponse::error(e.into()),
    }
}

#[get("/babies/<baby_id>")]
pub async fn get_baby_cbcs(
    conn: &State<DbConn>,
    baby_id: i32,
) -> ApiResponse<Json<Vec<Cbc>>> {
    let result = Cbc::read_all_by_baby_id(baby_id, &conn).await;
    match result {
        Ok(cbcs) => ApiResponse::success(Json(cbcs)),
        Err(e) => ApiResponse::error(e.into()),
    }
}


#[put("/{id}", data = "<cbc_update>")]
pub async fn update_cbc(
    conn: &State<DbConn>,
    id: i32,
    cbc_update: Json<NewCbc>,
) -> ApiResponse<Json<Cbc>> {
    let result = Cbc::update_by_id(id, cbc_update.into_inner(), &conn).await;
    match result {
        Ok(cbc) => ApiResponse::success(Json(cbc)),
        Err(e) => ApiResponse::error(e.into()),
    }
}

#[delete("/{id}")]
pub async fn delete_cbc(
    conn: &State<DbConn>,
    id: i32,
) -> ApiResponse<()> {
    let result = Cbc::delete_by_id(id, &conn).await;
    match result {
        Ok(_) => ApiResponse::success(()),
        Err(e) => ApiResponse::error(e.into()),
    }
}

pub fn cbc_routes() -> Vec<Route> {
    routes![
        create_cbc,
        get_cbc,
        get_baby_cbcs,
        update_cbc,
        delete_cbc,
    ]
}