use rocket::serde::Json;
use rocket::State;
use rocket::response::status::Created;
use rocket::http::uri::Absolute;
use crate::db::DbConn;
use crate::models::blood_gas::{BloodGas, NewBloodGas};
use crate::api::api_response::ApiResponse;
use rocket::Route;

#[post("/", data = "<new_blood_gas>")]
pub async fn create_blood_gas(
    conn: &State<DbConn>,
    new_blood_gas: Json<NewBloodGas>
) -> ApiResponse<Created<Json<BloodGas>>> {
    let blood_gas = NewBloodGas {
        baby_id: new_blood_gas.baby_id,
        blood_gas_type: new_blood_gas.blood_gas_type.clone(),
        ph: new_blood_gas.ph,
        pco2: new_blood_gas.pco2,
        po2: new_blood_gas.po2,
        hco3: new_blood_gas.hco3,
        base_excess: new_blood_gas.base_excess,
        lactate: new_blood_gas.lactate,
    };

    let result = BloodGas::create(blood_gas, &conn).await;

    match result {
        Ok(blood_gas) => {
            let blood_gas_uri = uri.to_string() + "/" + &blood_gas.id.to_string();
            ApiResponse::success(Created::new(blood_gas_uri).body(Json(blood_gas)))
        }
        Err(e) => ApiResponse::error(e.into())
    }
}

#[get("/{id}")]
pub async fn get_blood_gas(
    conn: &State<DbConn>,
    id: i32,
) -> ApiResponse<Json<BloodGas>> {
    let result = BloodGas::read_by_id(id, &conn).await;
    match result {
        Ok(blood_gas) => ApiResponse::success(Json(blood_gas)),
        Err(e) => ApiResponse::error(e.into()),
    }
}

#[get("/babies/<baby_id>")]
pub async fn get_baby_blood_gases(
    conn: &State<DbConn>,
    baby_id: i32,
) -> ApiResponse<Json<Vec<BloodGas>>> {
    let result = BloodGas::read_all_by_baby_id(baby_id, &conn).await;
    match result {
        Ok(blood_gases) => ApiResponse::success(Json(blood_gases)),
        Err(e) => ApiResponse::error(e.into()),
    }
}


#[put("/{id}", data = "<blood_gas_update>")]
pub async fn update_blood_gas(
    conn: &State<DbConn>,
    id: i32,
    blood_gas_update: Json<NewBloodGas>,
) -> ApiResponse<Json<BloodGas>> {
    let result = BloodGas::update_by_id(id, blood_gas_update.into_inner(), &conn).await;
    match result {
        Ok(blood_gas) => ApiResponse::success(Json(blood_gas)),
        Err(e) => ApiResponse::error(e.into()),
    }
}

#[delete("/{id}")]
pub async fn delete_blood_gas(
    conn: &State<DbConn>,
    id: i32,
) -> ApiResponse<()> {
    let result = BloodGas::delete_by_id(id, &conn).await;
    match result {
        Ok(_) => ApiResponse::success(()),
        Err(e) => ApiResponse::error(e.into()),
    }
}

pub fn blood_gases_routes() -> Vec<Route> {
    routes![
        create_blood_gas,
        get_blood_gas,
        get_baby_blood_gases,
        update_blood_gas,
        delete_blood_gas,
    ]
}