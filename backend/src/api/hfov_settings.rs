use rocket::serde::Json;
use rocket::State;
use rocket::response::status::Created;
use rocket::http::uri::Absolute;
use crate::db::DbConn;
use crate::models::hfov_setting::{HfovSetting, NewHfovSetting};
use crate::api::api_response::ApiResponse;

#[post("/", data = "<new_hfov_setting>")]
pub async fn create_hfov_setting(
    conn: &State<DbConn>,
    new_hfov_setting: Json<NewHfovSetting>,
    uri: &Absolute<'_>
) -> ApiResponse<Created<Json<HfovSetting>>> {
    let hfov_setting = NewHfovSetting {
        ventilator_setting_id: new_hfov_setting.ventilator_setting_id,
        amplitude: new_hfov_setting.amplitude,
        frequency: new_hfov_setting.frequency,
        map: new_hfov_setting.map,
        fio2: new_hfov_setting.fio2,
        ie_ratio: new_hfov_setting.ie_ratio,
    };

    let result = HfovSetting::create(hfov_setting, &conn).await;

    match result {
        Ok(hfov_setting) => {
            let hfov_setting_uri = uri.to_string() + "/" + &hfov_setting.id.to_string();
            ApiResponse::success(Created::new(hfov_setting_uri).body(Json(hfov_setting)))
        }
        Err(e) => ApiResponse::error(e.into())
    }
}

#[get("/{id}")]
pub async fn get_hfov_setting(
    conn: &State<DbConn>,
    id: i32,
) -> ApiResponse<Json<HfovSetting>> {
    let result = HfovSetting::read_by_id(id, &conn).await;
    match result {
        Ok(hfov_setting) => ApiResponse::success(Json(hfov_setting)),
        Err(e) => ApiResponse::error(e.into()),
    }
}


#[put("/{id}", data = "<hfov_setting_update>")]
pub async fn update_hfov_setting(
    conn: &State<DbConn>,
    id: i32,
    hfov_setting_update: Json<NewHfovSetting>,
) -> ApiResponse<Json<HfovSetting>> {
    let result = HfovSetting::update_by_id(id, hfov_setting_update.into_inner(), &conn).await;
    match result {
        Ok(hfov_setting) => ApiResponse::success(Json(hfov_setting)),
        Err(e) => ApiResponse::error(e.into()),
    }
}

#[delete("/{id}")]
pub async fn delete_hfov_setting(
    conn: &State<DbConn>,
    id: i32,
) -> ApiResponse<()> {
    let result = HfovSetting::delete_by_id(id, &conn).await;
    match result {
        Ok(_) => ApiResponse::success(()),
        Err(e) => ApiResponse::error(e.into()),
    }
}