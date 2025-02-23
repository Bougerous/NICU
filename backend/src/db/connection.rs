use rocket_sync_db_pools::database;
use diesel::pg::PgConnection;

#[database("postgres_db")]
pub struct DbConn(PgConnection);

// ...existing code...
