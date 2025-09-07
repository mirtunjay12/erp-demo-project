# ERP Demo Project

A demonstration project for an ERP system, including database setup, migrations, and a working Node.js backend service.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Prerequisites](#prerequisites)
- [Clone Repository](#clone-repository)
- [Database Setup](#database-setup)
- [Environment Configuration](#environment-configuration)
- [Project Setup](#project-setup)
- [Running the Project](#running-the-project)
- [Notes](#notes)

---

## Project Overview

This project demonstrates a basic ERP system with the following features:

- MySQL database integration  
- Node.js backend service (`db-service`)  
- Database migrations and default seed data  

---

## Prerequisites

Ensure the following are installed:

- Node.js (v18+)  
- MySQL Server  
- Git  
- Bash (for running migration scripts)  

---

## Clone Repository

Clone the project repository:

```bash
git clone https://github.com/mirtunjay12/erp-demo-project.git
cd erp-demo-project
```

---

## Database Setup

### 1. Create Database

Log in to MySQL and create a new database:

```sql
CREATE DATABASE my_project_db;
```

### 2. Run Migrations and Seed Data

1. Navigate to the migration directory:

```bash
cd ./db-migrate
```

2. Update the `.env` file with your environment variables. Example:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=my_project_db
```

3. Make the migration script executable:

```bash
chmod +x ./run-migration.sh
```

4. Execute the migration script:

```bash
./run-migration.sh
```

> This will create all necessary tables and insert default records.  
> Make sure MySQL is running before executing the script.

---

## Environment Configuration

1. Navigate to the backend service directory:

```bash
cd ../db-service
```

2. Update the `.env` file with your environment variables. Example:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=my_project_db
JWT_SECRET=your_secret_key
PORT=3000
```

---

## Project Setup

1. Install dependencies:

```bash
npm install
```

2. Verify the project structure and configuration.

---

## Running the Project

Start the development server:

```bash
npm run dev
```

The application should now be running locally on the configured port.

---

## Notes

- The migration script should only be run once during initial setup.  
- For database changes, update the migration files accordingly.  
- Ensure environment variables are properly configured before starting the project.  
- Recommended workflow: Pull updates → Run migrations → Start server.

---

## Repository Structure

```
erp-demo-project/
│
├─ db-migrate/           # Database migration scripts and seed files
│   ├─ run-migration.sh  # Bash script to run all migrations
│   └─ database.json     # Database configuration file
│
├─ db-service/           # Node.js backend service
│
└─ README.md             # Project documentation

```

---
