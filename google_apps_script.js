/**
 * Google Apps Script for "Smart Productivity" Career Sync
 * Description: Dynamically adds application data to the sheet. 
 * Creates new columns if the job has new fields.
 */

function doPost(e) {
    try {
        var data = JSON.parse(e.postData.contents);
        var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

        // Get existing headers
        var lastCol = sheet.getLastColumn();
        var headers = lastCol > 0 ? sheet.getRange(1, 1, 1, lastCol).getValues()[0] : [];

        // Default headers if empty
        if (headers.length === 0) {
            headers = ["Job Title", "Submitted At"];
            sheet.getRange(1, 1, 1, 2).setValues([headers]).setFontWeight("bold");
        }

        // Map responses to headers
        var rowData = new Array(headers.length).fill("");
        var responses = data.responses;

        // Set fixed values
        rowData[headers.indexOf("Job Title")] = data.jobTitle;
        rowData[headers.indexOf("Submitted At")] = data.submittedAt;

        // Map dynamic fields
        for (var key in responses) {
            var headerIndex = headers.indexOf(key);

            // If header doesn't exist, Create it
            if (headerIndex === -1) {
                sheet.insertColumnAfter(sheet.getLastColumn());
                sheet.getRange(1, sheet.getLastColumn() + 1).setValue(key).setFontWeight("bold");
                headers.push(key);
                rowData.push(responses[key]);
            } else {
                rowData[headerIndex] = responses[key];
            }
        }

        // Append the row
        sheet.appendRow(rowData);

        return ContentService.createTextOutput(JSON.stringify({ "status": "success" }))
            .setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        return ContentService.createTextOutput(JSON.stringify({ "status": "error", "message": error.toString() }))
            .setMimeType(ContentService.MimeType.JSON);
    }
}
