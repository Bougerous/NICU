CREATE TABLE cannula_sites (
  id SERIAL PRIMARY KEY,
  vitals_id INTEGER NOT NULL,
  site_name VARCHAR NOT NULL,
  insertion_time TIMESTAMP,
  line_type VARCHAR,
  xray_post_insertion BOOLEAN,
  time_since_insertion INTEGER,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  FOREIGN KEY (vitals_id) REFERENCES vitals(id)
);

CREATE OR REPLACE FUNCTION update_cannula_sites_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER cannula_sites_updated_at_trigger
BEFORE UPDATE ON cannula_sites
FOR EACH ROW
EXECUTE FUNCTION update_cannula_sites_updated_at();
