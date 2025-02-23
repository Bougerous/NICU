CREATE TABLE ventilator_control_settings (
    id SERIAL PRIMARY KEY,
    ventilator_setting_id INTEGER NOT NULL,
    mode VARCHAR,
    rate INTEGER,
    pip FLOAT,
    peep FLOAT,
    fio2 FLOAT,
    inspiratory_time FLOAT,
    flow FLOAT,
    FOREIGN KEY (ventilator_setting_id) REFERENCES ventilator_settings(id)
);
