use diesel::prelude::*;
use serde::{Serialize, Deserialize};

#[derive(Debug, Queryable, Selectable, Identifiable, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::users)]
pub struct User {
    pub id: i32,
    pub username: String,
    pub password_hash: String,
}

#[derive(Insertable, Deserialize)]
#[diesel(table_name = crate::schema::users)]
pub struct NewUser {
    pub username: String,
    pub password_hash: String,
}
