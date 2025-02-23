use rocket::serde::Json;
use rocket::State;
use rocket::response::status::Created;
use rocket::http::uri::Absolute;
use crate::db::DbConn;
use crate::models::ventilator_control_setting::{VentilatorControlSetting, NewVentilatorControlSetting};
use crate::api::api_response::ApiResponse;

#[post("/", data = "<new_ventilator_control_setting>")]
pub async fn create_ventilator_control_setting(
    conn: &State<DbConn>,
    new_ventilator_control_setting: Json<NewVentilatorControlSetting>,
    uri: &Absolute<'_>
) -> ApiResponse<Created<Json<VentilatorControlSetting>>> {
    let ventilator_control_setting = NewVentilatorControlSetting {
        ventilator_setting_id: new_ventilator_control_setting.ventilator_setting_id,
        mode: new_ventilator_control_setting.mode.clone(),
        rate: new_ventilator_control_setting.rate,
        pip: new_ventilator_control_setting.pip,
        peep: new_ventilator_control_setting.peep,
        fio2: new_ventilator_control_setting.fio2,
        inspiratory_time: new_ventilator_control_setting.inspiratory_time,
        flow: new_ventilator_control_setting.flow,
    };

    let result = VentilatorControlSetting::create(ventilator_control_setting, &conn).await;

    match result {
        Ok(ventilator_control_setting) => {
            let ventilator_control_setting_uri = uri.to_string() + "/" + &ventilator_control_setting.id.to_string();
            ApiResponse::success(Created::new(ventilator_control_setting_uri).body(Json(ventilator_control_setting)))
        }
        Err(e) => ApiResponse::error(e.into())
    }
}

#[get("/{id}")]
pub async fn get_ventilator_control_setting(
    conn: &State<DbConn>,
    id: i32,
) -> ApiResponse<Json<VentilatorControlSetting>> {
    let result = VentilatorControlSetting::read_by_id(id, &conn).await;
    match result {
        Ok(ventilator_control_setting) => ApiResponse::success(Json(ventilator_control_setting)),
        Err(e) => ApiResponse::error(e.into()),
    }
}


#[put("/{id}", data = "<ventilator_control_setting_update>")]
pub async fn update_ventilator_control_setting(
    conn: &State<DbConn>,
    id: i32,
    ventilator_control_setting_update: Json<NewVentilatorControlSetting>,
) -> ApiResponse<Json<VentilatorControlSetting>> {
    let result = VentilatorControlSetting::update_by_id(id, ventilator_control_setting_update.into_inner(), &conn).await;
    match result {
        Ok(ventilator_control_setting) => ApiResponse::success(Json(ventilator_control_setting)),
        Err(e) => ApiResponse::error(e.into()),
    }
}

#[delete("/{id}")]
pub async fn delete_ventilator_control_setting(
    conn: &State<DbConn>,
    id: i32,
) -> ApiResponse<()> {
    let result = VentilatorControlSetting::delete_by_id(id, &conn).await;
    match result {
        Ok(_) => ApiResponse::success(()),
        Err(e) => ApiResponse::error(e.into()),
    }
}