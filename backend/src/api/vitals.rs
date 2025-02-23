use rocket::{get, post, put, delete, routes, serde::json::Json, State};
use crate::db::db::DbPooledConnection;
use crate::models::vitals::{Vitals, NewVitals, vitals};
use diesel::prelude::*;
use rocket::response::status::{Created, NotFound, NoContent};
use crate::db::connection::DbConn;

#[post("/", data = "<new_vitals>")]
pub async fn create_vitals(conn: DbConn, new_vitals: Json<NewVitals>) -> Result<Created<Json<Vitals>>, rocket::response::Debug<rocket::response::status::Created<Json<Vitals>>>> {
    let vitals_data = NewVitals {
        baby_id: new_vitals.baby_id,
        heart_rate: new_vitals.heart_rate,
        respiratory_rate: new_vitals.respiratory_rate,
        blood_pressure_systolic: new_vitals.blood_pressure_systolic,
        blood_pressure_diastolic: new_vitals.blood_pressure_diastolic,
        temperature: new_vitals.temperature,
        capillary_refill_time: new_vitals.capillary_refill_time,
        perfusion_index: new_vitals.perfusion_index,
    };

    let vitals_record = conn.run(move |c| {
        diesel::insert_into(vitals::table)
            .values(&vitals_data)
            .get_result::<Vitals>(c)
    }).await.map_err(|e| {
        rocket::response::Debug(Created(Some(Json(Vitals {
            id: 0,
            baby_id: 0,
            heart_rate: None,
            respiratory_rate: None,
            blood_pressure_systolic: None,
            blood_pressure_diastolic: None,
            temperature: None,
            capillary_refill_time: None,
            perfusion_index: None,
            created_at: chrono::Utc::now(),
            updated_at: chrono::Utc::now(),
        }))))
    })?;

    Ok(Created::new("/").body(Json(vitals_record)))
}

#[get("/<id>")]
pub async fn get_vitals(conn: DbConn, id: i32) -> Result<Json<Vitals>, NotFound<String>> {
    let vitals_record = conn.run(move |c| {
        vitals::table.find(id).first(c)
    }).await.map_err(|_| NotFound(String::from("Vitals record not found")))?;

    Ok(Json(vitals_record))
}

#[put("/<id>", data = "<vitals_update>")]
pub async fn update_vitals(conn: DbConn, id: i32, vitals_update: Json<NewVitals>) -> Result<Json<Vitals>, NotFound<String>> {
    let vitals_record = conn.run(move |c| {
        diesel::update(vitals::table.find(id))
            .set((
                vitals::baby_id.eq(vitals_update.baby_id),
                vitals::heart_rate.eq(vitals_update.heart_rate),
                vitals::respiratory_rate.eq(vitals_update.respiratory_rate),
                vitals::blood_pressure_systolic.eq(vitals_update.blood_pressure_systolic),
                vitals::blood_pressure_diastolic.eq(vitals_update.blood_pressure_diastolic),
                vitals::temperature.eq(vitals_update.temperature),
                vitals::capillary_refill_time.eq(vitals_update.capillary_refill_time),
                vitals::perfusion_index.eq(vitals_update.perfusion_index),
                vitals::updated_at.eq(chrono::Utc::now()),
            ))
            .get_result::<Vitals>(c)
    }).await.map_err(|_| NotFound(String::from("Vitals record not found")))?;

    Ok(Json(vitals_record))
}

#[delete("/<id>")]
pub async fn delete_vitals(conn: DbConn, id: i32) -> Result<NoContent, NotFound<String>> {
    let deleted = conn.run(move |c| {
        diesel::delete(vitals::table.find(id))
            .execute(c)
    }).await.map_err(|_| NotFound(String::from("Vitals record not found")))?;

    if deleted > 0 {
        Ok(NoContent)
    } else {
        Err(NotFound(String::from("Vitals record not found")))
    }
}

pub fn vitals_routes() -> Vec<rocket::Route> {
    routes![create_vitals, get_vitals, update_vitals, delete_vitals]
}