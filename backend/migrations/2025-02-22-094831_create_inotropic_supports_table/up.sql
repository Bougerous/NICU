CREATE TABLE inotropic_supports (
  id SERIAL PRIMARY KEY,
  vitals_id INTEGER NOT NULL,
  drug_used VARCHAR NOT NULL,
  rationale TEXT,
  ampule_details_json JSONB,
  mixing_details_json JSONB,
  flow_rate FLOAT,
  flow_rate_unit VARCHAR,
  escalation_deescalation_events_json JSONB,
  start_stop_events_json JSONB,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  FOREIGN KEY (vitals_id) REFERENCES vitals(id)
);

CREATE OR REPLACE FUNCTION update_inotropic_supports_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER inotropic_supports_updated_at_trigger
BEFORE UPDATE ON inotropic_supports
FOR EACH ROW
EXECUTE FUNCTION update_inotropic_supports_updated_at();
