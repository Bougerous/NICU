CREATE TABLE cpap_settings (
    id SERIAL PRIMARY KEY,
    ventilator_setting_id INTEGER NOT NULL,
    peep FLOAT,
    fio2 FLOAT,
    FOREIGN KEY (ventilator_setting_id) REFERENCES ventilator_settings(id)
);
