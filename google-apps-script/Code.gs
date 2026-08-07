/**
 * Rituel Luxury — Waitlist → Google Sheets webhook.
 * Deploy this as a Web App (Execute as: Me, Access: Anyone) inside the
 * Google Sheet that should collect leads. See ../google-apps-script/README.md.
 */

var SHARED_SECRET = "REPLACE_WITH_A_LONG_RANDOM_STRING"; // must match GOOGLE_SHEETS_SECRET in Vercel

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Waitlist") ||
    SpreadsheetApp.getActiveSpreadsheet().insertSheet("Waitlist");

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Timestamp", "First Name", "Email", "Phone", "Hair Concern", "Source"]);
  }

  var data = JSON.parse(e.postData.contents);

  if (SHARED_SECRET && data.secret !== SHARED_SECRET) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: "Unauthorized" }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  sheet.appendRow([
    data.createdAt || new Date().toISOString(),
    data.firstName || "",
    data.email || "",
    data.phone || "",
    data.hairGoal || "",
    data.source || "",
  ]);

  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
