use rocket::fairing::{Fairing, Info, Kind};
use rocket::{Request, Response, http::Status, outcome::Outcome};
use jsonwebtoken::{decode, Validation, DecodingKey};
use serde_json::json;
use crate::config::config::Config; // Updated import path
use rocket::request::FromRequest;
use rocket::State;

pub struct AuthMiddleware;

#[rocket::async_trait]
impl Fairing for AuthMiddleware {
    fn info(&self) -> Info {
        Info {
            name: "JWT Authentication",
            kind: Kind::Request | Kind::Response,
        }
    }

    async fn on_request(&self, request: &mut Request<'_>) {
        if request.uri().path().starts_with("/vitals") {
            let token = request.headers().get_one("Authorization");

            match token {
                Some(token) => {
                    let token_str = token.trim_start_matches("bearer ").trim_start_matches("Bearer ");
                    let secret = request.rocket().figment().extract::<crate::config::config::Config>().unwrap().jwt_secret; // Updated import path
                    let decoding_key = DecodingKey::from_secret(secret.as_bytes());
                    let validation = Validation::default();

                    match decode::<serde_json::Value>(token_str, &decoding_key, &validation) {
                        Ok(_) => {
                            // Token is valid, proceed with request
                        }
                        Err(_) => {
                            // Token is invalid, halt request
                            request.set_outcome(Outcome::Failure((Status::Unauthorized, ())));
                        }
                    }
                }
                None => {
                    // No token provided, halt request
                    request.set_outcome(Outcome::Failure((Status::Unauthorized, ())));
                }
            }
        }
    }

    async fn on_response<'r>(&self, _request: &'r Request<'_>, response: &mut Response<'r>) {
        if response.status() == Status::Unauthorized {
            response.set_header(rocket::http::Header::new("WWW-Authenticate", "Bearer"));
            response.set_sized_body(response.body().len(), std::io::Cursor::new(json!({"error": "Unauthorized"}).to_string()));
        }
    }
}

impl AuthMiddleware {
    pub fn fairing() -> AuthMiddleware {
        AuthMiddleware
    }
}

pub struct AuthenticatedUser(/* ... */);

#[rocket::async_trait]
impl<'r> FromRequest<'r> for AuthenticatedUser {
    type Error = ();

    async fn from_request(request: &'r Request<'_>) -> Outcome<Self, Self::Error> {
        // ...existing code...
        if false { // authentication fails
            return Outcome::Failure((Status::Unauthorized, ()));
        }
        // Else, if successful:
        Outcome::Success(AuthenticatedUser(/* ... */))
    }
}