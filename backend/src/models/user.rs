use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct User {
    id: i32,
    username: String,
    password_hash: String,
}

impl User {
    pub fn get_password_hash(&self) -> &str {
        &self.password_hash
    }
}