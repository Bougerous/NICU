CREATE TABLE hfnc_settings (
    id SERIAL PRIMARY KEY,
    ventilator_setting_id INTEGER NOT NULL,
    flow_rate FLOAT,
    fio2 FLOAT,
    FOREIGN KEY (ventilator_setting_id) REFERENCES ventilator_settings(id)
);
