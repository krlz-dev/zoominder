# ZooMinder Early Access Form Setup Guide

## Step-by-Step Instructions

### 1. Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "ZooMinder Early Access" or any name you prefer
4. In the first row, add these headers:
   - **A1**: `Timestamp`
   - **B1**: `Email`
   - **C1**: `Will Pay $2/month`
   - **D1**: `Comments`

### 2. Add the Apps Script

1. In your Google Sheet, go to **Extensions** → **Apps Script**
2. Delete any existing code in the editor
3. Copy the entire code from `google-apps-script.js` file
4. Paste it into the Apps Script editor
5. Click the **Save** icon (💾) or press `Ctrl+S` / `Cmd+S`
6. Name your project: "ZooMinder Form Handler"

### 3. Deploy the Web App

1. Click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **Web app**
4. Configure the deployment:
   - **Description**: `ZooMinder Early Access Form Handler`
   - **Execute as**: `Me (your-email@gmail.com)`
   - **Who has access**: `Anyone`
5. Click **Deploy**

### 4. Authorize the Script

1. You'll see a warning that Google hasn't verified this app
2. Click **Review Permissions**
3. Choose your Google account
4. Click **Advanced**
5. Click **Go to [Project Name] (unsafe)**
6. Click **Allow**

### 5. Copy the Web App URL

1. After deployment, you'll see a dialog with the **Web app URL**
2. Copy this URL (it looks like: `https://script.google.com/macros/s/AKfycby.../exec`)
3. Click **Done**

### 6. Update Your index.html

1. Open `index.html`
2. Find line 1008 where it says:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_URL_HERE';
   ```
3. Replace `'YOUR_GOOGLE_SCRIPT_URL_HERE'` with your actual URL:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby.../exec';
   ```
4. Save the file

### 7. Test the Form

1. Open your `index.html` in a web browser
2. Click "Request Early Access" button
3. Fill out the form with test data
4. Click "Submit Request"
5. Check your Google Sheet - a new row should appear with the data!

## Optional: Email Notifications

If you want to receive an email every time someone submits the form:

1. In the Apps Script editor, scroll to the bottom
2. Uncomment the second `doPost` function (remove `/*` and `*/`)
3. Comment out or delete the first `doPost` function
4. Replace `'inf.carlos@outlook.com'` with your actual email
5. Save and redeploy:
   - Click **Deploy** → **Manage deployments**
   - Click the edit icon ✏️
   - Change the version to **New version**
   - Click **Deploy**

## Troubleshooting

### Form shows error message
- Make sure the Google Apps Script URL is correct
- Check that the script is deployed with "Anyone" access
- Verify the script is authorized

### Data not appearing in sheet
- Check if the sheet headers match exactly (Timestamp, Email, Will Pay $2/month, Comments)
- Make sure you're looking at the correct sheet
- Check the Apps Script execution logs: **Executions** in the left sidebar

### CORS errors in browser console
- This is normal when using `mode: 'no-cors'`
- The form will still work, the data will be saved
- The success message appears based on the assumption that if no error is thrown, it worked

## Data Structure

Each form submission creates a new row with:
- **Timestamp**: Automatic date/time of submission
- **Email**: User's email address (required)
- **Will Pay $2/month**: "Yes" or "No" (required)
- **Comments**: User's optional feedback (shows "N/A" if empty)

## Managing Your Beta Testers

### Export Data
- **File** → **Download** → **CSV** or **Excel**

### Filter Responses
- Use Google Sheets filters to sort by "Yes" for willing to pay users
- Create a filter view to see only specific responses

### Send Invites
- Copy emails from the sheet
- Use mail merge or send individual invites to beta testers

## Security Notes

- The form uses `mode: 'no-cors'` which is safe for this use case
- Email addresses are stored in your private Google Sheet
- Only you (the sheet owner) can access the data
- Consider adding Google reCAPTCHA if you get spam submissions
