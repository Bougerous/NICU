CREATE TABLE cbcs (
    id SERIAL PRIMARY KEY,
    baby_id INTEGER NOT NULL,
    hemoglobin FLOAT,
    total_count INTEGER,
    platelets INTEGER,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    FOREIGN KEY (baby_id) REFERENCES babies(id)
);
