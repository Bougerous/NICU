use jsonwebtoken::{encode, decode, Header, EncodingKey, DecodingKey, Validation};
use rocket::http::Status;
use rocket::request::{self, FromRequest, Outcome, Request};
use serde::{Deserialize, Serialize};
use std::env;

#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    pub sub: String,  // subject (user id)
    pub exp: usize,   // expiration timestamp
    pub iat: usize,   // issued at timestamp
}

pub fn create_jwt(user_id: i32) -> Result<String, jsonwebtoken::errors::Error> {
    let expiration = chrono::Utc::now()
        .checked_add_signed(chrono::Duration::hours(24))
        .expect("valid timestamp")
        .timestamp() as usize;
    
    let claims = Claims {
        sub: user_id.to_string(),
        exp: expiration,
        iat: chrono::Utc::now().timestamp() as usize,
    };

    encode(
        &Header::default(),
        &claims,
        &EncodingKey::from_secret(env::var("JWT_SECRET").expect("JWT_SECRET must be set").as_bytes())
    )
}

#[rocket::async_trait]
impl<'r> FromRequest<'r> for Claims {
    type Error = ();

    async fn from_request(request: &'r Request<'_>) -> request::Outcome<Self, Self::Error> {
        let auth_header = match request.headers().get_one("Authorization") {
            Some(h) => h,
            None => return Outcome::Error((Status::Unauthorized, ())),
        };

        let token = match auth_header.strip_prefix("Bearer ") {
            Some(t) => t,
            None => return Outcome::Error((Status::Unauthorized, ())),
        };

        let key = DecodingKey::from_secret(
            env::var("JWT_SECRET")
                .expect("JWT_SECRET must be set")
                .as_bytes()
        );

        match decode::<Claims>(token, &key, &Validation::default()) {
            Ok(token_data) => Outcome::Success(token_data.claims),
            Err(_) => Outcome::Error((Status::Unauthorized, ())),
        }
    }
}
