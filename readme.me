# Finance Tracker

Finance Tracker is a two-part application for importing bank transactions, reviewing them in a web UI, and assigning categories to transaction keywords.

## Project Structure

- `finance-tracker-api/` - Spring Boot backend with PostgreSQL persistence.
- `finance-tracker-ui/` - React + Vite frontend for browsing transactions and uploading CSV files.

## Features

- Upload transaction CSV files into the backend.
- View transactions in a filterable table.
- Filter transactions by date range and category.
- Reclassify transactions and update keyword-to-category mappings.
- Browse available categories from the API.

## Tech Stack

- Backend: Java 21, Spring Boot, Spring Data JPA, Spring Security, PostgreSQL, Apache Commons CSV.
- Frontend: React 19, TypeScript, Vite, React Router, Axios, React Select.

## Prerequisites

- Java 21
- Maven
- Node.js 20+ recommended
- PostgreSQL running locally

## Backend Setup

The backend is configured in `finance-tracker-api/src/main/resources/application.properties`.

It expects a local PostgreSQL database named `finance_tracker`. Update the datasource settings there if your local database uses different credentials or a different host.

## Database Schema

The application uses PostgreSQL with the following tables:

- **Users**: Stores user account information.
- **Transactions**: Stores imported bank transactions linked to users.
- **Keywords**: Stores keyword rules used for transaction categorisation.
- **Categories**: Stores available transaction categories.

Relationships:
- A user has many transactions.
- A keyword maps to a category.
- Transactions are assigned categories based on matching keywords.

The API runs on `http://localhost:8080`.

## Frontend Setup

The UI runs on the Vite development server, usually `http://localhost:5173`.

## API Endpoints

### Transactions

- `GET /transactions/records` - Returns transaction records.
	- Optional query parameters: `startDate`, `endDate`, `categoryId`.
- `POST /transactions/upload` - Upload a CSV file with form field `file`.
- `PATCH /transactions/reclassify` - Re-runs transaction reclassification.

### Categories

- `GET /categories/all` - Returns all categories.

### Keywords

- `POST /keywords/add` - Creates or updates a keyword-to-category mapping.

## Frontend Routes

- `/transactions` - Transaction list and filters.
- `/upload` - CSV upload page.
- `/` - Redirects to `/transactions`.

## Notes

- The frontend talks directly to the backend at `http://localhost:8080`.
- If you change the backend port or host, update the API URLs in `finance-tracker-ui/src/api/`.
- Security auto-configuration is excluded in the backend config, so the API runs without Spring Security login flow by default.

## Typical Workflow

1. Start PostgreSQL.
2. Start the backend.
3. Start the frontend.
4. Open the UI, upload a CSV, then review and categorize transactions.


## Current Features

- Upload bank transaction CSV files
- Parse and store transactions
- Display transactions in a web interface
- Categorise transactions using keyword mappings
- Filter transactions by category
- Manage categories and keywords
- Add dashboard with category breakdowns and spending visualisations
- Add transaction filtering by month and uncategorised transactions
- Handle duplicate transaction detection

## Roadmap
### Planned Features
- [ ] Add multi-user functionality
- [ ] Add note editing features for transactions and database
- [ ] Deploy frontend to Vercel and backend to AWS

### Engineering Improvements
- [ ] Add unit and integration testing
- [ ] Implement global exception handling
- [ ] Add structured logging
- [ ] Improve transaction retrieval performance with pagination and query optimisation
- [ ] Add frontend loading and error states

## Screenshots

The following screenshots map to key UI states and actions:

### Latest Screens (7.8.2026)

### 1. Transactions Page

![Transactions Page](screenshots/7.8.2026/Transactions%20Page.png)

### 2. New Transactions Only

![New Transactions Only](screenshots/7.8.2026/New%20Transactions%20Only.png)

### 3. Grouped Transactions

![Grouped Transactions](screenshots/7.8.2026/Grouped%20Transactions.png)

### 4. Keyword Filtering

![Keyword Filtering](screenshots/7.8.2026/Keyword%20Filtering.png)

### 5. Dashboard Summary

![Dashboard Summary](screenshots/7.8.2026/Dashboard%20Summary.png)

### 6. Dashboard Month Filter

![Dashboard Month Filter](screenshots/7.8.2026/Dashboard%20Month%20Filter.png)

### 7. CSV Upload

![CSV Upload](screenshots/7.8.2026/CSV%20Upload.png)

### Previous Screens (22.7.2026)



