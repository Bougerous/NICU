-- Your SQL goes here
CREATE TABLE babies (
    id SERIAL PRIMARY KEY,
    baby_name VARCHAR,
    sex VARCHAR NOT NULL,
    birth_weight FLOAT,
    head_circumference INTEGER,
    length INTEGER,
    gestational_age_weeks INTEGER,
    gestational_age_days INTEGER,
    corrected_gestational_age_weeks INTEGER,
    corrected_gestational_age_days INTEGER,
    time_of_birth TIMESTAMPTZ,
    hour_of_life INTEGER,
    time_of_first_meconium TIMESTAMPTZ,
    time_of_first_urine TIMESTAMPTZ,
    msaf_induced BOOLEAN,
    msaf_method_used VARCHAR,
    msaf_toco_changes VARCHAR,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
