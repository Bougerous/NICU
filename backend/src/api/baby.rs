use rocket::{get, post, put, delete, routes, serde::json::Json};
use crate::db::connection::DbConn;
use diesel::prelude::*;
use crate::models::baby::{Baby, NewBaby, babies};
use rocket::http::Status;
use rocket::response::status::{Created, NotFound, NoContent};
use diesel::pg::PgConnection;
use diesel::sql_types::Timestamptz;

#[post("/", data = "<baby>")]
pub async fn create_baby(mut conn: DbConn, baby: Json<NewBaby>) -> Result<Created<Json<Baby>>, rocket::response::Debug<rocket::response::status::Created<Json<Baby>>>> {
    let new_baby = baby.into_inner();
    let inserted = conn.run(move |c: &mut PgConnection| {
        diesel::insert_into(babies::table)
            .values(new_baby)
            .get_result::<Baby>(c)
    }).await.map_err(|e| {
        rocket::response::Debug(Created::new("/"))
    })?;
    Ok(Created::new("/").body(Json(inserted)))
}

#[get("/baby/<id>")]
pub async fn get_baby(mut conn: DbConn, id: i32) -> Result<Json<Baby>, Status> {
    conn.run(move |c: &mut PgConnection| {
        babies::table
            .filter(babies::id.eq(id))
            .first::<Baby>(c)
    }).await.map_err(Into::into)
}

#[put("/baby/<id>", data = "<baby>")]
pub async fn update_baby(mut conn: DbConn, id: i32, baby: Json<Baby>) -> Result<Json<Baby>, Status> {
    conn.run(move |c: &mut PgConnection| {
        diesel::update(babies::table.filter(babies::id.eq(id)))
            .set(baby.into_inner())
            .get_result::<Baby>(c)
    }).await.map_err(Into::into)
}

#[delete("/baby/<id>")]
pub async fn delete_baby(mut conn: DbConn, id: i32) -> Result<Status, Status> {
    conn.run(move |c: &mut PgConnection| {
        diesel::delete(babies::table.filter(babies::id.eq(id)))
            .execute(c)
    }).await.map(|_| Status::NoContent).map_err(Into::into)
}

pub fn baby_routes() -> Vec<rocket::Route> {
    routes![create_baby, get_baby, update_baby, delete_baby]
}