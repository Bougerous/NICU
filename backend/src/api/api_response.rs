use rocket::{http::Status, serde::json::Json};
use std::result;

pub type ApiResponse<T> = result::Result<Json<T>, Status>;