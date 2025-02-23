CREATE TABLE ventilator_settings (
    id SERIAL PRIMARY KEY,
    baby_id INTEGER NOT NULL,
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ,
    setting_type VARCHAR NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    FOREIGN KEY (baby_id) REFERENCES babies(id)
);
