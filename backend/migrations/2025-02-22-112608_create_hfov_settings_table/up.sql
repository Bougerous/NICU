CREATE TABLE hfov_settings (
    id SERIAL PRIMARY KEY,
    ventilator_setting_id INTEGER NOT NULL,
    amplitude FLOAT,
    frequency FLOAT,
    map FLOAT,
    fio2 FLOAT,
    ie_ratio FLOAT,
    FOREIGN KEY (ventilator_setting_id) REFERENCES ventilator_settings(id)
);
