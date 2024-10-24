# Investment Tracking App

I built this web app as part of a Fullstack Developer Recruitment Task for Code & Pepper 2024.

## Features

### Tables

1. **Table 1:**
   - All fields (text and numbers) are fully editable. Users can click on any field to modify the data directly.
2. **Table 2:**
   - This table aggregates the data from the first table in real-time. As you edit values in Table 1, Table 2 is updated automatically.

### Undo/Redo

- **Undo/Redo** functionality is available to revert mistakes or redo changes. This provides a smooth experience for error recovery.

### Authorization

- Only **authorized** users can access the app

### Save Changes

- After making edits, changes can be saved to preserve the data. This ensures that all modifications are retained.

### RWD (Responsive Web Design)

- This app is fully mobile responsive

### Charts

1. **Chart 1:**
   - Displays data aggregated from **Table 2** in real-time.
2. **Chart 2:**
   - A stacked bar chart showing the user's investments (**Table 1**). This chart is also updated in real-time based on the data changes.

## Setup Instructions

Follow these steps to set up the app locally:

1. Clone the repository
2. Environment setup:

- Rename the .env.example file to .env
- Add the database URL in the DATABASE_URL field inside the .env file.

3. Install dependencies:

```bash
  npm install
```

4. Build the project:

```bash
  npm run build
```

5. Start the application:

```bash
  npm run start
```

## Usage (Online)

- Access the app at https://cp-investment-tracking.vercel.app
- Create an account:
  - You will be automatically logged in after registration. There is no need to confirm the email.
- Alternatively, use a test account if you prefer not to create a new account.
  - The test account: `test@example.com` and password: `test#investments`

## Usage (Local)

- Access the app at http://localhost:3000 once it's running.
- Create an account
- Modify the data in Table 1, and see the updates reflected in Table 2 and the charts.
- Use the Undo and Redo buttons to handle mistakes and preserve changes with the Save button.

## Tests (Local)

You need to set up Cypress to run the tests locally.

- Rename `cypress.env.json.example` to `cypress.env.json`
- Create a new user (using /sign-up form or directly in the database)
- Add test user credentials in the cypress.env.json file if you want to run tests locally.
- Run the tests:

```bash
npm run test
```
