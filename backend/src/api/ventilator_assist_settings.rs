use rocket::serde::Json;
use rocket::State;
use rocket::response::status::Created;
use rocket::http::uri::Absolute;
use crate::db::DbConn;
use crate::models::ventilator_assist_setting::{VentilatorAssistSetting, NewVentilatorAssistSetting};
use crate::api::api_response::ApiResponse;

#[post("/", data = "<new_ventilator_assist_setting>")]
pub async fn create_ventilator_assist_setting(
    conn: &State<DbConn>,
    new_ventilator_assist_setting: Json<NewVentilatorAssistSetting>,
    uri: &Absolute<'_>
) -> ApiResponse<Created<Json<VentilatorAssistSetting>>> {
    let ventilator_assist_setting = NewVentilatorAssistSetting {
        ventilator_setting_id: new_ventilator_assist_setting.ventilator_setting_id,
        mode: new_ventilator_assist_setting.mode.clone(),
        rate: new_ventilator_assist_setting.rate,
        pip: new_ventilator_assist_setting.pip,
        peep: new_ventilator_assist_setting.peep,
        fio2: new_ventilator_assist_setting.fio2,
        inspiratory_time: new_ventilator_assist_setting.inspiratory_time,
        flow: new_ventilator_assist_setting.flow,
    };

    let result = VentilatorAssistSetting::create(ventilator_assist_setting, &conn).await;

    match result {
        Ok(ventilator_assist_setting) => {
            let ventilator_assist_setting_uri = uri.to_string() + "/" + &ventilator_assist_setting.id.to_string();
            ApiResponse::success(Created::new(ventilator_assist_setting_uri).body(Json(ventilator_assist_setting)))
        }
        Err(e) => ApiResponse::error(e.into())
    }
}

#[get("/{id}")]
pub async fn get_ventilator_assist_setting(
    conn: &State<DbConn>,
    id: i32,
) -> ApiResponse<Json<VentilatorAssistSetting>> {
    let result = VentilatorAssistSetting::read_by_id(id, &conn).await;
    match result {
        Ok(ventilator_assist_setting) => ApiResponse::success(Json(ventilator_assist_setting)),
        Err(e) => ApiResponse::error(e.into()),
    }
}


#[put("/{id}", data = "<ventilator_assist_setting_update>")]
pub async fn update_ventilator_assist_setting(
    conn: &State<DbConn>,
    id: i32,
    ventilator_assist_setting_update: Json<NewVentilatorAssistSetting>,
) -> ApiResponse<Json<VentilatorAssistSetting>> {
    let result = VentilatorAssistSetting::update_by_id(id, ventilator_assist_setting_update.into_inner(), &conn).await;
    match result {
        Ok(ventilator_assist_setting) => ApiResponse::success(Json(ventilator_assist_setting)),
        Err(e) => ApiResponse::error(e.into()),
    }
}

#[delete("/{id}")]
pub async fn delete_ventilator_assist_setting(
    conn: &State<DbConn>,
    id: i32,
) -> ApiResponse<()> {
    let result = VentilatorAssistSetting::delete_by_id(id, &conn).await;
    match result {
        Ok(_) => ApiResponse::success(()),
        Err(e) => ApiResponse::error(e.into()),
    }
}