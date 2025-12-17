# Next steps after adding GMAIL_REFRESH_TOKEN

1) Install runtime deps
```bash
cd backend
npm install nodemailer googleapis dotenv
```

2) Start backend
```bash
node server.js
# or your usual dev command (nodemon, pm2, etc.)
```

3) Quick test (from machine where backend runs)
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Test Sender",
    "email":"recipient@example.com",
    "message":"Test email from Gmail OAuth2",
    "countryInterest":"Test"
  }'
```

4) Verify
- Check backend logs for errors (auth/token errors, permission denied, invalid_grant).
- Confirm recipient inbox received the confirmation email.
- Common fixes:
  - Ensure GMAIL_USER in backend/.env matches the account you authorized.
  - If you see invalid_grant, refresh_token may be wrong/expired or consent not granted with access_type=offline & prompt=consent.
  - Confirm GMAIL_CLIENT_ID/SECRET and redirect URI are correct.

5) If sending fails, paste the exact backend error log here and I will help debug.
