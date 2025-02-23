// @generated automatically by Diesel CLI.

diesel::table! {
    airway_options (id) {
        id -> Int4,
        vitals_id -> Int4,
        option_type -> Varchar,
        option_name -> Varchar,
        fio2 -> Nullable<Float8>,
        peep -> Nullable<Float8>,
        rate -> Nullable<Int4>,
        pip -> Nullable<Float8>,
        mode -> Nullable<Varchar>,
        settings_json -> Nullable<Jsonb>,
        created_at -> Timestamp,
        updated_at -> Timestamp,
    }
}

diesel::table! {
    babies (id) {
        id -> Int4,
        baby_name -> Nullable<Varchar>,
        sex -> Varchar,
        birth_weight -> Nullable<Float8>,
        head_circumference -> Nullable<Int4>,
        length -> Nullable<Int4>,
        gestational_age_weeks -> Nullable<Int4>,
        gestational_age_days -> Nullable<Int4>,
        corrected_gestational_age_weeks -> Nullable<Int4>,
        corrected_gestational_age_days -> Nullable<Int4>,
        time_of_birth -> Nullable<Timestamptz>,
        hour_of_life -> Nullable<Int4>,
        time_of_first_meconium -> Nullable<Timestamptz>,
        time_of_first_urine -> Nullable<Timestamptz>,
        msaf_induced -> Nullable<Bool>,
        msaf_method_used -> Nullable<Varchar>,
        msaf_toco_changes -> Nullable<Varchar>,
        created_at -> Timestamptz,
        updated_at -> Timestamptz,
    }
}

diesel::table! {
    blood_gases (id) {
        id -> Int4,
        baby_id -> Int4,
        blood_gas_type -> Varchar,
        ph -> Nullable<Float4>,
        pco2 -> Nullable<Float4>,
        po2 -> Nullable<Float4>,
        hco3 -> Nullable<Float4>,
        base_excess -> Nullable<Float4>,
        lactate -> Nullable<Float4>,
        created_at -> Timestamptz,
        updated_at -> Timestamptz,
    }
}

diesel::table! {
    cbcs (id) {
        id -> Int4,
        baby_id -> Int4,
        hemoglobin -> Nullable<Float4>,
        total_count -> Nullable<Int4>,
        platelets -> Nullable<Int4>,
        created_at -> Timestamptz,
        updated_at -> Timestamptz,
    }
}

diesel::table! {
    cannula_sites (id) {
        id -> Int4,
        vitals_id -> Int4,
        site_name -> Varchar,
        insertion_time -> Nullable<Timestamp>,
        line_type -> Nullable<Varchar>,
        xray_post_insertion -> Nullable<Bool>,
        time_since_insertion -> Nullable<Int4>,
        created_at -> Timestamp,
        updated_at -> Timestamp,
    }
}

diesel::table! {
    cpap_settings (id) {
        id -> Int4,
        ventilator_setting_id -> Int4,
        peep -> Nullable<Float8>,
        fio2 -> Nullable<Float8>,
    }
}

diesel::table! {
    hfnc_settings (id) {
        id -> Int4,
        ventilator_setting_id -> Int4,
        flow_rate -> Nullable<Float8>,
        fio2 -> Nullable<Float8>,
    }
}

diesel::table! {
    hfov_settings (id) {
        id -> Int4,
        ventilator_setting_id -> Int4,
        amplitude -> Nullable<Float8>,
        frequency -> Nullable<Float8>,
        map -> Nullable<Float8>,
        fio2 -> Nullable<Float8>,
        ie_ratio -> Nullable<Float8>,
    }
}

diesel::table! {
    inotropic_supports (id) {
        id -> Int4,
        vitals_id -> Int4,
        drug_used -> Varchar,
        rationale -> Nullable<Text>,
        ampule_details_json -> Nullable<Jsonb>,
        mixing_details_json -> Nullable<Jsonb>,
        flow_rate -> Nullable<Float8>,
        flow_rate_unit -> Nullable<Varchar>,
        escalation_deescalation_events_json -> Nullable<Jsonb>,
        start_stop_events_json -> Nullable<Jsonb>,
        created_at -> Timestamp,
        updated_at -> Timestamp,
    }
}

diesel::table! {
    ventilator_assist_settings (id) {
        id -> Int4,
        ventilator_setting_id -> Int4,
        mode -> Nullable<Varchar>,
        rate -> Nullable<Int4>,
        pip -> Nullable<Float8>,
        peep -> Nullable<Float8>,
        fio2 -> Nullable<Float8>,
        inspiratory_time -> Nullable<Float8>,
        flow -> Nullable<Float8>,
    }
}

diesel::table! {
    ventilator_control_settings (id) {
        id -> Int4,
        ventilator_setting_id -> Int4,
        mode -> Nullable<Varchar>,
        rate -> Nullable<Int4>,
        pip -> Nullable<Float8>,
        peep -> Nullable<Float8>,
        fio2 -> Nullable<Float8>,
        inspiratory_time -> Nullable<Float8>,
        flow -> Nullable<Float8>,
    }
}

diesel::table! {
    ventilator_settings (id) {
        id -> Int4,
        baby_id -> Int4,
        start_time -> Timestamptz,
        end_time -> Nullable<Timestamptz>,
        setting_type -> Varchar,
        created_at -> Timestamptz,
        updated_at -> Timestamptz,
    }
}

diesel::table! {
    vitals (id) {
        id -> Int4,
        baby_id -> Int4,
        heart_rate -> Nullable<Int4>,
        respiratory_rate -> Nullable<Int4>,
        blood_pressure_systolic -> Nullable<Int4>,
        blood_pressure_diastolic -> Nullable<Int4>,
        temperature -> Nullable<Float8>,
        capillary_refill_time -> Nullable<Int4>,
        perfusion_index -> Nullable<Float8>,
        created_at -> Timestamptz,
        updated_at -> Timestamptz,
    }
}

diesel::joinable!(airway_options -> vitals (vitals_id));
diesel::joinable!(cannula_sites -> vitals (vitals_id));
diesel::joinable!(cpap_settings -> ventilator_settings (ventilator_setting_id));
diesel::joinable!(hfnc_settings -> ventilator_settings (ventilator_setting_id));
diesel::joinable!(hfov_settings -> ventilator_settings (ventilator_setting_id));
diesel::joinable!(inotropic_supports -> vitals (vitals_id));
diesel::joinable!(ventilator_assist_settings -> ventilator_settings (ventilator_setting_id));
diesel::joinable!(ventilator_control_settings -> ventilator_settings (ventilator_setting_id));
diesel::joinable!(ventilator_settings -> babies (baby_id));
diesel::joinable!(vitals -> babies (baby_id));

diesel::allow_tables_to_appear_in_same_query!(
    airway_options,
    babies,
    blood_gases,
    cbcs,
    cannula_sites,
    cpap_settings,
    hfnc_settings,
    hfov_settings,
    inotropic_supports,
    ventilator_assist_settings,
    ventilator_control_settings,
    ventilator_settings,
    vitals,
);
