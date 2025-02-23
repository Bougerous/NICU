# NICU Project

Welcome to the NICU Project! This README provides a comprehensive guide from fundamental computer science concepts to project-specific details. It's designed to help both beginners and experienced developers understand not just how to work with this project, but also the underlying principles that make it work.

## Table of Contents

- [NICU Project](#nicu-project)
  - [Table of Contents](#table-of-contents)
  - [Fundamental Concepts](#fundamental-concepts)
    - [How Computers Work](#how-computers-work)
    - [Programming Languages and Compilation](#programming-languages-and-compilation)
    - [Memory Management](#memory-management)
    - [Network Communication](#network-communication)
  - [Technology Stack Fundamentals](#technology-stack-fundamentals)
    - [Backend Concepts](#backend-concepts)
    - [Frontend Concepts](#frontend-concepts)
    - [Database Fundamentals](#database-fundamentals)
  - [Overview](#overview)
  - [Project Structure](#project-structure)
    - [Backend (Rust)](#backend-rust)
    - [Frontend (TypeScript/React)](#frontend-typescriptreact)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Setting Up the Backend](#setting-up-the-backend)
    - [Setting Up the Frontend](#setting-up-the-frontend)
  - [Database Migrations](#database-migrations)
  - [Development Workflow](#development-workflow)
  - [Testing](#testing)
    - [Backend Testing](#backend-testing)
    - [Frontend Testing](#frontend-testing)
  - [Additional Information](#additional-information)
  - [Troubleshooting](#troubleshooting)
    - [Common Troubleshooting Guide](#common-troubleshooting-guide)
      - [SQL Issues and Solutions](#sql-issues-and-solutions)
      - [REST API Issues](#rest-api-issues)
    - [Emergency Response Patterns](#emergency-response-patterns)
  - [Learning Rust with This Project](#learning-rust-with-this-project)
    - [Rust Fundamentals in Our Codebase](#rust-fundamentals-in-our-codebase)
      - [1. Ownership and Borrowing](#1-ownership-and-borrowing)
      - [2. Lifetimes](#2-lifetimes)
      - [3. Error Handling](#3-error-handling)
      - [4. Async Programming](#4-async-programming)
    - [Practical Learning Path](#practical-learning-path)
      - [Stage 1: Basic Rust (Week 1-2)](#stage-1-basic-rust-week-1-2)
      - [Stage 2: Intermediate Concepts (Week 3-4)](#stage-2-intermediate-concepts-week-3-4)
      - [Stage 3: Advanced Features (Week 5-6)](#stage-3-advanced-features-week-5-6)
    - [Common Rust Patterns in Our Project](#common-rust-patterns-in-our-project)
      - [1. Builder Pattern](#1-builder-pattern)
      - [2. Repository Pattern](#2-repository-pattern)
      - [3. Error Type Pattern](#3-error-type-pattern)
    - [Advanced Rust Features We Use](#advanced-rust-features-we-use)
      - [1. Macros](#1-macros)
      - [2. Unsafe Code](#2-unsafe-code)
      - [3. FFI (Foreign Function Interface)](#3-ffi-foreign-function-interface)
  - [Deep Dive: Rust Project Architecture](#deep-dive-rust-project-architecture)
    - [Domain-Driven Design in Rust](#domain-driven-design-in-rust)
    - [Advanced Concurrency Patterns](#advanced-concurrency-patterns)
    - [Advanced Type System Usage](#advanced-type-system-usage)
    - [Project-Based Learning Exercises](#project-based-learning-exercises)
      - [Exercise 1: Vital Signs Monitor](#exercise-1-vital-signs-monitor)
      - [Exercise 2: Patient Management System](#exercise-2-patient-management-system)
      - [Exercise 3: Reporting System](#exercise-3-reporting-system)
    - [Advanced Testing Techniques](#advanced-testing-techniques)
    - [Performance Optimization Guidelines](#performance-optimization-guidelines)
    - [Debugging Advanced Issues](#debugging-advanced-issues)
    - [Production Deployment Considerations](#production-deployment-considerations)
      - [1. Binary Optimization](#1-binary-optimization)
      - [2. Cross-Compilation](#2-cross-compilation)
      - [3. Docker Integration](#3-docker-integration)
    - [Industry Best Practices](#industry-best-practices)
      - [1. Code Organization](#1-code-organization)
      - [2. Error Handling Strategy](#2-error-handling-strategy)
      - [3. Monitoring and Observability](#3-monitoring-and-observability)
    - [Advanced Project Challenges](#advanced-project-challenges)
      - [Challenge 1: Real-time Monitoring System](#challenge-1-real-time-monitoring-system)
      - [Challenge 2: Medical Data Analysis Pipeline](#challenge-2-medical-data-analysis-pipeline)
      - [Challenge 3: High-Availability System](#challenge-3-high-availability-system)
    - [Security Considerations](#security-considerations)
      - [1. Secure Coding Patterns](#1-secure-coding-patterns)
      - [2. Authentication Implementation](#2-authentication-implementation)
    - [Continuous Learning Resources](#continuous-learning-resources)
  - [SQL and Database Fundamentals](#sql-and-database-fundamentals)
    - [Understanding SQL Basics](#understanding-sql-basics)
      - [1. What is SQL?](#1-what-is-sql)
      - [2. Basic SQL Commands with NICU Examples](#2-basic-sql-commands-with-nicu-examples)
        - [SELECT - Retrieving Data](#select---retrieving-data)
        - [INSERT - Adding Data](#insert---adding-data)
        - [UPDATE - Modifying Data](#update---modifying-data)
        - [DELETE - Removing Data](#delete---removing-data)
      - [3. Advanced SQL Features](#3-advanced-sql-features)
        - [Joins](#joins)
        - [Aggregations](#aggregations)
        - [Transactions](#transactions)
    - [Database Schema Design](#database-schema-design)
      - [1. Table Relationships](#1-table-relationships)
      - [2. Indexing Strategy](#2-indexing-strategy)
  - [REST API Development](#rest-api-development)
    - [Understanding REST](#understanding-rest)
    - [1. Basic REST Concepts](#1-basic-rest-concepts)
      - [HTTP Methods in Our API](#http-methods-in-our-api)
    - [2. API Endpoints Overview](#2-api-endpoints-overview)
      - [Baby Management](#baby-management)
      - [Vital Signs](#vital-signs)
    - [3. API Response Format](#3-api-response-format)
      - [Success Response](#success-response)
      - [Error Response](#error-response)
    - [4. API Authentication](#4-api-authentication)
    - [5. API Testing](#5-api-testing)
      - [Using cURL](#using-curl)
      - [Integration Tests](#integration-tests)
    - [6. API Documentation](#6-api-documentation)
    - [7. Common API Patterns](#7-common-api-patterns)
      - [Pagination](#pagination)
      - [Filtering and Sorting](#filtering-and-sorting)
  - [Practical Exercises: SQL and REST API](#practical-exercises-sql-and-rest-api)
    - [SQL Exercise Set 1: Basic NICU Queries](#sql-exercise-set-1-basic-nicu-queries)
      - [Patient Census Report](#patient-census-report)
      - [Vital Signs Trending](#vital-signs-trending)
    - [SQL Exercise Set 2: Advanced Analytics](#sql-exercise-set-2-advanced-analytics)
      - [Critical Event Detection](#critical-event-detection)
      - [Resource Utilization Analysis](#resource-utilization-analysis)
    - [REST API Exercise Set 1: Basic Operations](#rest-api-exercise-set-1-basic-operations)
      - [Implement Patient Search](#implement-patient-search)
      - [Batch Operations](#batch-operations)
    - [REST API Exercise Set 2: Advanced Features](#rest-api-exercise-set-2-advanced-features)
      - [Real-time Monitoring](#real-time-monitoring)
      - [Report Generation](#report-generation)
    - [Practice Scenarios](#practice-scenarios)
      - [Scenario 1: Patient Admission Flow](#scenario-1-patient-admission-flow)
      - [Scenario 2: Shift Change Protocol](#scenario-2-shift-change-protocol)
    - [Advanced Integration Exercises](#advanced-integration-exercises)
      - [Implement Alert System](#implement-alert-system)
      - [Implement Analytics Dashboard](#implement-analytics-dashboard)
    - [Learning Path: From Basics to Production](#learning-path-from-basics-to-production)
      - [Week 1-2: SQL Fundamentals](#week-1-2-sql-fundamentals)
      - [Week 3-4: REST API Development](#week-3-4-rest-api-development)
      - [Week 5-6: Integration and Real-time Features](#week-5-6-integration-and-real-time-features)
    - [Final Project: Complete NICU Monitoring System](#final-project-complete-nicu-monitoring-system)

## Fundamental Concepts

### How Computers Work

At the most basic level, computers operate on binary (1s and 0s). Here's how the different layers work:

1. **Hardware Layer**:
   - **CPU (Central Processing Unit)**: Executes instructions using:
     - Arithmetic Logic Unit (ALU): Performs mathematical operations
     - Control Unit: Manages instruction flow
     - Registers: Ultra-fast memory for immediate calculations
   - **Memory Hierarchy**:
     - CPU Registers (fastest, smallest)
     - Cache (L1, L2, L3)
     - RAM (Random Access Memory)
     - Storage (SSD/HDD, slowest but persistent)

2. **Binary and Data Representation**:
   - All data is stored as binary (base-2 numbers)
   - Characters are represented using encoding standards (ASCII, UTF-8)
   - Numbers are stored in various formats (integers, floating-point)
   - Colors are typically stored as RGB values (3 bytes)

### Programming Languages and Compilation

Understanding how our code becomes executable instructions:

1. **Language Levels**:
   - Machine Code (binary instructions)
   - Assembly Language (human-readable machine instructions)
   - Low-Level Languages (C, Rust)
   - High-Level Languages (JavaScript, Python)

2. **Compilation Process**:
   - **Lexical Analysis**: Converting code into tokens
   - **Parsing**: Creating an Abstract Syntax Tree (AST)
   - **Semantic Analysis**: Checking for logical errors
   - **Optimization**: Improving code efficiency
   - **Code Generation**: Creating machine code

3. **Rust Compilation**:
   ```
   Source Code → rustc → LLVM IR → Machine Code
   ```
   Our backend uses Rust, which provides memory safety without garbage collection through its ownership system.

4. **JavaScript/TypeScript Processing**:
   ```
   TypeScript → tsc → JavaScript → V8/Node.js → Machine Code
   ```
   Our frontend code goes through this process for browser execution.

### Memory Management

Different languages handle memory differently:

1. **Manual Memory Management (C/C++)**:
   - Explicit allocation/deallocation
   - Prone to memory leaks and dangling pointers

2. **Garbage Collection (JavaScript)**:
   - Automatic memory management
   - Periodic pauses for collection
   - Used in our frontend code

3. **Ownership System (Rust)**:
   - Compile-time memory management
   - No runtime garbage collection
   - Used in our backend code

### Network Communication

Understanding how our frontend and backend communicate:

1. **OSI Model Layers**:
   - Application (HTTP/HTTPS)
   - Transport (TCP/UDP)
   - Network (IP)
   - Data Link
   - Physical

2. **HTTP Communication**:
   - Request/Response cycle
   - REST principles
   - Status codes and headers
   - JSON data format

## Technology Stack Fundamentals

### Backend Concepts

1. **Web Servers**:
   - Request handling and routing
   - Concurrent connections
   - Thread pools and async processing

2. **Rust-Specific Features**:
   - Ownership and borrowing
   - Lifetimes
   - Traits and generics
   - Error handling with Result/Option

3. **Database Interaction**:
   - Connection pools
   - Query building
   - Transaction management
   - ORM patterns

### Frontend Concepts

1. **Browser Rendering**:
   - DOM (Document Object Model)
   - CSSOM (CSS Object Model)
   - Render tree construction
   - Layout and painting

2. **React Fundamentals**:
   - Virtual DOM
   - Component lifecycle
   - State management
   - Reconciliation process

3. **TypeScript Benefits**:
   - Static typing
   - Interface definitions
   - Type inference
   - Generic types

### Database Fundamentals

1. **Relational Database Concepts**:
   - Tables and relationships
   - Normalization
   - Indexing
   - ACID properties

2. **SQL Fundamentals**:
   - DQL (SELECT)
   - DML (INSERT, UPDATE, DELETE)
   - DDL (CREATE, ALTER, DROP)
   - DCL (GRANT, REVOKE)

## Overview

The NICU project is designed to manage and monitor data in a Neonatal Intensive Care Unit environment. The system is built with modern technologies to ensure performance, security, and scalability. It consists of two main parts:

1. **Backend**: A Rust-based server that leverages the Rocket web framework for routing and HTTP server capabilities, and Diesel as the ORM (Object-Relational Mapping) tool for database interactions. The backend is responsible for processing API requests, handling business logic, and interacting with the database.

2. **Frontend**: A web client built with TypeScript and React, using Vite as a fast development server and bundler. The frontend provides a user-friendly interface for interacting with the backend services, displaying data, and allowing real-time monitoring.

## Project Structure

This workspace is organized into multiple directories to separate concerns and ensure each component is modular:

### Backend (Rust)

Located in the `backend/` folder, key components include:

- **Cargo.toml / Cargo.lock**: These files manage Rust dependencies and build configurations. Cargo handles the building, testing, and running of your Rust project.

- **Rocket.toml**: Configuration file for the Rocket framework. It contains settings such as port numbers, logging levels, and other environment-specific configurations.

- **src/**: Contains all the Rust source code:
   - **api/**: Houses API endpoint definitions and request handlers. Each file in this folder (e.g., `baby.rs`, `vitals.rs`) corresponds to different parts of the NICU data model.
   - **config/**: Manages application settings and configuration reading. This may include parsing environment variables or configuration files.
   - **db/**: Contains the logic for establishing and managing database connections. Acts as the bridge between your Rust code and the SQL database.
   - **errors/**: Defines custom error types and error handling mechanisms to provide meaningful messages when something goes wrong.
   - **main.rs**: The entry point for the backend application. It initializes configurations, sets up routes, and starts the Rocket server.

- **migrations/**: Contains Diesel database migration scripts. Each migration folder (e.g., `2025-02-22-093024_create_babies_table`) provides SQL scripts for applying (`up.sql`) or rolling back (`down.sql`) schema changes.

### Frontend (TypeScript/React)

The frontend is available primarily in the `NICU/` folder and includes:

- **package.json**: Manages Node.js dependencies and scripts. Common tasks include starting the development server and building the project for production.

- **index.html**: The main HTML file that loads the web application. It typically includes a root element where the React components are mounted.

- **vite.config.ts**: Vite configuration file. This file sets up module resolution, development server options, and build configurations.

- **src/**: Contains the TypeScript source code and React components:
   - **components/**: Includes reusable UI components. For example, the `BabyData` component might display vital baby data fetched from the backend.
   - Other subdirectories and files organize state management, utilities, and additional features.

There is also a separate `src/` folder at the root level which might contain additional code, such as Rust interop or shared models. Refer to its `Cargo.toml` and `lib.rs` files for more information.

## Getting Started

Follow these steps to set up your development environment:

### Prerequisites

- [Rust](https://www.rust-lang.org/tools/install): The programming language used for backend development.
- [Diesel CLI](https://diesel.rs/guides/getting-started/): Command-line tool for managing database migrations. Install using Cargo.
- [Node.js and npm](https://nodejs.org/): Required for running the frontend development server and managing JavaScript packages.

### Setting Up the Backend

1. **Install Rust**: If not already installed, follow instructions on the [Rust website](https://www.rust-lang.org/tools/install) to install Rust and Cargo.

2. **Install Diesel CLI**: Open a terminal and run:
   ```bash
   cargo install diesel_cli --no-default-features --features postgres
   ```
   Note: Adjust the features if using a different database (e.g., sqlite).

3. **Environment Setup**: Create an `.env` file in the `backend/` folder if it is required by Diesel or Rocket. This file typically contains sensitive information such as `DATABASE_URL` and other environment-specific settings.

4. **Run the Backend**: In the terminal, navigate to the `backend/` folder and start the server with:
   ```bash
   cargo run
   ```
   Rocket will start up and listen on the configured port (as specified in `Rocket.toml`).

### Setting Up the Frontend

1. **Install Node Modules**: Open a terminal, navigate to the `NICU/` folder and install dependencies:
   ```bash
   npm install
   ```

2. **Start the Development Server**: Once the installation is complete, run:
   ```bash
   npm run dev
   ```
   This will start the Vite development server. Open your browser and navigate to the specified local host address to view the application.

## Database Migrations

The backend uses Diesel for managing database migrations. These migrations help track changes in the database schema over time. They are located in the `backend/migrations/` directory.

- **Applying Migrations**: From the `backend/` folder, run:
   ```bash
   diesel migration run
   ```
   This will apply all pending migrations.

- **Rolling Back Migrations**: If you need to revert a migration, run:
   ```bash
   diesel migration revert
   ```
   This will roll back the most recent migration applied.

Detailed SQL commands in each migration folder (`up.sql` for applying changes and `down.sql` for reversion) help you understand exactly what is being changed in your database.

## Development Workflow

- **Backend Development**: Make iterative changes in the `backend/src/` directory. Regularly run `cargo run` to test your changes and `cargo test` to run unit tests. Use Diesel CLI commands to manage database schema changes.

- **Frontend Development**: Develop and modify components within the `NICU/src/` folder. The Vite server provides live reloading so you see changes immediately.

- **Version Control**: Use Git to track code changes. Ensure you commit often with clear messages. Review changes using Git diff tools before pushing.

## Testing

### Backend Testing

- Use the built-in testing features of Rust by writing tests in your modules and running:
   ```bash
   cargo test
   ```
   Ensure all tests pass before merging new changes.

### Frontend Testing

- Depending on your setup, you might use Jest, React Testing Library, or another framework. Check your `package.json` for configured test scripts, and run:
   ```bash
   npm test
   ```

## Additional Information

- **Configuration Files**:
   - `Rocket.toml`: Contains server and environment-specific settings for Rocket. Review this file to understand how the server is configured.
   - `tsconfig.json` & `tsconfig.app.json`: Control TypeScript compiler options for the frontend. These settings determine how TypeScript code is transpiled to JavaScript.
   - `vite.config.ts`: Configures how Vite handles bundling, module resolution, and development server hot reloading.

- **Logging and Debugging**:
   - The backend uses Rocket’s logging; you can adjust logging levels in `Rocket.toml`.
   - In the frontend, use browser developer tools to inspect errors and component behavior.

- **Documentation & Community Support**:
   - Check out the documentation for [Rocket](https://rocket.rs/v0.5-rc/guide/) and [Diesel](http://diesel.rs/guides/) for detailed usage explanations.
   - Explore online forums for Rust and React for common issues and solutions.

## Troubleshooting

- **Environment Issues**: Ensure all prerequisites are properly installed. Misconfigured environment variables in the `.env` file can cause connection issues.

- **Dependency Problems**: If you run into dependency issues in the frontend, try deleting `node_modules` and running `npm install` again.

- **Database Connectivity**: Verify that your database server is running and accessible. Check the `DATABASE_URL` in your `.env` file.

- **Compilation Errors**: Use the error messages provided by Cargo (for backend) or your terminal output (for frontend) to troubleshoot compilation issues. Consult the respective documentation if needed.

### Common Troubleshooting Guide

#### SQL Issues and Solutions

1. **Slow Queries**
```sql
-- Use EXPLAIN ANALYZE to understand query performance
EXPLAIN ANALYZE
SELECT v.* 
FROM vitals v
JOIN babies b ON v.baby_id = b.id
WHERE b.unit_id = 1
ORDER BY v.timestamp DESC;

-- Solution: Add composite index
CREATE INDEX idx_vitals_baby_timestamp 
ON vitals (baby_id, timestamp DESC);

-- Check if index is being used
EXPLAIN (ANALYZE, BUFFERS)
SELECT /* your query */;
```

2. **Deadlocks**
```sql
-- Identify deadlocks
SELECT blocked_locks.pid AS blocked_pid,
       blocking_locks.pid AS blocking_pid,
       blocked_activity.usename AS blocked_user,
       blocking_activity.usename AS blocking_user,
       blocked_activity.query AS blocked_statement,
       blocking_activity.query AS blocking_statement
FROM pg_catalog.pg_locks AS blocked_locks
JOIN pg_catalog.pg_stat_activity AS blocked_activity ON blocked_activity.pid = blocked_locks.pid
JOIN pg_catalog.pg_locks AS blocking_locks 
    ON blocking_locks.locktype = blocked_locks.locktype
    AND blocking_locks.DATABASE IS NOT DISTINCT FROM blocked_locks.DATABASE
    AND blocking_locks.relation IS NOT DISTINCT FROM blocked_locks.relation
    AND blocking_locks.page IS NOT DISTINCT FROM blocked_locks.page
    AND blocking_locks.tuple IS NOT DISTINCT FROM blocked_locks.tuple
    AND blocking_locks.virtualxid IS NOT DISTINCT FROM blocked_locks.virtualxid
    AND blocking_locks.transactionid IS NOT DISTINCT FROM blocked_locks.transactionid
    AND blocking_locks.classid IS NOT DISTINCT FROM blocked_locks.classid
    AND blocking_locks.objid IS NOT DISTINCT FROM blocked_locks.objid
    AND blocking_locks.objsubid IS NOT DISTINCT FROM blocked_locks.objsubid
    AND blocking_locks.pid != blocked_locks.pid
JOIN pg_catalog.pg_stat_activity AS blocking_activity ON blocking_activity.pid = blocking_locks.pid
WHERE NOT blocked_locks.GRANTED;
```

#### REST API Issues

1. **Authentication Debugging**
```rust
// Add debug logging to auth middleware
impl AuthMiddleware {
    async fn check_token(&self, token: &str) -> Result<Claims, AuthError> {
        tracing::debug!("Validating token: {}", token.split('.').next().unwrap_or("invalid"));
        // Token validation logic
        match decode_token(token) {
            Ok(claims) => {
                tracing::debug!("Token valid for user: {}", claims.sub);
                Ok(claims)
            }
            Err(e) => {
                tracing::error!("Token validation failed: {:?}", e);
                Err(AuthError::InvalidToken)
            }
        }
    }
}
```

2. **Connection Pool Issues**
```rust
// Monitor pool metrics
impl DbPool {
    fn get_metrics(&self) -> PoolMetrics {
        PoolMetrics {
            active_connections: self.active_connections(),
            idle_connections: self.idle_connections(),
            max_connections: self.max_connections(),
            pending_requests: self.pending_requests(),
        }
    }
}

// Implement health check
#[get("/health")]
async fn health_check(db: &State<DbPool>) -> Result<Json<HealthStatus>, Error> {
    let metrics = db.get_metrics();
    if metrics.pending_requests > 10 {
        tracing::warn!("High number of pending requests: {}", metrics.pending_requests);
    }
    Ok(Json(HealthStatus::from(metrics)))
}
```

3. **Performance Monitoring**
```rust
// Add timing metrics to endpoints
#[get("/babies/<id>/full-status")]
#[instrument(skip(db), fields(baby_id = %id))]
async fn get_baby_status(id: i32, db: &State<DbPool>) -> Result<Json<BabyStatus>, Error> {
    let timer = metrics::histogram!("api.get_baby_status.duration");
    let _timer_guard = timer.start_timer();

    let status = db.run(move |conn| {
        // Fetch baby status
        babies::table
            .find(id)
            .first::<Baby>(conn)
    }).await?;

    metrics::counter!("api.get_baby_status.success").increment(1);
    Ok(Json(status))
}
```

### Emergency Response Patterns

1. **Circuit Breaker for External Services**
```rust
struct CircuitBreaker {
    failure_threshold: u32,
    failure_count: AtomicU32,
    last_failure: AtomicI64,
    reset_timeout: Duration,
}

impl CircuitBreaker {
    async fn call<F, T, E>(&self, f: F) -> Result<T, E>
    where
        F: Future<Output = Result<T, E>>,
    {
        if self.is_open() {
            return Err(CircuitBreakerError::Open.into());
        }
        
        match f.await {
            Ok(result) => {
                self.record_success();
                Ok(result)
            }
            Err(e) => {
                self.record_failure();
                Err(e)
            }
        }
    }
}
```

2. **Fallback Mechanisms**
```rust
// Implement fallback for vital signs monitoring
async fn get_vital_signs(baby_id: i32) -> Result<VitalSigns, Error> {
    // Try primary monitor
    match primary_monitor.get_vitals(baby_id).await {
        Ok(vitals) => Ok(vitals),
        Err(e) => {
            tracing::warn!("Primary monitor failed: {:?}, trying backup", e);
            // Try backup monitor
            match backup_monitor.get_vitals(baby_id).await {
                Ok(vitals) => {
                    tracing::info!("Successfully retrieved vitals from backup");
                    Ok(vitals)
                }
                Err(e) => {
                    tracing::error!("Both monitors failed: {:?}", e);
                    Err(e)
                }
            }
        }
    }
}
```

3. **Rate Limiting**
```rust
// Implement rate limiting for API endpoints
struct RateLimiter {
    window_ms: u64,
    max_requests: u32,
    requests: HashMap<String, Vec<Instant>>,
}

impl RateLimiter {
    fn check_rate_limit(&mut self, key: &str) -> bool {
        let now = Instant::now();
        let window_start = now - Duration::from_millis(self.window_ms);
        
        self.requests.entry(key.to_string())
            .and_modify(|requests| {
                requests.retain(|&time| time > window_start);
                requests.push(now);
            })
            .or_insert_with(|| vec![now]);
            
        self.requests.get(key)
            .map(|requests| requests.len() <= self.max_requests as usize)
            .unwrap_or(true)
    }
}
```

These patterns help maintain system stability and provide graceful degradation under load or during partial failures.

Remember to:
- Monitor system metrics
- Set up alerts for abnormal patterns
- Document recovery procedures
- Test failure scenarios
- Keep logs for post-mortem analysis
- Update runbooks regularly

Happy Coding!

## Learning Rust with This Project

This section provides a comprehensive guide to learning Rust using this project as a practical example.

### Rust Fundamentals in Our Codebase

#### 1. Ownership and Borrowing
Our project demonstrates Rust's unique memory management system:

```rust
// Examples from our codebase:

// Ownership transfer in API handlers
async fn create_baby(baby: Json<NewBaby>) -> Result<Json<Baby>, Error> {
    // baby parameter owns its data
}

// Borrowing in database queries
fn get_baby_by_id(conn: &mut PgConnection, id: i32) -> Result<Baby, Error> {
    // conn is borrowed, allowing multiple references
}
```

Key concepts to understand:
- Single ownership prevents memory leaks
- Borrowing enables multiple references
- No garbage collection overhead
- Memory safety at compile time

#### 2. Lifetimes
Found throughout our database connections and API responses:

```rust
// Example lifetime annotations in our models
struct BabyData<'a> {
    baby: &'a Baby,
    vitals: &'a [Vital],
}
```

Understanding lifetimes helps you:
- Manage reference validity
- Prevent dangling references
- Structure data relationships

#### 3. Error Handling
Our project uses Rust's Result type extensively:

```rust
// Error handling patterns we use
pub enum ApiError {
    DatabaseError(diesel::result::Error),
    NotFound,
    ValidationError(String),
}

// Converting between error types
impl From<diesel::result::Error> for ApiError {
    fn from(err: diesel::result::Error) -> ApiError {
        ApiError::DatabaseError(err)
    }
}
```

Learn about:
- Result and Option types
- Error propagation with ?
- Custom error types
- Error conversion

#### 4. Async Programming
Our API handlers use async/await:

```rust
// Async patterns in our codebase
#[get("/babies/<id>")]
async fn get_baby(id: i32, db: DbConn) -> Result<Json<Baby>, ApiError> {
    let baby = db.run(move |conn| {
        babies::table
            .find(id)
            .first::<Baby>(conn)
    }).await?;
    Ok(Json(baby))
}
```

Key async concepts:
- Future trait
- Async/await syntax
- Tokio runtime
- Concurrent task handling

### Practical Learning Path

#### Stage 1: Basic Rust (Week 1-2)
Start with these files:
1. `src/models/baby.rs` - Learn structs and impl blocks
2. `src/schema.rs` - Understand Rust's type system
3. `src/api/api_response.rs` - Basic error handling

Exercises:
1. Add new fields to the Baby struct
2. Implement Display trait for ApiResponse
3. Create custom error types

#### Stage 2: Intermediate Concepts (Week 3-4)
Focus on:
1. `src/db/connection.rs` - Database pools and lifetimes
2. `src/api/baby.rs` - REST API implementation
3. `src/middleware/` - Rocket framework concepts

Exercises:
1. Add transaction support to database operations
2. Implement new API endpoints
3. Create custom middleware

#### Stage 3: Advanced Features (Week 5-6)
Explore:
1. `src/services/` - Business logic and trait implementations
2. Concurrent operations with async/await
3. Integration testing

Projects:
1. Implement batch processing
2. Add WebSocket support
3. Create comprehensive test suite

### Common Rust Patterns in Our Project

#### 1. Builder Pattern
```rust
// Example from our codebase
BabyBuilder::new()
    .name("John Doe")
    .birth_date(NaiveDateTime::from_timestamp(0, 0))
    .weight(3.5)
    .build()
```

#### 2. Repository Pattern
```rust
// Database abstraction
trait BabyRepository {
    fn find_by_id(&self, id: i32) -> Result<Baby, Error>;
    fn save(&self, baby: &Baby) -> Result<(), Error>;
}
```

#### 3. Error Type Pattern
```rust
#[derive(Debug)]
pub enum ServiceError {
    NotFound,
    Database(DbError),
    Validation(String),
}
```

### Advanced Rust Features We Use

#### 1. Macros
Examples of macro usage:
```rust
// Diesel table associations
table! {
    babies (id) {
        id -> Int4,
        name -> Varchar,
    }
}

// Rocket route definitions
#[get("/babies")]
async fn list_babies() -> Result<Json<Vec<Baby>>, Error>
```

#### 2. Unsafe Code
Learn where and why we use unsafe:
```rust
// Example of necessary unsafe code
unsafe fn raw_connection_handle(conn: &PgConnection) -> *mut pg_sys::PGconn {
    // Handle raw database connections
}
```

#### 3. FFI (Foreign Function Interface)
Database driver integration:
```rust
extern "C" {
    fn pg_connection_reset(conn: *mut pg_sys::PGconn) -> c_int;
}
```

## Deep Dive: Rust Project Architecture

### Domain-Driven Design in Rust

Our NICU project follows DDD principles:

1. **Bounded Contexts**
```rust
// Example of how we separate bounded contexts
mod vitals {
    // Domain logic for vital signs
    pub struct VitalSigns {
        blood_pressure: BloodPressure,
        heart_rate: HeartRate,
        oxygen_saturation: O2Saturation,
    }
}

mod respiratory {
    // Separate context for respiratory management
    pub struct VentilatorSettings {
        mode: VentMode,
        peep: Pressure,
        fio2: Percentage,
    }
}
```

2. **Value Objects**
```rust
// Example from our medical measurements
#[derive(Debug, Clone)]
pub struct BloodPressure {
    systolic: Pressure,
    diastolic: Pressure,
    
    // Invariant enforcement
    fn new(systolic: f32, diastolic: f32) -> Result<Self, ValidationError> {
        if diastolic > systolic {
            return Err(ValidationError::InvalidBloodPressure);
        }
        // ...
    }
}
```

### Advanced Concurrency Patterns

1. **Actor Model with Tokio**
```rust
// Example of our monitoring system
struct VitalSignsMonitor {
    patient_id: PatientId,
    alert_tx: mpsc::Sender<Alert>,
    vital_signs_rx: mpsc::Receiver<VitalSigns>,
}

impl VitalSignsMonitor {
    async fn run(&mut self) {
        while let Some(vitals) = self.vital_signs_rx.recv().await {
            if let Some(alert) = self.check_vital_signs(&vitals) {
                self.alert_tx.send(alert).await?;
            }
        }
    }
}
```

2. **Backpressure Handling**
```rust
// How we handle data stream overload
#[derive(Debug)]
struct DataBuffer<T> {
    buffer: VecDeque<T>,
    max_size: usize,
}

impl<T> DataBuffer<T> {
    async fn push(&mut self, item: T) -> Result<(), BufferFullError> {
        if self.buffer.len() >= self.max_size {
            self.handle_overflow().await?;
        }
        self.buffer.push_back(item);
        Ok(())
    }
}
```

### Advanced Type System Usage

1. **Type State Pattern**
```rust
// Example from our patient admission system
struct Admitted;
struct Discharged;

struct Patient<State> {
    id: PatientId,
    data: PatientData,
    state: PhantomData<State>,
}

impl Patient<Admitted> {
    fn discharge(self) -> Patient<Discharged> {
        // Transform patient state
    }
}
```

2. **Generic Type Constraints**
```rust
// How we handle different types of measurements
trait Measurement: Send + Sync {
    fn unit(&self) -> Unit;
    fn value(&self) -> f64;
}

fn record_measurement<T: Measurement + 'static>(
    measurement: T,
    patient_id: PatientId,
) -> Result<(), DbError> {
    // Generic measurement recording
}
```

### Project-Based Learning Exercises

#### Exercise 1: Vital Signs Monitor
Implement a real-time vital signs monitor:

1. Create async streams for vital sign data
2. Implement alerting thresholds
3. Handle data persistence
4. Add error recovery

#### Exercise 2: Patient Management System
Build a complete patient management module:

1. Implement CRUD operations
2. Add validation rules
3. Create audit logging
4. Handle concurrent updates

#### Exercise 3: Reporting System
Develop a statistical reporting system:

1. Implement data aggregation
2. Create async report generation
3. Handle large datasets
4. Add caching

### Advanced Testing Techniques

1. **Property-Based Testing**
```rust
#[test]
fn prop_blood_pressure_validation() {
    proptest!(|(systolic: f32, diastolic: f32)| {
        let bp = BloodPressure::new(systolic, diastolic);
        if systolic > diastolic {
            assert!(bp.is_ok());
        } else {
            assert!(bp.is_err());
        }
    });
}
```

2. **Async Testing**
```rust
#[tokio::test]
async fn test_vital_signs_monitoring() {
    let (tx, rx) = mpsc::channel(100);
    let monitor = VitalSignsMonitor::new(rx);
    
    // Test async monitoring behavior
    tx.send(test_vitals()).await.unwrap();
    assert_eq!(monitor.alerts().await.len(), 1);
}
```

### Performance Optimization Guidelines

1. **Memory Optimization**
- Use `Box<T>` for large structs
- Implement custom allocators
- Profile heap allocations

2. **Concurrency Optimization**
- Use appropriate async runtime features
- Implement connection pooling
- Optimize task scheduling

3. **Database Optimization**
- Implement efficient query patterns
- Use appropriate indexes
- Handle connection pooling

### Debugging Advanced Issues

1. **Memory Leaks**
```rust
#[global_allocator]
static ALLOC: TracingAlloc = TracingAlloc::new();

// Track allocations in tests
#[test]
fn check_memory_usage() {
    let snapshot = ALLOC.snapshot();
    // Run your code
    assert!(ALLOC.diff_from(&snapshot).total_bytes < 1024);
}
```

2. **Deadlock Detection**
```rust
// Implementation of deadlock detection
use parking_lot::deadlock;

fn deadlock_detection() {
    let deadlocks = deadlock::check_deadlock();
    if !deadlocks.is_empty() {
        println!("{} deadlocks detected", deadlocks.len());
        for (i, threads) in deadlocks.iter().enumerate() {
            println!("Deadlock #{}", i);
            for t in threads {
                println!("Thread Id {:#?}", t.thread_id());
                println!("{:#?}", t.backtrace());
            }
        }
    }
}
```

### Production Deployment Considerations

#### 1. Binary Optimization
```rust
// Cargo.toml configurations for optimal binaries
[profile.release]
opt-level = 3
lto = true
codegen-units = 1
panic = 'abort'
strip = true
```

#### 2. Cross-Compilation
```bash
# Cross-compilation for different targets
rustup target add x86_64-unknown-linux-musl
cargo build --target x86_64-unknown-linux-musl --release
```

#### 3. Docker Integration
```dockerfile
# Multi-stage build example from our project
FROM rust:1.70 as builder
WORKDIR /usr/src/nicu
COPY . .
RUN cargo build --release

FROM debian:buster-slim
COPY --from=builder /usr/src/nicu/target/release/nicu /usr/local/bin/
CMD ["nicu"]
```

### Industry Best Practices

#### 1. Code Organization
```rust
// Example of our layered architecture
src/
├── domain/      // Core business logic
│   ├── models/
│   └── services/
├── application/ // Use cases and orchestration
│   ├── commands/
│   └── queries/
├── infrastructure/ // External concerns
│   ├── database/
│   └── api/
└── main.rs      // Application entry
```

#### 2. Error Handling Strategy
```rust
// Comprehensive error handling
#[derive(Debug, thiserror::Error)]
pub enum DomainError {
    #[error("Invalid vital signs: {0}")]
    InvalidVitalSigns(String),
    
    #[error("Patient not found: {0}")]
    PatientNotFound(PatientId),
    
    #[error(transparent)]
    DatabaseError(#[from] sqlx::Error),
}

// Result type aliases
type DomainResult<T> = Result<T, DomainError>;
```

#### 3. Monitoring and Observability
```rust
// Telemetry integration
use opentelemetry::trace::{Tracer, TraceError};

#[tracing::instrument(skip(db))]
async fn record_vital_signs(
    patient_id: PatientId,
    vitals: VitalSigns,
    db: &DatabasePool,
) -> Result<(), Error> {
    tracing::info!("Recording vital signs for patient {}", patient_id);
    // Implementation
}
```

### Advanced Project Challenges

#### Challenge 1: Real-time Monitoring System
Implement a real-time monitoring system that:
- Uses WebSocket connections for live updates
- Handles backpressure with streaming
- Implements circuit breakers for system stability
- Provides monitoring metrics

#### Challenge 2: Medical Data Analysis Pipeline
Create a data analysis system that:
- Processes large datasets efficiently
- Uses parallel processing with Rayon
- Implements custom allocators for memory optimization
- Generates statistical reports

#### Challenge 3: High-Availability System
Build a distributed system that:
- Implements leader election
- Handles network partitions
- Provides data replication
- Ensures eventual consistency

### Security Considerations

#### 1. Secure Coding Patterns
```rust
// Example of secure data handling
pub struct SensitiveData(Vec<u8>);

impl Drop for SensitiveData {
    fn drop(&mut self) {
        self.0.iter_mut().for_each(|b| *b = 0);
    }
}
```

#### 2. Authentication Implementation
```rust
// JWT token validation example
#[derive(Debug)]
struct Claims {
    sub: String,
    role: String,
    exp: usize,
}

// Authentication middleware
#[async_trait]
impl<'r> FromRequest<'r> for AuthenticatedUser {
    type Error = AuthError;

    async fn from_request(request: &'r Request<'_>) -> Result<Self, Self::Error> {
        let token = request.headers()
            .get_one("Authorization")
            .ok_or(AuthError::MissingToken)?;
        
        validate_token(token).await
    }
}
```

### Continuous Learning Resources

1. **Recommended Reading Order**:
   - The Rust Book
   - Asynchronous Programming in Rust
   - Our project's domain modules
   - Advanced implementation details

2. **Practice Projects**:
   - Start with vital signs monitoring
   - Progress to patient management
   - Implement reporting system
   - Build full system integration

3. **Community Resources**:
   - Rust users forum
   - This project's issues
   - Discord channel
   - Weekly pair programming sessions

Remember: The best way to learn is by doing. Start with small changes and gradually work your way up to more complex features. Don't hesitate to ask questions in our community channels!

## SQL and Database Fundamentals

### Understanding SQL Basics

#### 1. What is SQL?
SQL (Structured Query Language) is the standard language for working with relational databases. In our NICU project, we use PostgreSQL as our database system.

#### 2. Basic SQL Commands with NICU Examples

##### SELECT - Retrieving Data
```sql
-- Get all babies in the NICU
SELECT * FROM babies;

-- Get specific baby details
SELECT name, birth_date, weight 
FROM babies 
WHERE id = 1;

-- Get vital signs for a specific baby
SELECT v.* 
FROM vitals v
JOIN babies b ON v.baby_id = b.id
WHERE b.name = 'John Doe'
ORDER BY v.timestamp DESC
LIMIT 10;
```

##### INSERT - Adding Data
```sql
-- Add a new baby to the system
INSERT INTO babies (name, birth_date, weight, gestation_weeks)
VALUES ('Jane Doe', '2024-02-22 10:00:00', 2.5, 34);

-- Record vital signs
INSERT INTO vitals (baby_id, heart_rate, blood_pressure_systolic, blood_pressure_diastolic, temperature)
VALUES (1, 120, 65, 45, 36.8);
```

##### UPDATE - Modifying Data
```sql
-- Update baby's weight
UPDATE babies
SET weight = 2.7
WHERE id = 1;

-- Update multiple vital sign records
UPDATE vitals
SET is_verified = true
WHERE baby_id = 1 AND timestamp >= CURRENT_DATE;
```

##### DELETE - Removing Data
```sql
-- Remove old vital sign records
DELETE FROM vitals
WHERE timestamp < CURRENT_DATE - INTERVAL '30 days';
```

#### 3. Advanced SQL Features

##### Joins
```sql
-- Complex join to get complete baby status
SELECT 
    b.name,
    v.heart_rate,
    v.temperature,
    bs.blood_sugar,
    vs.mode AS ventilator_mode
FROM babies b
LEFT JOIN vitals v ON b.id = v.baby_id
LEFT JOIN blood_gases bs ON b.id = bs.baby_id
LEFT JOIN ventilator_settings vs ON b.id = vs.baby_id
WHERE v.timestamp = (
    SELECT MAX(timestamp) 
    FROM vitals 
    WHERE baby_id = b.id
);
```

##### Aggregations
```sql
-- Calculate average vital signs per day
SELECT 
    baby_id,
    DATE(timestamp) as date,
    AVG(heart_rate) as avg_heart_rate,
    AVG(temperature) as avg_temperature,
    COUNT(*) as measurement_count
FROM vitals
GROUP BY baby_id, DATE(timestamp)
HAVING COUNT(*) > 5;
```

##### Transactions
```sql
-- Example of a transaction in our system
BEGIN;
    -- Record transfer to new unit
    UPDATE babies 
    SET unit_id = 2 
    WHERE id = 1;
    
    -- Log the transfer
    INSERT INTO transfer_logs (baby_id, from_unit, to_unit, timestamp)
    VALUES (1, 1, 2, CURRENT_TIMESTAMP);
COMMIT;
```

### Database Schema Design

#### 1. Table Relationships
Our NICU database uses several relationship types:

```sql
-- One-to-Many Relationship
CREATE TABLE babies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    birth_date TIMESTAMP NOT NULL
);

CREATE TABLE vitals (
    id SERIAL PRIMARY KEY,
    baby_id INTEGER REFERENCES babies(id),
    timestamp TIMESTAMP NOT NULL,
    heart_rate INTEGER,
    temperature DECIMAL(3,1)
);

-- Many-to-Many Relationship
CREATE TABLE nurses (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE baby_nurse_assignments (
    baby_id INTEGER REFERENCES babies(id),
    nurse_id INTEGER REFERENCES nurses(id),
    shift_start TIMESTAMP NOT NULL,
    shift_end TIMESTAMP NOT NULL,
    PRIMARY KEY (baby_id, nurse_id, shift_start)
);
```

#### 2. Indexing Strategy
```sql
-- Common indexes in our system
CREATE INDEX idx_vitals_baby_timestamp 
ON vitals (baby_id, timestamp);

CREATE INDEX idx_baby_name 
ON babies (name);

-- Partial index for active babies
CREATE INDEX idx_active_babies 
ON babies (unit_id) 
WHERE discharge_date IS NULL;
```

## REST API Development

### Understanding REST

REST (Representational State Transfer) is an architectural style for designing networked applications. Our NICU system implements a RESTful API for communication between frontend and backend.

### 1. Basic REST Concepts

#### HTTP Methods in Our API
```rust
// Examples from our codebase

// GET - Retrieve data
#[get("/babies/<id>")]
async fn get_baby(id: i32) -> Result<Json<Baby>, Error>

// POST - Create new data
#[post("/babies")]
async fn create_baby(baby: Json<NewBaby>) -> Result<Json<Baby>, Error>

// PUT - Update existing data
#[put("/babies/<id>")]
async fn update_baby(id: i32, baby: Json<UpdateBaby>) -> Result<Json<Baby>, Error>

// DELETE - Remove data
#[delete("/babies/<id>")]
async fn delete_baby(id: i32) -> Result<Status, Error>
```

### 2. API Endpoints Overview

#### Baby Management
```
GET /api/babies
- Returns list of all babies
- Query parameters:
  - unit_id: Filter by unit
  - status: Filter by status (active/discharged)

GET /api/babies/<id>
- Returns detailed information about specific baby
- Includes latest vital signs and current settings

POST /api/babies
- Create new baby record
- Required fields:
  {
    "name": "string",
    "birth_date": "datetime",
    "weight": "float",
    "gestation_weeks": "integer"
  }

PUT /api/babies/<id>
- Update baby information
- Supports partial updates
```

#### Vital Signs
```
GET /api/babies/<id>/vitals
- Returns vital signs history
- Query parameters:
  - from: Start timestamp
  - to: End timestamp
  - limit: Maximum number of records

POST /api/babies/<id>/vitals
- Record new vital signs
- Required fields:
  {
    "heart_rate": "integer",
    "blood_pressure_systolic": "integer",
    "blood_pressure_diastolic": "integer",
    "temperature": "float",
    "oxygen_saturation": "integer"
  }
```

### 3. API Response Format

#### Success Response
```json
{
    "status": "success",
    "data": {
        "id": 1,
        "name": "Baby Doe",
        "birth_date": "2024-02-22T10:00:00Z",
        "weight": 2.5,
        "vital_signs": {
            "heart_rate": 120,
            "temperature": 36.8
        }
    }
}
```

#### Error Response
```json
{
    "status": "error",
    "error": {
        "code": "VALIDATION_ERROR",
        "message": "Invalid blood pressure values",
        "details": {
            "field": "blood_pressure_systolic",
            "constraint": "must be greater than diastolic"
        }
    }
}
```

### 4. API Authentication

```rust
// JWT Authentication example
#[derive(Debug, Serialize, Deserialize)]
struct Claims {
    sub: String,
    role: String,
    exp: usize,
}

// Authentication middleware
#[async_trait]
impl<'r> FromRequest<'r> for AuthenticatedUser {
    type Error = AuthError;

    async fn from_request(request: &'r Request<'_>) -> Result<Self, Self::Error> {
        let token = request.headers()
            .get_one("Authorization")
            .ok_or(AuthError::MissingToken)?;
        
        validate_token(token).await
    }
}
```

### 5. API Testing

#### Using cURL
```bash
# Get all babies
curl -X GET "http://localhost:8000/api/babies" \
     -H "Authorization: Bearer ${TOKEN}"

# Create new baby
curl -X POST "http://localhost:8000/api/babies" \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer ${TOKEN}" \
     -d '{
         "name": "New Baby",
         "birth_date": "2024-02-22T10:00:00Z",
         "weight": 2.5
     }'
```

#### Integration Tests
```rust
#[tokio::test]
async fn test_create_baby() {
    let client = test::Client::new().await;
    let response = client
        .post("/api/babies")
        .header("Authorization", "Bearer test_token")
        .json(&new_baby_payload())
        .send()
        .await;
    
    assert_eq!(response.status(), Status::Created);
    let baby: Baby = response.json().await;
    assert_eq!(baby.name, "Test Baby");
}
```

### 6. API Documentation

We use OpenAPI (formerly Swagger) for API documentation. Here's an example specification:

```yaml
openapi: 3.0.0
info:
  title: NICU API
  version: 1.0.0
paths:
  /babies:
    get:
      summary: List all babies
      parameters:
        - name: unit_id
          in: query
          schema:
            type: integer
      responses:
        '200':
          description: List of babies
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Baby'
```

### 7. Common API Patterns

#### Pagination
```rust
#[derive(Deserialize)]
struct PaginationParams {
    page: Option<i32>,
    per_page: Option<i32>,
}

#[get("/babies?<params..>")]
async fn list_babies(params: PaginationParams) -> Result<Json<PaginatedResponse<Baby>>> {
    let page = params.page.unwrap_or(1);
    let per_page = params.per_page.unwrap_or(20);
    // Implementation
}
```

#### Filtering and Sorting
```rust
#[derive(Deserialize)]
struct BabyFilter {
    unit_id: Option<i32>,
    status: Option<String>,
    sort_by: Option<String>,
    order: Option<String>,
}

// API endpoint implementation
```

## Practical Exercises: SQL and REST API

### SQL Exercise Set 1: Basic NICU Queries

#### Patient Census Report
```sql
-- Exercise: Write a query to show current patient count by unit
-- Expected output: unit_name, active_patients, total_capacity, available_beds
SELECT 
    u.name as unit_name,
    COUNT(b.id) as active_patients,
    u.total_beds as total_capacity,
    u.total_beds - COUNT(b.id) as available_beds
FROM units u
LEFT JOIN babies b ON u.id = b.unit_id
    AND b.discharge_date IS NULL
GROUP BY u.id, u.name, u.total_beds;
```

#### Vital Signs Trending
```sql
-- Exercise: Create a hourly vital signs summary
-- Practice window functions and time-based grouping
SELECT 
    baby_id,
    DATE_TRUNC('hour', timestamp) as hour,
    AVG(heart_rate) OVER w as avg_hr,
    AVG(temperature) OVER w as avg_temp
FROM vitals
WINDOW w AS (
    PARTITION BY baby_id 
    ORDER BY timestamp 
    RANGE BETWEEN 
        INTERVAL '1 hour' PRECEDING 
        AND CURRENT ROW
)
ORDER BY baby_id, hour;
```

### SQL Exercise Set 2: Advanced Analytics

#### Critical Event Detection
```sql
-- Exercise: Identify patterns of deteriorating vital signs
WITH vital_changes AS (
    SELECT 
        baby_id,
        timestamp,
        heart_rate,
        LAG(heart_rate, 3) OVER (
            PARTITION BY baby_id 
            ORDER BY timestamp
        ) as prev_hr,
        temperature,
        oxygen_saturation
    FROM vitals
)
SELECT * FROM vital_changes
WHERE 
    heart_rate < prev_hr * 0.85 -- 15% drop
    OR oxygen_saturation < 90
ORDER BY timestamp DESC;
```

#### Resource Utilization Analysis
```sql
-- Exercise: Track equipment usage patterns
SELECT 
    equipment_type,
    COUNT(*) as total_uses,
    AVG(EXTRACT(EPOCH FROM (end_time - start_time))/3600) as avg_hours_per_use,
    COUNT(DISTINCT baby_id) as unique_patients
FROM equipment_logs
WHERE start_time >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY equipment_type
HAVING COUNT(*) > 10
ORDER BY total_uses DESC;
```

### REST API Exercise Set 1: Basic Operations

#### Implement Patient Search
```rust
// Exercise: Create a flexible search endpoint

#[derive(Deserialize)]
struct SearchParams {
    name: Option<String>,
    min_age_days: Option<i32>,
    max_age_days: Option<i32>,
    unit_id: Option<i32>,
}

#[get("/babies/search?<params..>")]
async fn search_babies(params: SearchParams) -> Result<Json<Vec<Baby>>, Error> {
    // TODO: Implement search logic using query parameters
    // Hint: Use diesel's filter and or_ combinators
}
```

#### Batch Operations
```rust
// Exercise: Implement bulk vital signs recording

#[derive(Deserialize)]
struct BatchVitalSigns {
    baby_id: i32,
    readings: Vec<VitalSignReading>,
}

#[post("/vitals/batch")]
async fn record_batch_vitals(
    batch: Json<Vec<BatchVitalSigns>>
) -> Result<Json<BatchResponse>, Error> {
    // TODO: Implement batch processing
    // Hint: Use transactions for atomicity
}
```

### REST API Exercise Set 2: Advanced Features

#### Real-time Monitoring
```rust
// Exercise: Implement SSE (Server-Sent Events) endpoint

#[get("/babies/<id>/monitor")]
async fn monitor_baby(id: i32) -> Result<EventStream![], Error> {
    // TODO: Create event stream for real-time vital signs
    // Hint: Use channels and stream combinators
}
```

#### Report Generation
```rust
// Exercise: Create PDF report endpoint

#[derive(Deserialize)]
struct ReportParams {
    start_date: NaiveDateTime,
    end_date: NaiveDateTime,
    metrics: Vec<String>,
}

#[get("/babies/<id>/report?<params..>")]
async fn generate_report(
    id: i32,
    params: ReportParams
) -> Result<(ContentType, Vec<u8>), Error> {
    // TODO: Generate PDF report
    // Hint: Use a PDF generation library
}
```

### Practice Scenarios

#### Scenario 1: Patient Admission Flow
Implement complete admission workflow:

1. **Database Schema**
```sql
-- Create admission related tables
CREATE TABLE admissions (
    id SERIAL PRIMARY KEY,
    baby_id INTEGER REFERENCES babies(id),
    admission_time TIMESTAMP NOT NULL,
    admitting_doctor VARCHAR(100),
    presenting_condition TEXT,
    initial_assessment JSONB
);

CREATE TABLE admission_vitals (
    admission_id INTEGER REFERENCES admissions(id),
    vital_type VARCHAR(50),
    value DECIMAL,
    recorded_at TIMESTAMP,
    PRIMARY KEY (admission_id, vital_type, recorded_at)
);
```

2. **REST Endpoints**
```rust
// Implement these endpoints:

// 1. Start admission process
#[post("/admissions")]
async fn start_admission(admission: Json<NewAdmission>) -> Result<Json<Admission>, Error>

// 2. Record initial assessment
#[put("/admissions/<id>/assessment")]
async fn record_assessment(id: i32, assessment: Json<Assessment>) -> Result<Json<Admission>, Error>

// 3. Complete admission
#[post("/admissions/<id>/complete")]
async fn complete_admission(id: i32) -> Result<Json<CompletedAdmission>, Error>
```

#### Scenario 2: Shift Change Protocol
Implement nursing shift change workflow:

1. **Database Queries**
```sql
-- Create shift handover view
CREATE VIEW shift_handover AS
SELECT 
    b.id as baby_id,
    b.name,
    b.current_weight,
    latest_vitals.heart_rate,
    latest_vitals.temperature,
    latest_meds.medication,
    latest_meds.last_given,
    CASE 
        WHEN v.heart_rate NOT BETWEEN 100 AND 160 THEN 'HR Alert'
        WHEN v.temperature NOT BETWEEN 36.5 AND 37.5 THEN 'Temp Alert'
        ELSE 'Stable'
    END as status
FROM babies b
LEFT JOIN LATERAL (
    SELECT heart_rate, temperature 
    FROM vitals 
    WHERE baby_id = b.id 
    ORDER BY timestamp DESC 
    LIMIT 1
) latest_vitals ON true
LEFT JOIN LATERAL (
    SELECT medication, administered_at as last_given
    FROM medications
    WHERE baby_id = b.id
    ORDER BY administered_at DESC
    LIMIT 1
) latest_meds ON true;
```

2. **API Implementation**
```rust
// Implement shift change API:

#[derive(Serialize)]
struct ShiftReport {
    babies: Vec<BabyStatus>,
    pending_tasks: Vec<Task>,
    critical_events: Vec<Event>,
    medication_schedule: Vec<MedicationDue>
}

#[get("/shift-report")]
async fn generate_shift_report(
    unit_id: i32,
    shift: ShiftType
) -> Result<Json<ShiftReport>, Error>
```

### Advanced Integration Exercises

#### Implement Alert System
```rust
// Create a system that:
// 1. Monitors vital signs in real-time
// 2. Generates alerts based on thresholds
// 3. Notifies relevant staff
// 4. Logs all events

// Example implementation structure:
struct AlertMonitor {
    vital_rx: mpsc::Receiver<VitalSign>,
    alert_tx: mpsc::Sender<Alert>,
    notification_client: Box<dyn NotificationService>,
    thresholds: HashMap<VitalType, Range<f64>>,
}

impl AlertMonitor {
    async fn run(&mut self) {
        while let Some(vital) = self.vital_rx.recv().await {
            if let Some(alert) = self.check_thresholds(&vital) {
                self.handle_alert(alert).await?;
            }
        }
    }
}
```

#### Implement Analytics Dashboard
```rust
// Create endpoints for:
// 1. Unit occupancy trends
// 2. Patient outcome statistics
// 3. Resource utilization metrics
// 4. Staff performance indicators

#[get("/analytics/dashboard")]
async fn get_dashboard_data(
    start_date: NaiveDateTime,
    end_date: NaiveDateTime,
    metrics: Vec<MetricType>
) -> Result<Json<DashboardData>, Error>
```

Remember to:
- Always validate input data
- Use appropriate error handling
- Implement proper logging
- Add comprehensive tests
- Document your APIs
- Consider performance implications

These exercises progress from basic to advanced concepts, helping you build practical experience with both SQL and REST APIs in a medical context.

### Learning Path: From Basics to Production

#### Week 1-2: SQL Fundamentals
1. **Day 1-3: Basic Queries**
   Practice exercises:
   ```sql
   -- Exercise 1: Basic SELECT
   -- Get all babies born in the last 24 hours
   SELECT * FROM babies 
   WHERE birth_date >= CURRENT_TIMESTAMP - INTERVAL '24 hours';
   
   -- Exercise 2: Filtering
   -- Find babies with abnormal vital signs
   SELECT b.name, v.heart_rate, v.temperature 
   FROM babies b
   JOIN vitals v ON b.id = v.baby_id
   WHERE v.heart_rate > 160 OR v.heart_rate < 100
   ORDER BY v.timestamp DESC;
   ```

2. **Day 4-7: Joins and Relationships**
   ```sql
   -- Exercise 3: Multiple table joins
   -- Get complete patient status
   SELECT 
       b.name,
       n.name as nurse,
       v.heart_rate,
       m.medication_name,
       f.feeding_type
   FROM babies b
   JOIN nurse_assignments na ON b.id = na.baby_id
   JOIN nurses n ON na.nurse_id = n.id
   LEFT JOIN vitals v ON b.id = v.baby_id
   LEFT JOIN medications m ON b.id = m.baby_id
   LEFT JOIN feedings f ON b.id = f.baby_id
   WHERE b.discharge_date IS NULL;
   ```

3. **Day 8-14: Advanced Queries**
   ```sql
   -- Exercise 4: Window functions
   -- Calculate trending vital signs
   SELECT 
       baby_id,
       timestamp,
       heart_rate,
       AVG(heart_rate) OVER (
           PARTITION BY baby_id 
           ORDER BY timestamp 
           ROWS BETWEEN 5 PRECEDING AND CURRENT ROW
       ) as trending_hr
   FROM vitals;
   ```

#### Week 3-4: REST API Development
1. **Day 1-3: Basic CRUD**
   ```rust
   // Exercise 1: Implement basic CRUD for babies
   
   // Create
   #[post("/babies")]
   async fn create_baby(
       new_baby: Json<NewBaby>,
       db: &State<DbPool>
   ) -> Result<Json<Baby>, Error>;
   
   // Read
   #[get("/babies/<id>")]
   async fn get_baby(
       id: i32,
       db: &State<DbPool>
   ) -> Result<Json<Baby>, Error>;
   ```

2. **Day 4-7: Advanced Endpoints**
   ```rust
   // Exercise 2: Implement complex operations
   
   // Batch update vital signs
   #[post("/vitals/batch")]
   async fn batch_update_vitals(
       vitals: Json<Vec<VitalSignUpdate>>,
       db: &State<DbPool>
   ) -> Result<Json<BatchUpdateResponse>, Error>;
   
   // Statistical endpoints
   #[get("/babies/<id>/stats")]
   async fn get_baby_statistics(
       id: i32,
       timeframe: TimeFrame,
       db: &State<DbPool>
   ) -> Result<Json<BabyStats>, Error>;
   ```

#### Week 5-6: Integration and Real-time Features

1. **Real-time Monitoring System**
   ```rust
   // Exercise: Implement WebSocket endpoint
   
   #[get("/ws/monitor/<baby_id>")]
   async fn baby_monitor_ws(
       baby_id: i32,
       ws: WebSocket,
       db: &State<DbPool>
   ) -> Result<(), Error> {
       let (tx, rx) = mpsc::channel(100);
       
       // Monitor vital signs
       tokio::spawn(async move {
           monitor_vitals(baby_id, tx).await
       });
       
       // Send updates to client
       while let Some(update) = rx.recv().await {
           ws.send(Json(update)).await?;
       }
       
       Ok(())
   }
   ```

2. **Alert System Integration**
   ```rust
   // Exercise: Implement alert system
   
   #[derive(Debug)]
   struct AlertConfig {
       heart_rate_range: Range<i32>,
       temperature_range: Range<f32>,
       oxygen_threshold: i32,
   }
   
   async fn monitor_alerts(
       baby_id: i32,
       config: AlertConfig,
       notification_service: Arc<dyn NotificationService>
   ) {
       let mut vital_stream = VitalSignStream::new(baby_id);
       
       while let Some(vital) = vital_stream.next().await {
           if let Some(alert) = check_alert_conditions(&vital, &config) {
               notification_service.send_alert(alert).await?;
           }
       }
   }
   ```

### Final Project: Complete NICU Monitoring System

Combine all learned concepts into a complete system:

1. **Database Design**
   ```sql
   -- Core tables with optimized indexes
   CREATE TABLE babies (
       id SERIAL PRIMARY KEY,
       name VARCHAR(100) NOT NULL,
       birth_date TIMESTAMP NOT NULL,
       weight_grams INTEGER NOT NULL,
       gestation_weeks INTEGER NOT NULL,
       unit_id INTEGER REFERENCES units(id),
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   
   CREATE INDEX idx_babies_unit ON babies(unit_id) WHERE discharge_date IS NULL;
   CREATE INDEX idx_babies_status ON babies(status, unit_id);
   ```

2. **API Structure**
   ```rust
   // Modular API design
   mod api {
       mod babies;
       mod vitals;
       mod alerts;
       mod reports;
       mod analytics;
       
       pub use self::babies::*;
       pub use self::vitals::*;
       // ...
   }
   
   // Middleware stack
   #[launch]
   fn rocket() -> _ {
       rocket::build()
           .attach(DbConn::fairing())
           .attach(AuthenticationFairing)
           .attach(RateLimitingFairing)
           .mount("/api/v1", routes![
               // Mount all routes
               babies::routes(),
               vitals::routes(),
               // ...
           ])
   }
   ```

3. **Real-time Monitoring**
   ```rust
   // WebSocket handler for real-time updates
   struct MonitoringSession {
       baby_id: i32,
       vital_rx: mpsc::Receiver<VitalSign>,
       alert_tx: mpsc::Sender<Alert>,
       ws_sink: WebSocketSink,
   }
   
   impl MonitoringSession {
       async fn run(&mut self) {
           while let Some(vital) = self.vital_rx.recv().await {
               // Process vital sign
               if let Some(alert) = self.check_thresholds(&vital) {
                   self.alert_tx.send(alert).await?;
               }
               
               // Send to WebSocket client
               self.ws_sink.send(Json(vital)).await?;
           }
       }
   }
   ```

4. **Analytics Engine**
   ```rust
   // Implement analytics processing
   struct AnalyticsEngine {
       db: DbPool,
       cache: Arc<Cache>,
   }
   
   impl AnalyticsEngine {
       async fn generate_unit_report(&self, unit_id: i32) -> Result<UnitReport> {
           // Complex query example
           let stats = sqlx::query_as!(
               UnitStats,
               r#"
               WITH daily_stats AS (
                   SELECT 
                       DATE(timestamp) as date,
                       COUNT(DISTINCT baby_id) as patient_count,
                       AVG(occupancy_rate) as avg_occupancy
                   FROM unit_metrics
                   WHERE unit_id = $1
                   GROUP BY DATE(timestamp)
               )
               SELECT 
                   MAX(patient_count) as peak_occupancy,
                   AVG(avg_occupancy) as average_occupancy,
                   PERCENTILE_CONT(0.95) 
                   WITHIN GROUP (ORDER BY patient_count) as p95_occupancy
               FROM daily_stats
               "#,
               unit_id
           )
           .fetch_one(&self.db)
           .await?;
           
           Ok(UnitReport::new(stats))
       }
   }
   ```

This learning path takes you from basic SQL queries to a complete, production-ready NICU monitoring system with real-time capabilities, analytics, and alerts. Each step builds upon the previous knowledge, introducing new concepts gradually while maintaining focus on practical, real-world applications.

Remember to:
- Test each component thoroughly
- Document your APIs
- Handle edge cases
- Implement proper error handling
- Consider scalability
- Monitor performance
- Implement security best practices

The final project brings together all aspects of both SQL and REST API development in a coherent, production-ready system.
