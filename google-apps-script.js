/**
 * Google Apps Script for ZooMinder Early Access Form
 *
 * SETUP INSTRUCTIONS:
 * 1. Create a new Google Sheet named "ZooMinder Early Access"
 * 2. In the sheet, create headers in row 1:
 *    A1: Timestamp
 *    B1: Email
 *    C1: Will Pay $2/month
 *    D1: Comments
 *
 * 3. Go to Extensions > Apps Script
 * 4. Delete any existing code and paste this entire script
 * 5. Click "Deploy" > "New deployment"
 * 6. Click the gear icon next to "Select type" and choose "Web app"
 * 7. Configure:
 *    - Description: "ZooMinder Early Access Form Handler"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"
 * 8. Click "Deploy"
 * 9. Copy the "Web app URL" and replace 'YOUR_GOOGLE_SCRIPT_URL_HERE' in index.html
 * 10. You may need to authorize the script (click "Authorize access")
 */

// Handle POST requests from the form
function doPost(e) {
  try {
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);

    // Prepare the row data
    const timestamp = new Date();
    const email = data.email || '';
    const willPay = data.willPay || '';
    const comments = data.comments || 'N/A';

    // Append the data to the sheet
    sheet.appendRow([
      timestamp,
      email,
      willPay,
      comments
    ]);

    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'success',
        'message': 'Data saved successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'error',
        'message': error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle GET requests (optional - for testing)
function doGet(e) {
  return ContentService
    .createTextOutput('ZooMinder Early Access Form Handler is running. Use POST to submit data.')
    .setMimeType(ContentService.MimeType.TEXT);
}

// Optional: Function to send email notifications when someone signs up
// Uncomment and modify if you want email notifications
/*
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);

    const timestamp = new Date();
    const email = data.email || '';
    const willPay = data.willPay || '';
    const comments = data.comments || 'N/A';

    // Append to sheet
    sheet.appendRow([timestamp, email, willPay, comments]);

    // Send email notification to yourself
    const yourEmail = 'inf.carlos@outlook.com'; // Replace with your email
    const subject = '🐾 New ZooMinder Early Access Request';
    const body = `
New early access request received:

Email: ${email}
Will Pay $2/month: ${willPay}
Comments: ${comments}
Timestamp: ${timestamp}

Total sign-ups: ${sheet.getLastRow() - 1}
    `;

    MailApp.sendEmail(yourEmail, subject, body);

    return ContentService
      .createTextOutput(JSON.stringify({'status': 'success'}))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({'status': 'error', 'message': error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
*/
