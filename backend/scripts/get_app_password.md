# How to get a Gmail "App password" (short)

1. Ensure 2‑Step Verification is enabled for the Google account:
   - Open: https://myaccount.google.com/security
   - Under "Signing in to Google" enable "2-Step Verification" if it is OFF.

2. Create an App password:
   - In the same Security page, find "App passwords" and click it.
   - Sign in again if prompted.
   - Under "Select app" choose "Mail".
   - Under "Select device" choose "Other (Custom name)" and enter a name (e.g. "Democratical-backend").
   - Click "Generate".
   - Copy the 16‑character app password shown (no spaces when using it).

3. Put it in backend/.env:
   - Replace GMAIL_PASS=YOUR_APP_PASSWORD_HERE with the generated password.
   - Example (.env):
     GMAIL_USER=you@example.com
     GMAIL_PASS=abcdefghijklmnop
   - Do NOT commit .env or the password to source control.

4. Notes and troubleshooting
   - For Google Workspace accounts the admin may need to allow app passwords / less‑secure access or enable 2‑Step Verification for users.
   - If "App passwords" is not visible you either don't have 2‑Step Verification enabled or account/org policies block it.
   - App passwords are single‑purpose; you can revoke them from the "App passwords" page at any time.

5. Restart backend and test:
   - cd backend
   - (optional) npm install nodemailer dotenv
   - node server.js
   - Submit the contact form and check backend logs for success.

References:
- Google support: https://support.google.com/accounts/answer/185833
