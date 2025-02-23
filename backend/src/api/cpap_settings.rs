use rocket::serde::Json;
use rocket::State;
use rocket::response::status::Created;
use rocket::http::uri::Absolute;
use crate::db::DbConn;
use crate::models::cpap_setting::{CpapSetting, NewCpapSetting};
use crate::api::api_response::ApiResponse;

#[post("/", data = "<new_cpap_setting>")]
pub async fn create_cpap_setting(
    conn: &State<DbConn>,
    new_cpap_setting: Json<NewCpapSetting>,
    uri: &Absolute<'_>
) -> ApiResponse<Created<Json<CpapSetting>>> {
    let cpap_setting = NewCpapSetting {
        ventilator_setting_id: new_cpap_setting.ventilator_setting_id,
        peep: new_cpap_setting.peep,
        fio2: new_cpap_setting.fio2,
    };

    let result = CpapSetting::create(cpap_setting, &conn).await;

    match result {
        Ok(cpap_setting) => {
            let cpap_setting_uri = uri.to_string() + "/" + &cpap_setting.id.to_string();
            ApiResponse::success(Created::new(cpap_setting_uri).body(Json(cpap_setting)))
        }
        Err(e) => ApiResponse::error(e.into())
    }
}

#[get("/{id}")]
pub async fn get_cpap_setting(
    conn: &State<DbConn>,
    id: i32,
) -> ApiResponse<Json<CpapSetting>> {
    let result = CpapSetting::read_by_id(id, &conn).await;
    match result {
        Ok(cpap_setting) => ApiResponse::success(Json(cpap_setting)),
        Err(e) => ApiResponse::error(e.into()),
    }
}


#[put("/{id}", data = "<cpap_setting_update>")]
pub async fn update_cpap_setting(
    conn: &State<DbConn>,
    id: i32,
    cpap_setting_update: Json<NewCpapSetting>,
) -> ApiResponse<Json<CpapSetting>> {
    let result = CpapSetting::update_by_id(id, cpap_setting_update.into_inner(), &conn).await;
    match result {
        Ok(cpap_setting) => ApiResponse::success(Json(cpap_setting)),
        Err(e) => ApiResponse::error(e.into()),
    }
}

#[delete("/{id}")]
pub async fn delete_cpap_setting(
    conn: &State<DbConn>,
    id: i32,
) -> ApiResponse<()> {
    let result = CpapSetting::delete_by_id(id, &conn).await;
    match result {
        Ok(_) => ApiResponse::success(()),
        Err(e) => ApiResponse::error(e.into()),
    }
}