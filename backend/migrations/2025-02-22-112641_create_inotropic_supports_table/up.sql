CREATE TABLE inotropic_supports (
    id SERIAL PRIMARY KEY,
    baby_id INTEGER NOT NULL,
    drug_name VARCHAR,
    rationale VARCHAR,
    ampule_composition VARCHAR,
    units_per_ml VARCHAR,
    total_units VARCHAR,
    mixing_fluid_amount VARCHAR,
    mixing_fluid_composition VARCHAR,
    flow_rate FLOAT,
    flow_rate_units VARCHAR,
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    FOREIGN KEY (baby_id) REFERENCES babies(id)
);
