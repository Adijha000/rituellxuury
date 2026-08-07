# Google Sheets waitlist — setup (5 minutes)

This lets every waitlist submission land directly in a Google Sheet you own, with
no Google API credentials or service account needed.

1. Go to [sheets.google.com](https://sheets.google.com) (signed in as `rituelluxury@gmail.com`) and create a new blank sheet named **"Rituel Luxury — Waitlist"**.
2. In the sheet, go to **Extensions → Apps Script**.
3. Delete the placeholder code and paste in the contents of [`Code.gs`](./Code.gs) from this folder.
4. In `Code.gs`, replace `REPLACE_WITH_A_LONG_RANDOM_STRING` with a random secret (e.g. generate one at [1password.com/password-generator](https://1password.com/password-generator) or run `openssl rand -hex 24` in a terminal). Keep this value handy.
5. Click **Deploy → New deployment**.
   - Type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
6. Click **Deploy**, authorize the script with your Google account, and copy the **Web app URL** it gives you (ends in `/exec`).
7. In your Vercel project (or `.env.local` for local dev), set:
   - `GOOGLE_SHEETS_WEBAPP_URL` = the Web app URL from step 6
   - `GOOGLE_SHEETS_SECRET` = the same random string from step 4
8. Redeploy the site. Every waitlist submission now appends a row to the **Waitlist** tab: Timestamp, First Name, Email, Phone, Hair Concern, Source.

If you ever edit `Code.gs` again, you must create a **new deployment version** (Deploy → Manage deployments → Edit → New version) for changes to take effect.
