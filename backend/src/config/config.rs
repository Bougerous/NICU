use serde::Deserialize;
use dotenv::dotenv;
use std::env;

#[derive(Deserialize)]
pub struct Config {
    pub database_url: String,
    pub jwt_secret: String,
    pub server_address: String,
    pub server_port: u16,
}

impl Config {
    pub fn new() -> Self {
        dotenv().ok();

        let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
        let jwt_secret = env::var("JWT_SECRET").expect("JWT_SECRET must be set");
        let server_address = env::var("SERVER_ADDRESS").unwrap_or_else(|_| "127.0.0.1".to_string());
        let server_port = env::var("SERVER_PORT")
            .map(|p| p.parse::<u16>().unwrap_or(8000))
            .unwrap_or(8000);

        Config {
            database_url,
            jwt_secret,
            server_address,
            server_port,
        }
    }
    // Removed from_env() as it was incomplete and not used.
}