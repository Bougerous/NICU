-- This file was automatically generated using Diesel CLI.
--
-- It is not expected to be checked in to version control.
-- This file may be regenerated at any time.

CREATE TABLE airway_options (
  id SERIAL PRIMARY KEY,
  vitals_id INTEGER NOT NULL,
  option_type VARCHAR NOT NULL, -- 'airway' or 'breathing'
  option_name VARCHAR NOT NULL, -- e.g., 'RA', 'Oxygen hood', 'CPAP', 'Ventilator assist', 'HFOV'
  fio2 FLOAT,
  peep FLOAT,
  rate INTEGER,
  pip FLOAT,
  mode VARCHAR,
  settings_json JSONB,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  FOREIGN KEY (vitals_id) REFERENCES vitals(id)
);

CREATE OR REPLACE FUNCTION update_airway_options_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER airway_options_updated_at_trigger
BEFORE UPDATE ON airway_options
FOR EACH ROW
EXECUTE FUNCTION update_airway_options_updated_at();
