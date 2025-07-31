# Playwright Quote Management Tests

This project contains automated tests for the DenoWatts Quote Management system using Playwright.

## Environment Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy the example environment file and update it with your credentials:

```bash
cp .env.example .env
```

Then edit `.env` with your actual credentials:

```env
# Application Configuration
BASE_URL=https://dev.portal.denowatts.com
LOGIN_URL=https://dev.portal.denowatts.com/signin

# User Credentials
USER_EMAIL=your-actual-email@example.com
USER_PASSWORD=your-actual-password

# Test Configuration
HEADLESS=false
SLOW_MO=1000
```

**⚠️ Important**: You must set your actual email and password in the `.env` file for tests to work.

## Running Tests

### Run All Tests

```bash
npx playwright test
```

### Run Specific Test

```bash
npx playwright test tests/update-quote.spec.ts
```

### Run with Headed Browser (for debugging)

```bash
npx playwright test --headed
```

### Run with Slow Motion (for debugging)

```bash
npx playwright test --headed --project=chromium
```

## Test Structure

- `tests/update-quote.spec.ts` - Main test file for quote updates
- `.env` - Environment variables (not committed to git)
- `.env.example` - Example environment file
- `playwright.config.ts` - Playwright configuration

## Environment Variables

| Variable        | Description                   | Default                                   |
| --------------- | ----------------------------- | ----------------------------------------- |
| `BASE_URL`      | Base URL for the application  | `https://dev.portal.denowatts.com`        |
| `LOGIN_URL`     | Login page URL                | `https://dev.portal.denowatts.com/signin` |
| `USER_EMAIL`    | User email for login          | Required                                  |
| `USER_PASSWORD` | User password for login       | Required                                  |
| `HEADLESS`      | Run browser in headless mode  | `false`                                   |
| `SLOW_MO`       | Slow down test execution (ms) | `1000`                                    |

## Security Notes

- The `.env` file is excluded from version control
- **No hardcoded credentials in the codebase**
- Never commit actual credentials to git
- Use `.env.example` as a template for required variables
- All sensitive data must be configured via environment variables

## Troubleshooting

1. **Environment variables not loading**: Ensure `.env` file exists in project root
2. **Login failures**: Verify credentials in `.env` file
3. **Element not found**: Check if the application UI has changed
4. **Slow tests**: Adjust `SLOW_MO` value in `.env`

## Best Practices

- Keep credentials secure and never commit them
- Use environment variables for configuration
- Run tests in headed mode for debugging
- Check test reports in `playwright-report/` directory
