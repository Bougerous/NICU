#[macro_use] extern crate diesel;
#[macro_use] extern crate rocket;

mod config { pub mod config; }
mod db { pub mod db; }
mod middleware { pub mod auth_middleware; }
pub mod models { 
    pub mod baby; 
    pub mod user; 
    pub mod vitals; 
    pub mod airway_options; 
    pub mod cannula_sites; 
    pub mod inotropic_supports; 
    pub mod ventilator_settings; 
    pub mod cpap_setting;
    pub mod hfov_setting;
    pub mod hfnc_setting;
    pub mod ventilator_assist_setting;
    pub mod ventilator_control_setting;
    pub mod cbc;
    pub mod blood_gas;
}
pub mod api { 
    pub mod auth; 
    pub mod vitals; 
    pub mod airway_options; 
    pub mod cannula_sites; 
    pub mod inotropic_supports; 
    pub mod baby; 
    pub mod api_response; 
    pub mod ventilator_settings; 
    pub mod cpap_settings;
    pub mod hfov_settings;
    pub mod hfnc_settings;
    pub mod ventilator_assist_settings;
    pub mod ventilator_control_settings;
    pub mod cbc;
    pub mod blood_gases;
}

use crate::config::config::Config;
use rocket::fairing::AdHoc;

use crate::api::inotropic_supports::inotropic_supports_routes;
use crate::api::baby::baby_routes;
use crate::api::cannula_sites::cannula_sites_routes;
use crate::api::auth::*;
use crate::api::airway_options::airway_options_routes;
use crate::api::vitals::*;
use crate::middleware::auth_middleware::*;
use crate::api::ventilator_settings::ventilator_settings_routes;
use crate::api::cpap_settings::cpap_settings_routes;
use crate::api::hfov_settings::hfov_settings_routes;
use crate::api::hfnc_settings::hfnc_settings_routes;
use crate::api::ventilator_assist_settings::ventilator_assist_settings_routes;
use crate::api::ventilator_control_settings::ventilator_control_settings_routes;
use crate::api::cbc::cbc_routes;
use crate::api::blood_gases::blood_gases_routes;

#[get("/")]
fn index() -> &'static str {
    "Hello, NICU Backend!"
}

#[launch]
fn rocket() -> _ {
    let config = Config::new();
    let db_pool = db::db::establish_connection_pool();

    println!("Database URL: {}", config.database_url);
    println!("Server address: {}:{}", config.server_address, config.server_port);

    rocket::build()
        .attach(AdHoc::on_ignite("Database Initialization", |rocket| async {
            // ...existing database initialization, migrations, etc...
            rocket
        }))
        .mount("/inotropic_supports", inotropic_supports_routes())
        .manage(db_pool)
        .attach(AuthMiddleware::fairing())
        .mount("/airway_options", airway_options_routes())
        .mount("/cannula_sites", cannula_sites_routes())
        .mount("/", routes![index])
        .mount("/auth", auth_routes())
        .mount("/vitals", vitals_routes())
        .mount("/babies", baby_routes())
        .mount("/ventilator_settings", ventilator_settings_routes())
        .mount("/cpap_settings", cpap_settings_routes())
        .mount("/hfov_settings", hfov_settings_routes())
        .mount("/hfnc_settings", hfnc_settings_routes())
        .mount("/ventilator_assist_settings", ventilator_assist_settings_routes())
        .mount("/ventilator_control_settings", ventilator_control_settings_routes())
        .mount("/cbcs", cbc_routes())
        .mount("/blood_gases", blood_gases_routes())
}
