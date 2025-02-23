use diesel::{PgConnection, Connection, r2d2::{ConnectionManager, Pool, PooledConnection, PoolError}};
use dotenv::dotenv;
use std::env;

pub type DbPool = Pool<ConnectionManager<PgConnection>>;
pub type DbPooledConnection = PooledConnection<ConnectionManager<PgConnection>>;

pub fn establish_connection_pool() -> DbPool {
    dotenv().ok();

    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    let manager = ConnectionManager::<PgConnection>::new(database_url);
    Pool::builder()
        .build(manager)
        .expect("Failed to create pool.")
}

pub fn get_connection_from_pool(pool: &DbPool) -> Result<DbPooledConnection, PoolError> {
    pool.get()
}

table! {
    babies (id) {
        id -> Int4,
        name -> Varchar,
        gestational_age -> Int4,
        birth_weight -> Float4,
        birth_date -> Varchar,
    }
}

table! {
    vitals (id) {
        id -> Int4,
        baby_id -> Int4,
        heart_rate -> Int4,
        SpO2 -> Float4,
        respiratory_rate -> Int4,
        temperature -> Float4,
        timestamp -> Varchar,
    }
}

table! {
    users (id) {
        id -> Int4,
        username -> Varchar,
        password_hash -> Varchar,
    }
}