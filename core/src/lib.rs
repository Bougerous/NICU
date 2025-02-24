#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{CustomMenuItem, Menu, MenuItem, Submenu};

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}, from Rust!", name)
}

pub fn run() {
    let quit = CustomMenuItem::new("quit".to_string(), "Quit");
    let close_window = CustomMenuItem::new("close".to_string(), "Close");
    let submenu = Submenu::new("File", Menu::new().add_item(quit).add_item(close_window));
    let menu = Menu::new()
        .add_native_item(MenuItem::Copy)
        .add_submenu(submenu);

    tauri::Builder::default()
        .menu(menu)
        .on_menu_event(|event| {
            match event.menu_item_id() {
                "quit" => {
                    std::process::exit(0);
                }
                "close" => {
                    event.window().close().unwrap();
                }
                _ => {}
            }
        })
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
