use rocket::serde::Json;
use rocket::State;
use rocket::response::status::Created;
use rocket::http::uri::Absolute;
use crate::db::DbConn;
use crate::models::hfnc_setting::{HfncSetting, NewHfncSetting};
use crate::api::api_response::ApiResponse;

#[post("/", data = "<new_hfnc_setting>")]
pub async fn create_hfnc_setting(
    conn: &State<DbConn>,
    new_hfnc_setting: Json<NewHfncSetting>,
    uri: &Absolute<'_>
) -> ApiResponse<Created<Json<HfncSetting>>> {
    let hfnc_setting = NewHfncSetting {
        ventilator_setting_id: new_hfnc_setting.ventilator_setting_id,
        flow_rate: new_hfnc_setting.flow_rate,
        fio2: new_hfnc_setting.fio2,
    };

    let result = HfncSetting::create(hfnc_setting, &conn).await;

    match result {
        Ok(hfnc_setting) => {
            let hfnc_setting_uri = uri.to_string() + "/" + &hfnc_setting.id.to_string();
            ApiResponse::success(Created::new(hfnc_setting_uri).body(Json(hfnc_setting)))
        }
        Err(e) => ApiResponse::error(e.into())
    }
}

#[get("/{id}")]
pub async fn get_hfnc_setting(
    conn: &State<DbConn>,
    id: i32,
) -> ApiResponse<Json<HfncSetting>> {
    let result = HfncSetting::read_by_id(id, &conn).await;
    match result {
        Ok(hfnc_setting) => ApiResponse::success(Json(hfnc_setting)),
        Err(e) => ApiResponse::error(e.into()),
    }
}


#[put("/{id}", data = "<hfnc_setting_update>")]
pub async fn update_hfnc_setting(
    conn: &State<DbConn>,
    id: i32,
    hfnc_setting_update: Json<NewHfncSetting>,
) -> ApiResponse<Json<HfncSetting>> {
    let result = HfncSetting::update_by_id(id, hfnc_setting_update.into_inner(), &conn).await;
    match result {
        Ok(hfnc_setting) => ApiResponse::success(Json(hfnc_setting)),
        Err(e) => ApiResponse::error(e.into()),
    }
}

#[delete("/{id}")]
pub async fn delete_hfnc_setting(
    conn: &State<DbConn>,
    id: i32,
) -> ApiResponse<()> {
    let result = HfncSetting::delete_by_id(id, &conn).await;
    match result {
        Ok(_) => ApiResponse::success(()),
        Err(e) => ApiResponse::error(e.into()),
    }
}