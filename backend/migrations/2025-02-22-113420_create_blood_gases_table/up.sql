CREATE TABLE blood_gases (
    id SERIAL PRIMARY KEY,
    baby_id INTEGER NOT NULL,
    blood_gas_type VARCHAR NOT NULL,
    ph FLOAT,
    pco2 FLOAT,
    po2 FLOAT,
    hco3 FLOAT,
    base_excess FLOAT,
    lactate FLOAT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    FOREIGN KEY (baby_id) REFERENCES babies(id)
);
