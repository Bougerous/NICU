use thiserror::Error;

#[derive(Error, Debug)]
pub enum ApiError {
    #[error("Database error: {0}")]
    DatabaseError(#[from] diesel::result::Error),
    #[error("Unauthorized: {0}")]
    Unauthorized(String),
    #[error("Not Found: {0}")]
    NotFound(String),
    #[error("Validation error: {0}")]
    ValidationError(String),
    #[error("Internal server error")]
    InternalServerError,
}