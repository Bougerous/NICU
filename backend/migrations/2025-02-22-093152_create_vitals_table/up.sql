-- Your SQL goes here
CREATE TABLE vitals (
    id SERIAL PRIMARY KEY,
    baby_id INTEGER NOT NULL,
    heart_rate INTEGER,
    respiratory_rate INTEGER,
    blood_pressure_systolic INTEGER,
    blood_pressure_diastolic INTEGER,
    temperature FLOAT,
    capillary_refill_time INTEGER,
    perfusion_index FLOAT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    FOREIGN KEY (baby_id) REFERENCES babies(id)
);

CREATE OR REPLACE FUNCTION update_vitals_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER vitals_updated_at_trigger
BEFORE UPDATE ON vitals
FOR EACH ROW
EXECUTE FUNCTION update_vitals_updated_at();
