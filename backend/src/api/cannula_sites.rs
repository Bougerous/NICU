use rocket::{get, post, put, delete, patch, serde::json::Json, State, Route};
use crate::{db::db::DbPooledConnection, models::cannula_sites::{CannulaSite, NewCannulaSite}, api::api_response::ApiResponse};
use diesel::prelude::*;
use diesel::pg::PgConnection;

#[post("/", data = "<new_cannula_site>")]
pub async fn create_cannula_site(mut conn: DbConn, new_cannula_site: Json<NewCannulaSite>) -> ApiResponse<Json<CannulaSite>> {
    let result = conn.run(move |c: &mut PgConnection| {
        diesel::insert_into(crate::models::cannula_sites::cannula_sites::table)
            .values(new_cannula_site.into_inner())
            .get_result::<CannulaSite>(c)
    }).await;
    result.map(Json).map_err(Into::into)
}

#[get("/<id>")]
pub async fn read_cannula_site(mut conn: DbConn, id: i32) -> ApiResponse<Json<CannulaSite>> {
    let result = conn.run(move |c: &mut PgConnection| {
        crate::models::cannula_sites::cannula_sites::table
            .find(id)
            .first::<CannulaSite>(c)
    }).await;
    result.map(Json).map_err(Into::into)
}

#[put("/<id>", data = "<cannula_site>")]
pub async fn update_cannula_site(mut conn: DbConn, id: i32, cannula_site: Json<CannulaSite>) -> ApiResponse<Json<CannulaSite>> {
    conn.run(move |c| {
        diesel::update(crate::models::cannula_sites::cannula_sites::table.filter(crate::models::cannula_sites::cannula_sites::id.eq(id)))
            .set(cannula_site.into_inner())
            .get_result(c)
    }).await.map(Json).map_err(Into::into)
}

#[delete("/<id>")]
pub async fn delete_cannula_site(mut conn: DbConn, id: i32) -> ApiResponse<()> {
    conn.run(move |c: &mut PgConnection| {
        diesel::delete(crate::models::cannula_sites::cannula_sites::table.filter(crate::models::cannula_sites::cannula_sites::id.eq(id)))
            .execute(c)
    }).await.map(|_| ()).map_err(Into::into)
}

pub fn cannula_sites_routes() -> Vec<Route> {
    routes![
        create_cannula_site,
        read_cannula_site,
        update_cannula_site,
        delete_cannula_site,
    ]
}