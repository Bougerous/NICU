Technology Stack
	•	Languages:
	•	TypeScript
	•	Rust
	•	Rust Tools & Frameworks:
	•	TimescaleDB Toolkit and time framedb
	•	Rocket (Rust web framework)
	•	Tauri (Desktop applications) with React
	•	JWT (Authentication)
	•	Future Consideration: Rusk Limbo for gamification
	•	Graphics/Rendering:
	•	Rust-based game engine ( Bevy for user and baby realtime avatars, nicu modeling)

Modular Design

1. Patient/Clinical Data Module
	•	Purpose: Manage baby identification, birth details, weight charts, and vital signs.
    •   Data Points:
        •   Baby Name: String
        •   Sex: String (options: "boy", "girl", "unknown"), required
        •   Birth Weight: Float
        •   Head Circumference: Integer
        •   Length: Integer
        •   Gestational Age: Two integers (weeks, days)
        •   Corrected Gestational Age: Two integers (weeks, days)
        •   Time and Date of Birth: Datetime
        •   Hour of Life: Integer (calculated)
        •   Time of First Meconium: Datetime
        •   Time of First Urine: Datetime
        •   MSAF Status:
            •   Induced: Boolean
            •   Method Used: String
            •   Toco Changes: String (dropdown with common toco changes)

2. Intervention & Treatment Module
	•	Purpose: Handle ventilator settings, inotropic support, and related interventions.
    •   Ventilator Settings:
        •   Record standard settings for different ventilator types (CPAP, HFOV, HFNC, etc.).
        •   Create separate classes for each ventilator type.
        •   Calculate derived parameters (flow volume, area under the curve, etc.).
    •   Inotropic Support:
        •   Include all NICU drugs.
        •   Separate section for common NICU drugs with dosages from Harriet and Lane Handbook.
    •   Other Interventions:
        •   Surgery notes: Date of surgery, last dressing change, last culture taken, etc.
    •   Establish relationships between data points where necessary.

3. Investigation & Imaging Module
	•	Purpose: Manage laboratory investigations, x-rays, ultrasounds, etc.
    •   Laboratory Investigations:
        •   Comprehensive list of tests (100 tests provided), categorized as follows:
            •   Complete Blood Count (CBC) and related parameters
            •   Blood Gases (ABG, VBG, Capillary)
            •   Electrolytes and Renal Function
            •   Liver Function
            •   Inflammation Markers
            •   Coagulation Studies
            •   Metabolic Screening
            •   Endocrine Tests
            •   Other Specialized Tests
    •   X-Rays:
        •   Standard annotation tools with a layering feature for toggling annotations by different users.
    •   Ultrasounds:
        •   (Standard features)
    •   Other Investigations:
        •   ECG and EEG: Include OCR-like functionality to record and analyze data digitally, with annotation capabilities.

4. Task Management Integration
	•	Tool: Kanban board for task coordination


[ **Later**
1. Analytics & Machine Learning Module
	•	Purpose: Integrate dashboards and predictive algorithms:
	•	Sepsis likelihood
	•	Discharge prediction

2. User & Security Module
	•	Purpose:
	•	Multi-user login
	•	Role management
	•	Audit logs
	•	Compliance features
]

Feature Details

Baby Identification & Growth
	•	Fields:
	•	Baby Name (Identification)
	•	Sex
	•	Birth Weight (mandatory) **(Information Button: Link to article about normal birth weight and ranges)**
	•	Optional: Head Circumference, Length **(Information Button: Link to article about normal head circumference and length ranges)**
	•	Other:
	•	Gestational age **(Information Button: Link to article about normal gestational age and timeframes)**
	•	Corrected gestational age **(Information Button: Link to article about normal corrected gestational age and timeframes)**
	•	Time and date of birth **(Information Button: Link to article about normal birth timeframes)**
	•	Automatically calculated hour of life **(Information Button: Link to article about normal hour of life timeframes)**

Meconium & Urine
	•	Tracking:
	•	First meconium and urine **(Information Button: Link to article about normal meconium and urine timeframes)**
	•	MSAF (Meconium-Stained Amniotic Fluid): Induced or not, method used, toco (evidence) **(Information Button: Link to article about MSAF and normal timeframes)**

Weight Tracking
	•	Data:
	•	Current weight **(Information Button: Link to article about normal weight ranges)**
	•	Weight chart with:
	•	Percentage loss vs expected loss **(Information Button: Link to article about normal weight loss percentage and timeframes)**
	•	Expected regain overlay **(Information Button: Link to article about normal weight regain timeframes)**
	•	Alert notifications **(Information Button: Link to article about weight alert notifications and normal ranges)**

Maternal & Perinatal Data
	•	Details:
	•	PROM status and hours **(Information Button: Link to article about PROM status and normal timeframes)**
	•	Mode of delivery **(Information Button: Link to article about normal delivery modes and timeframes)**
	•	Perinatal events (e.g., resuscitation) **(Information Button: Link to article about normal perinatal events and timeframes)**
	•	Maternal comorbidities **(Information Button: Link to article about normal maternal comorbidities and timeframes)**
	•	Current issues **(Information Button: Link to article about normal current maternal issues and timeframes)**
	•	Blood group **(Information Button: Link to article about normal blood group ranges)**
	•	Immunization status **(Information Button: Link to article about normal immunization status and timeframes)**
	•	Vitamin K administration and dose given **(Information Button: Link to article about normal Vitamin K administration and dose timeframes)**

Vitals & Clinical Monitoring

Vitals Charting
	•	Parameters:
	•	Heart rate
	•	Respiratory rate
	•	Blood pressure
	•	Temperature (alerts and reminders)
	•	Capillary refill time (CRT)
	•	Perfusion Index (PI)

Airway & Breathing Management
	•	Airway Options (Dropdown):
		•	RA (Room Air) (default): No specific settings.
		•	Oxygen hood:
			•	Settings: FiO2 (%).
		•	Face mask:
			•	Settings: FiO2 (%), Flow rate (LPM).
		•	Nasal prongs:
			•	Settings: FiO2 (%), Flow rate (LPM).
		•	ET tube (Endotracheal tube):
			•	Settings:
				•	Size (mm)
				•	Depth (cm at lip)
				•	Securement method
	•	Breathing Options (Dropdown):
		•	RA (Room Air) (default): No specific settings.
		•	CPAP (Continuous Positive Airway Pressure):
			•	Settings:
				•	PEEP (cmH2O) - Positive End-Expiratory Pressure
				•	FiO2 (%) - Fraction of Inspired Oxygen
		•	Ventilator assist (Assist Control/SIMV):
			•	Settings:
				•	Mode (Dropdown: AC/VC, AC/PC, SIMV/VC, SIMV/PC) - Assist Control or Synchronized Intermittent Mandatory Ventilation, Volume Control or Pressure Control
				•	Rate (bpm) - Breaths per minute
				•	PIP (cmH2O) - Peak Inspiratory Pressure
				•	PEEP (cmH2O) - Positive End-Expiratory Pressure
				•	FiO2 (%) - Fraction of Inspired Oxygen
				•	Inspiratory Time (s) - Duration of inspiration
				•	Flow (LPM) - Liters Per Minute (for Volume Control modes)
		•	Ventilator control (CMV - Continuous Mandatory Ventilation):
			•	Settings:
				•	Mode (Dropdown: VC-CMV, PC-CMV) - Volume Control or Pressure Control Continuous Mandatory Ventilation
				•	Rate (bpm) - Breaths per minute
				•	PIP (cmH2O) - Peak Inspiratory Pressure
				•	PEEP (cmH2O) - Positive End-Expiratory Pressure
				•	FiO2 (%) - Fraction of Inspired Oxygen
				•	Inspiratory Time (s) - Duration of inspiration
				•	Flow (LPM) - Liters Per Minute (for Volume Control modes)
		•	HFOV (High-Frequency Oscillatory Ventilation):
			•	Settings:
				•	Amplitude (ΔP) - Pressure amplitude
				•	Frequency (Hz) - Oscillations per second
				•	MAP (cmH2O) - Mean Airway Pressure
				•	FiO2 (%) - Fraction of Inspired Oxygen
				•	I:E ratio (%) - Inspiratory to Expiratory ratio
	•	Ventilator Settings:
		•	Popup window with:
			•	Current settings: Display all settings based on selected Airway and Breathing options.
			•	Timeline of previous settings: Chronological list of setting changes with timestamps.
			•	Visual representation of target goals: (Future enhancement) Graph or visual indicator showing current settings in relation to target ranges.
	•	ET tube insertion time (hours/days post 24 hours)

Circulation & Inotropic Support

Circulation
	•	Visual Representation of available cannula sites
	•	Cannula sites (with insertion times)
	•	Active cannulas
	•	Catheter events (optional button)
	•	Line Types:
	•	PICC, Central line (include x-ray post insertion and time since insertion)

Inotropic Support
	•	Recording:
	•	Drug used and rationale
	•	Ampule details (composition, units per mL, total units)
	•	Mixing details (amount of mixing fluid, composition)
	•	Flow rate (with measurement units)

	•	Timeline graph showing:
	•	Escalation, de-escalation
	•	Start-stop events

	•	Common Inotropes:
	•	Noradrenaline, Adrenaline, Milrinone, Sildenafil , Dopamine , Dobutamine

Fluids Management

Fluid Calculations & Visuals
	•	Daily & Hourly Requirements:
	•	ml/kg/day (daily)
	•	Auto-calculation for hourly requirements
	•	Visualization:
	•	Fluid versus feeds percentage
	•	Feeds:
	•	Oral feeds:
	•	Formula details
	•	Breastfeed: Auto-enter name and composition based on hospital standards; GIR auto-calculated
	•	Supplements: Calculate the sugar load
	•	IV Fluids:
	•	Auto-selected fluid for the day
	•	Display composition and auto-calculate GIR
	•	Indicate if KCl is added
	•	Calcium infusion details (peripheral vs. central line)
	•	TPN Provision:
	•	Toggle option for TPN
	•	Includes:
	•	Aminoven infusion rate and dosage
	•	Intralipid rate
	•	Micronutrient infusion rate (if available)
	•	TPN mixing checklist validation

Total Fluid Calculation
	•	Components:
	1.	Feed volume
	2.	Fluid volume
	3.	Calories:
	•	From simple sugars
	•	From protein
	•	From fat
	4.	Protein delivery:
	•	From milk
	•	From Aminoven
	•	From supplements
	5.	GIR and sugar load calculation
	6.	Micronutrient delivery
	7.	Calcium and potassium delivery rates
	8.	Projected fluid rate for the next day
	•	Bolus Calculation:
	•	Automatic selection based on fluid type, rationale, duration, and re-assessment time
	•	High priority alert notifications

Fluid Status
	•	Tracking:
	•	Positive or negative fluid balance
	•	Urine frequency (rough estimates)
	•	Stool tracking (if not quantified)
	•	Quantification of deficit and overload
	•	Alerts:
	•	For catheterization in compromised babies
	•	Minicomb application/removal reminders (with quantity entry)

Interventions
	•	Emergency & Routine Events:
	•	Arrest/resuscitation
	•	Bradycardia
	•	Hypoxia: Interventions (oxygen flush, bagging, ET change)
	•	Extubation
	•	Hyperthermia & Hypothermia

	•	Additional Interventions:
	•	Blood products
	•	Fluid resuscitation
	•	Repeat Vitamin K
	•	Cold water enema
	•	Altered aspirate (with grading)
	•	Bleeding signs & DIC signs
	•	Bed sore assessment (grading and interventions)
	•	Surgical interventions:
	•	Procedure details
	•	Planned intervention date
	•	ICD tube insertion: Reason
	•	CSF tapping: Reason

Imaging & Investigations

X-Rays
	•	Display:
	•	Listed by time and date
	•	Side-by-side viewing option
	•	Annotations (sketch overlay with toggle)
	•	Comments section

Ultrasound (USG)
	•	Tracking:
	•	Serial scans
	•	Findings via OCR or manual entry

Neurosonography (NSG)
	•	Display:
	•	Tabular format with serial findings
	•	Grading and dimensional measurements

ECHO
	•	Recording:
	•	Table for current and previous values
	•	Parameters:
	•	Defects (if present)
	•	Ejection Fraction (EF)
	•	Mitral Regurgitation (MR) grade
	•	MR jet velocity
	•	Other structural anomalies - Major - Minor

Retinoscopy
	•	Planning:
	•	Auto-calculated criteria (based on ventilation and oxygen delivery)
	•	Record:
	•	First visit date and findings
	•	Next visit date
	•	Counseling status

Laboratory Investigations
	•	Basic Tests:
	•	Blood grouping
	•	Rh status (Mother & Father)
	•	Direct Coombs test
	•	Bilirubin:
	•	Transcutaneous bilirubinometry with separate timeline charting:
	•	Colored range bands (based on baby weight, day of life)
	•	Current bilirubin level line
	•	Exchange zone line
	•	Phototherapy initiation and duration point
	•	Hematology:
	•	CBC (Hb, Total Count, Platelets – displayed as a graph)
	•	CRP, Procalcitonin
	•	Biochemistry:
	•	Creatinine
	•	AST/ALT
	•	Electrolytes (Na, K, Cl, Ca, Mg – displayed as a graph)
	•	Arterial Blood Gas (ABG):
	•	Dropdown interpretation
	•	Automated deficit calculation and correction suggestions
	•	Special Tests:
	•	Vitamin D
	•	IEM workup
	•	Culture Reports:
	•	Record culture type and time (Blood, Urine, CSF)
	•	Antibiotic sensitivity:
	•	Design columns per portal standards
	•	Consider converting the sensitivity list into a binary/decimal format for automatic updates
	•	Automatic reminders for culture collection and sterile supplies

Follow-Up & Discharge
	•	Follow-Up:
	•	Opinions and follow-up notes
	•	Before Discharge:
	•	Avery Newborn Checklist
	•	Automatic summary generation via API (integration with ChatGPT/Claude)
	•	JSON Summary Format Example: See below

App-Wide Features

	•	Automation:

	•	Automated CSF analysis
	•	User Management:
	•	Multi-user support with access restrictions
	•	Secure login with audit logs
	•	HIPAA compliance
	•	Data Validation:
	•	Prevent future birth dates
	•	Mandatory field alerts

	•	Templates: For term, preterm, post-term, HIE, meconium aspiration, SN, Down syndrome, etc.
	•	Visualizations:
	•	Heatmap for antibiotic changes and inotropic escalation
	•	Growth charts, developmental milestones, and reflex tracking
	•	Neurodevelopment tracking

	•	Task Coordination:

	•	Kanban board for:
	•	Items to be sent
	•	Items to be collected

	•	Call scheduling and monitoring

	•	Data Export:
	•	Export anonymized data for research

	•	Version Control:
	•	Git-like diff logs to track record changes
	•	Timeline revisions and doctor overrides tracking

skip this for now - [Machine Learning & Diagnostics
	•	Integration:
	•	Sepsis likelihood prediction
	•	Time-to-discharge prediction
	•	Custom Notes:
	•	Field for custom notes
	•	Diagnostic Suggestions:
	•	Query-based diagnostic suggestions (model, token cost, prompt design TBD)]

Additional UI/UX Features
	•	Anonymous user feedback button
	•	Night mode toggle
	•	Git list sign-off option to push changes to the main branch
	•	Counseling notes:
	•	Track attendant aggression and conflicts of interest

JSON Summary Format (Example)

{
  "baby": {
    "name": "Baby Name",
    "sex": "M/F",
    "birthDetails": {
      "date": "YYYY-MM-DD",
      "time": "HH:MM",
      "weight": "grams",
      "gestationalAge": "weeks",
      "correctedGestationalAge": "weeks"
    },
    "vitals": {
      "heartRate": [],
      "respiratoryRate": [],
      "bloodPressure": [],
      "temperature": []
    },
    "labs": {
      "cbc": {},
      "electrolytes": {},
      "bilirubin": {}
    },
    "imaging": {
      "xray": [],
      "usg": [],
      "echo": {}
    },
    "treatments": {
      "antibiotics": [],
      "inotropes": [],
      "ventilatorSettings": {}
    },
    "interventions": [],
    "followUp": []
  },
  "summary": "Automatically generated summary of all patient records and interventions."
}


	•	Monorepo Structure:
	•	The monorepo approach simplifies dependency management across the Rust backend, Tauri desktop app, and shared libraries.
	•	Recommendation:
	•	Establish clear boundaries between packages with well-defined APIs.
	•	Consider tooling (e.g., Nx or Turborepo) to manage interdependencies, caching, and incremental builds.
	•	Version Control & CI/CD:
	•	Git is correctly identified for version control.
	•	Recommendation:
	•	Integrate a CI/CD pipeline (GitHub Actions, GitLab CI, or Jenkins) that runs linting, unit tests, integration tests, and static code analysis on every commit.
	•	Use automated deployments for both the backend and the Tauri app to catch integration issues early.
	•	Technology Stack Overview:
	•	Backend in Rust using Rocket and Diesel is robust and secure.
	•	Tauri with a TypeScript front-end (React)
    react flow for visusalization of the time line of interventions
	•	Future modules (ML integration and a game engine for avatar rendering) are forward-thinking.
	•	Document integration points and contracts (e.g., using OpenAPI/Swagger for REST APIs).

1. Rust Backend Development

2.1. Project Initialization
	•	Steps:
	•	Use Cargo to initialize the project and manage dependencies.
	•	Enhancement:
	•	Define a clear project README that outlines how to set up the local development environment, run tests, and deploy the application.

2.2. Code Organization
	•	Directory Structure:
	•	The provided structure is clean and modular.
	•	Enhancement:
	•	Add directories for utilities, configuration, and middleware.
	•	Example:

src/
  ├── config.rs       // Environment and configuration management
  ├── middleware/     // Request/response middleware (e.g., JWT validation)
  ├── services/       // Business logic that can be reused across endpoints
  ├── main.rs
  ├── models.rs
  ├── db/
  ├── api/
  └── errors.rs


2.3. Core Modules Implementation

Baby/Clinical Data Module:
	•	Struct Definitions & Database Schema:
	•	Ensure that fields such as baby_id, database_baby_id (UUID), and medical details are defined with proper constraints.
	•	Enhancement:
	•	Include comprehensive comments and documentation within code to explain the rationale behind calculated fields (e.g., calculated_time_since_birth_till_now).
	•	Consider versioning the database schema so that future migrations are manageable.

Vitals Module:
	•	Struct & API Endpoints:
	•	Clearly define endpoints for POSTing and GETting vitals.
	•	Enhancement:
	•	Add pagination, filtering, and sorting options to the GET endpoints.
	•	Consider rate-limiting endpoints to prevent abuse.

JWT Authentication & Secret Management:
	•	Security Focus:
	•	Use a robust library such as jsonwebtoken and securely manage secret keys (e.g., via environment variables or a secrets manager).
	•	Enhancement:
	•	Rotate keys periodically.
	•	Consider using a hardware security module (HSM) or a cloud provider’s key management service (KMS) for added security.

2.4. Error Handling, Logging, and Testing

Error Handling:
	•	Custom Error Types:
	•	Create a unified ApiError enum to handle validation, database, authentication, and not-found errors.
	•	Enhancement:
	•	Implement error chaining (using the thiserror crate) to preserve error context.
	•	Ensure that each error variant includes actionable logging details.

Logging:
	•	Logging with env_logger:
	•	Log levels and structured logs (e.g., JSON format) are essential for production debugging.
	•	Enhancement:
	•	Centralize logging configuration.
	•	Consider integrating with external logging services (e.g., Loggly or ELK stack) for centralized monitoring.

Testing:
	•	Unit & Integration Tests:
	•	Use Rust’s testing framework along with a dedicated testing database (in-memory SQLite for speed and isolation).
	•	Enhancement:
	•	Automate tests within the CI/CD pipeline.
	•	Include test cases for edge cases (e.g., malformed input, expired JWTs) and integration tests for end-to-end API flow.
	•	Document testing conventions and coverage expectations.

2.5. Database Migrations
	•	Diesel Migrations Setup:
	•	Ensure migrations are embedded or applied on application startup.
	•	Enhancement:
	•	Automate migration checks during deployment.
	•	Maintain a changelog for database schema modifications.
	•	Consider integrating a rollback strategy to recover from failed migrations.

2.6. Authentication Flow
	•	JWT and Refresh Tokens:
	•	Implementation Details:
	•	Endpoints for /auth/register, /auth/login, /auth/refresh, and password reset flows are well-outlined.
	•	Enhancement:
	•	Implement proper error messaging and logging for authentication failures.
	•	Consider multi-factor authentication (MFA) for higher security in a clinical environment.
	•	Add rate limiting on authentication endpoints to prevent brute force attacks.

3. Tauri Desktop Application

3.1. Project Setup
	•	Tauri App Initialization:
	•	Set up the Tauri project with the preferred front-end framework.
	•	Enhancement:
	•	Document the Tauri CLI usage for building, running, and packaging the desktop app.
	•	Integrate hot-reloading for rapid front-end development.

3.2. UI/UX Design
	•	Modular UI Components:
	•	Provide clear user flows for baby identification, vitals tracking, and intervention dashboards.
	•	Enhancement:
	•	Incorporate responsive design principles.
	•	Use a UI framework (e.g., Material-UI) to ensure consistency.
	•	Build interactive data visualization components for real-time monitoring (using libraries such as Chart.js).

3.3. Integration with Backend
	•	Tauri Command Communication:
	•	Use Tauri commands to bridge the front-end and Rust backend.
	•	Enhancement:
	•	Define a clear API contract for each command.
	•	Handle asynchronous operations gracefully and provide user feedback for loading states.
	•	Secure the Tauri commands against unauthorized access (ensure that command invocations validate JWTs or session tokens).

3.4. Additional Front-end Features
	•	Custom Kanban Board:
	•	Integrate a Kanban board for task management.
	•	Enhancement:
	•	State management libraries (Redux) for managing board state.
	•	Enable drag-and-drop functionality and real-time updates (WebSockets ).
	•	User Experience Improvements:
	•	Include features like night mode toggles, user feedback buttons, and customizable settings.
	•	Enhancement:
	•	Perform usability testing with clinical staff to refine UI components.
	•	Add accessibility features (e.g., keyboard navigation, screen reader support).

## Detailed Frontend Implementation Plan

**1. Project Setup & Initial Structure:**
    *   **Technology Stack:** React, TypeScript, Material-UI (or similar), Tauri.
    *   **Directory Structure (NICU/src):**
        ```
        NICU/src/
        ├── components/         # Reusable UI components
        │   ├── BabyData/
        │   │   ├── BabyIdentification.tsx
        │   │   ├── GrowthCharts.tsx
        │   │   └── VitalsDisplay.tsx
        │   ├── Interventions/
        │   │   ├── VentilatorSettings.tsx
        │   │   ├── InotropicSupport.tsx
        │   │   └── ...
        │   ├── Investigations/
        │   │   ├── LabResults.tsx
        │   │   ├── ImagingViewer.tsx
        │   │   └── ...
        │   ├── TaskManagement/
        │   │   └── KanbanBoard.tsx
        │   ├── common/           # Common components (e.g., buttons, forms)
        │   └── index.ts          # Export all components
        ├── containers/         # Page-level containers/layouts
        │   ├── PatientDashboard.tsx
        │   ├── InterventionsDashboard.tsx
        │   ├── InvestigationsDashboard.tsx
        │   ├── TaskManagementDashboard.tsx
        │   └── index.ts          # Export all containers
        ├── services/           # API service functions (using Tauri invoke)
        │   ├── babyData.ts
        │   ├── interventions.ts
        │   ├── investigations.ts
        │   └── index.ts
        ├── styles/             # Global styles and theme
        │   ├── theme.ts          # Material-UI theme configuration
        │   └── global.css
        ├── App.tsx             # Main application component
        ├── index.html
        ├── main.js             # Tauri main process and event listeners
        └── styles.css          # Basic styles (consider moving to styles/)
        ```
    *   **Tasks:**
        *   [ ] Install React, TypeScript, Material-UI, and other necessary dependencies in `NICU/NICU`.
        *   [ ] Set up basic `index.html`, `main.js`, `App.tsx`, and `styles.css` in `NICU/src`.
        *   [ ] Configure TypeScript (`tsconfig.json`) and Material-UI theme (`styles/theme.ts`).

**2. Core Modules Implementation (Components & Containers):**

    *   **2.1. Patient/Clinical Data Module:**
        *   **Components:**
            *   `BabyIdentification.tsx`: Forms for Baby Name, Sex, Birth Date, etc.
            *   `GrowthCharts.tsx`: Display weight, head circumference, length charts. (Using Chart.js or similar)
            *   `VitalsDisplay.tsx`: Real-time display of Heart rate, Respiratory rate, Blood pressure, Temperature.
        *   **Containers:**
            *   `PatientDashboard.tsx`: Container to integrate all Patient/Clinical Data components.
        *   **Services:**
            *   `babyData.ts`: Functions to fetch and post baby data using Tauri `invoke`.
        *   **Tasks:**
            *   [ ] Create `components/BabyData` and `containers/PatientDashboard`.
            *   [ ] Implement UI components for baby identification and vitals display.
            *   [ ] Implement basic growth charts (static data initially, dynamic later).
            *   [ ] Create `services/babyData.ts` with placeholder API functions.

    *   **2.2. Intervention & Treatment Module:**
        *   **Components:**
            *   `VentilatorSettings.tsx`: Forms and display for CPAP, HFOV, HFNC, etc. settings.
            *   `InotropicSupport.tsx`: Components for drug selection, dosage input, timeline display.
        *   **Containers:**
            *   `InterventionsDashboard.tsx`: Container to manage Intervention & Treatment components.
        *   **Services:**
            *   `interventions.ts`: API functions for ventilator settings and inotropic support.
        *   **Tasks:**
            *   [ ] Create `components/Interventions` and `containers/InterventionsDashboard`.
            *   [ ] Implement UI components for ventilator settings and inotropic support input.
            *   [ ] Create `services/interventions.ts` with placeholder API functions.

    *   **2.3. Investigation & Imaging Module:**
        *   **Components:**
            *   `LabResults.tsx`: Display lab results in tabular format (CBC, Blood Gases, etc.).
            *   `ImagingViewer.tsx`: Basic component to display X-rays/Ultrasounds (placeholder initially).
        *   **Containers:**
            *   `InvestigationsDashboard.tsx`: Container for Investigation & Imaging components.
        *   **Services:**
            *   `investigations.ts`: API functions for lab results and imaging data.
        *   **Tasks:**
            *   [ ] Create `components/Investigations` and `containers/InvestigationsDashboard`.
            *   [ ] Implement UI components for lab results display.
            *   [ ] Create placeholder `ImagingViewer.tsx`.
            *   [ ] Create `services/investigations.ts` with placeholder API functions.

    *   **2.4. Task Management Integration:**
        *   **Components:**
            *   `KanbanBoard.tsx`: Kanban board component (using a library or custom implementation).
        *   **Containers:**
            *   `TaskManagementDashboard.tsx`: Container for Kanban board.
        *   **Services:**
            *   `taskManagement.ts`: API functions for task management (if backend API exists).
        *   **Tasks:**
            *   [ ] Create `components/TaskManagement` and `containers/TaskManagementDashboard`.
            *   [ ] Implement basic Kanban board UI.
            *   [ ] Create `services/taskManagement.ts` (if needed).

**3. API Integration & Data Flow:**

    *   **Tasks:**
        *   [ ] Implement API service functions in `services/` to use Tauri `invoke` to call backend commands.
        *   [ ] Connect frontend components to backend API services to fetch and display data.
        *   [ ] Implement form submissions and data posting to the backend.
        *   [ ] Handle loading states and error messages in UI components.

**4. UI/UX Enhancements & Styling:**

    *   **Tasks:**
        *   [ ] Apply Material-UI theme and styling to all components.
        *   [ ] Implement responsive design for different screen sizes.
        *   [ ] Add user feedback mechanisms (e.g., snackbars for success/error messages).
        *   [ ] Implement night mode toggle in `App.tsx`.
        *   [ ] Add anonymous user feedback button (if required).

**5. Testing & Refinement:**

    *   **Tasks:**
        *   [ ] Component testing (using React Testing Library or Jest).
        *   [ ] End-to-end testing with backend API (manual testing initially, automated tests later).
        *   [ ] User feedback collection and UI/UX refinement.

This detailed plan provides a structured approach to implementing the frontend for the NICU application. It breaks down the implementation into modules and components, and outlines the technologies and steps involved.

Do you approve of this plan?
Below is the completely modified frontend technology stack, refined for clarity, scalability, and enhanced UX:

Frontend Technology Stack
	•	Languages & Frameworks
	•	TypeScript – for type-safe, scalable development.
	•	React – leveraging functional components and hooks for dynamic UIs.
	•	Tauri – to integrate the React-based frontend into a secure, performant desktop application.
	•	UI Libraries & Styling
	•	Material-UI (MUI) – for a comprehensive, accessible component library.
	•	Styled Components / CSS Modules – for modular, maintainable styling.
	•	React Router v6 – for efficient client-side routing and navigation.
	•	State Management & Data Flow
	•	Redux Toolkit – for centralized, predictable state management.
	•	React Context API – for lightweight, component-level state sharing where appropriate.
	•	React Query (or SWR) – to streamline data fetching, caching, and background updates.
	•	Data Visualization & Interactive Components
	•	Chart.js / Recharts – for dynamic charts (e.g., growth and vitals tracking).
	•	React Flow – to create interactive timelines and intervention flow visualizations.
	•	React Kanban (or react-beautiful-dnd) – for an intuitive drag-and-drop task management board.
	•	Build Tools & Testing
	•	Vite – as the modern, lightning-fast build tool and dev server.
	•	ESLint & Prettier – for enforcing code quality and consistent formatting.
	•	Jest & React Testing Library – for unit and integration testing.
	•	Cypress – for comprehensive end-to-end testing.
	•	DevOps & Monorepo Management
	•	Nx or Turborepo – to manage interdependencies across the desktop app and shared libraries.
	•	GitHub Actions (or similar CI/CD) – to automate linting, testing, and deployment pipelines.
	•	Integration & Security
	•	JWT Authentication – for secure token-based user authentication integrated into the frontend.
	•	Tauri API (Commands/Invokes) – for seamless communication between the frontend and the Rust backend.
	•	Sentry – for real-time error logging and performance monitoring.
	•	Accessibility & UX Enhancements
	•	ARIA Compliance – ensuring all components meet accessibility standards.
	•	Night Mode Toggle & Theme Customization – for improved user comfort.
	•	Anonymous Feedback Component – to gather user insights and drive iterative improvements.
	•	Optional/Future Considerations
	•	Service Workers/Offline Capabilities – for improved resilience in varying network conditions.
	•	i18next – for internationalization and multi-language support.
	•	Advanced Analytics Integration – to provide real-time insights and performance dashboards.

This refined stack emphasizes modularity, rapid development with modern tools, and a robust integration pathway with the Rust backend—all while ensuring a responsive, accessible, and user-friendly experience.