use rocket::serde::{Deserialize, Serialize};
use rocket::State;
use rocket::response::status::Created;
use rocket::http::uri::Absolute;
use crate::db::DbConn;
use crate::models::ventilator_setting::{VentilatorSetting, NewVentilatorSetting};
use crate::api::api_response::ApiResponse;

#[post("/", data = "<new_ventilator_setting>")]
pub async fn create_ventilator_setting(
    conn: &State<DbConn>,
    new_ventilator_setting: Json<NewVentilatorSetting>,
    uri: &Absolute<'_>
) -> ApiResponse<Created<Json<VentilatorSetting>>> {
    let ventilator_setting = NewVentilatorSetting {
        baby_id: new_ventilator_setting.baby_id,
        start_time: new_ventilator_setting.start_time,
        end_time: new_ventilator_setting.end_time,
        setting_type: new_ventilator_setting.setting_type.clone(),
    };

    let result = VentilatorSetting::create(ventilator_setting, &conn).await;

    match result {
        Ok(ventilator_setting) => {
            let ventilator_setting_uri = uri.to_string() + "/" + &ventilator_setting.id.to_string();
            ApiResponse::success(Created::new(ventilator_setting_uri).body(Json(ventilator_setting)))
        }
        Err(e) => ApiResponse::error(e.into())
    }
}

#[get("/{id}")]
pub async fn get_ventilator_setting(
    conn: &State<DbConn>,
    id: i32,
) -> ApiResponse<Json<VentilatorSetting>> {
    let result = VentilatorSetting::read_by_id(id, &conn).await;
    match result {
        Ok(ventilator_setting) => ApiResponse::success(Json(ventilator_setting)),
        Err(e) => ApiResponse::error(e.into()),
    }
}

#[get("/babies/<baby_id>")]
pub async fn get_baby_ventilator_settings(
    conn: &State<DbConn>,
    baby_id: i32,
) -> ApiResponse<Json<Vec<VentilatorSetting>>> {
    let result = VentilatorSetting::read_all_by_baby_id(baby_id, &conn).await;
    match result {
        Ok(ventilator_settings) => ApiResponse::success(Json(ventilator_settings)),
        Err(e) => ApiResponse::error(e.into()),
    }
}

#[put("/{id}", data = "<ventilator_setting_update>")]
pub async fn update_ventilator_setting(
    conn: &State<DbConn>,
    id: i32,
    ventilator_setting_update: Json<NewVentilatorSetting>,
) -> ApiResponse<Json<VentilatorSetting>> {
    let result = VentilatorSetting::update_by_id(id, ventilator_setting_update.into_inner(), &conn).await;
    match result {
        Ok(ventilator_setting) => ApiResponse::success(Json(ventilator_setting)),
        Err(e) => ApiResponse::error(e.into()),
    }
}

#[delete("/{id}")]
pub async fn delete_ventilator_setting(
    conn: &State<DbConn>,
    id: i32,
) -> ApiResponse<()> {
    let result = VentilatorSetting::delete_by_id(id, &conn).await;
    match result {
        Ok(_) => ApiResponse::success(()),
        Err(e) => ApiResponse::error(e.into()),
    }
}