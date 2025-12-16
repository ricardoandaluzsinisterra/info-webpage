# Valid requests to POST JSON to /api/contact

Run the appropriate command for your shell.

1) Windows CMD (cmd.exe)
```bash
curl -v -H "Content-Type: application/json" ^
 -d "{\"name\":\"Test CMD\",\"email\":\"test@example.com\",\"message\":\"hello from cmd\",\"countryInterest\":\"Debug\"}" ^
 http://localhost:5000/api/contact
```

2) Windows PowerShell (use PowerShell, not cmd)
```powershell
$body = @{ name='Test PS'; email='test@example.com'; message='hello from ps'; countryInterest='Debug' } | ConvertTo-Json -Compress
Invoke-RestMethod -Uri 'http://localhost:5000/api/contact' -Method Post -Body $body -ContentType 'application/json' -Verbose
```

3) WSL / Linux / macOS shell
```bash
curl -v -H "Content-Type: application/json" \
 -d '{"name":"Test","email":"test@example.com","message":"hello from curl","countryInterest":"Debug"}' \
 http://localhost:5000/api/contact
```

Notes:
- For PowerShell ensure you run in PowerShell (not cmd) so ConvertTo-Json works.
- In cmd, use ^ line-continuation or put the full curl on one line; escape JSON quotes with backslash as shown.
- After sending, check the backend server terminal for [raw-body] lines and any JSON parse errors.
