use rocket::{post, routes, serde::json::Json, State, fairing::AdHoc};
use serde::{Deserialize, Serialize};
use crate::models::user::User;
use crate::db::db::DbPool;
use diesel::prelude::*;
use crate::db::db::users as users_schema;
use jsonwebtoken::{encode, Header, EncodingKey};
use std::time::{SystemTime, UNIX_EPOCH};
use crate::config::config::Config;
use diesel::pg::PgConnection;

const TOKEN_TYPE: &str = "bearer";

#[derive(Debug, Serialize, Deserialize)]
pub struct RegisterRequest {
    username: String,
    password: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct LoginRequest {
    username: String,
    password: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct AuthResponse {
    token: String,
}

fn generate_jwt_token(username: &str, secret: &str) -> Result<String, jsonwebtoken::errors::Error> {
    let expiration = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap()
        .as_secs() + 60 * 60 * 24; // 24 hours

    let claims = serde_json::json!({
        "iss": "nicu-backend",
        "exp": expiration,
        "username": username,
    });

    let header = Header::default();
    let encoding_key = EncodingKey::from_secret(secret.as_bytes());

    encode(&header, &claims, &encoding_key)
}

#[post("/register", data = "<new_user>")]
pub async fn register(mut conn: DbConn, new_user: Json<NewUser>) -> Result<Json<User>, Status> {
    let user = conn.run(move |c: &mut PgConnection| {
        diesel::insert_into(users_schema::table)
            .values(new_user.into_inner()) // now pass by value
            .get_result::<User>(c)
    }).await.map_err(|_| Status::InternalServerError)?;
    Ok(Json(user))
}

#[post("/login", data = "<login_request>")]
pub fn login(login_request: Json<LoginRequest>, db_pool: &State<DbPool>) -> Json<AuthResponse> {
    let conn = db_pool.get().expect("Database connection pool failed");
    let request = login_request.into_inner();
    let username = request.username;
    let password = request.password;

    let user = users_schema::table
        .filter(users_schema::username.eq(&username))
        .first::<User>(&mut conn) // changed: use &mut conn
        .optional()
        .expect("Failed to retrieve user");

    match user {
        Some(user) => {
            if bcrypt::verify(password, &user.get_password_hash()).expect("Failed to verify password") { // changed: use getter instead of user.password_hash
                // TODO: Generate JWT token
                let config = rocket::config::Config::figment().extract::<Config>().unwrap();
                match generate_jwt_token(&username, &config.jwt_secret) {
                    Ok(token) => Json(AuthResponse { token }),
                    Err(_) => Json(AuthResponse { token: "error".to_string() }), // Placeholder for error handling
                }
            } else {
                // Incorrect password
                Json(AuthResponse { token: "error".to_string() }) // Placeholder for error handling
            }
        }
        None => {
            // User not found
            Json(AuthResponse { token: "error".to_string() }) // Placeholder for error handling
        }
    }
}

#[post("/refresh")]
pub fn refresh() -> Json<AuthResponse> {
    // TODO: Implement refresh token logic
    Json(AuthResponse { token: "refreshed_test_token".to_string() })
}

pub fn auth_routes() -> Vec<rocket::Route> {
    routes![register, login, refresh]
}