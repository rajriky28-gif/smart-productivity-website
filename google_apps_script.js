/**
 * Google Apps Script for "Smart Productivity" Career Sync v3
 * Primary Database: Google Sheets
 * 
 * FIX: Improved CORS handling and robustness.
 */

const MASTER_SHEET_NAME = "MASTER_JOBS";

function onOpen() {
    SpreadsheetApp.getUi()
        .createMenu('Smart Productivity')
        .addItem('Setup/Reset Database', 'setupDatabase')
        .addToUi();
}

/**
 * Ensures the master sheet exists and has headers.
 */
function setupDatabase() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let master = ss.getSheetByName(MASTER_SHEET_NAME);
    if (!master) {
        master = ss.insertSheet(MASTER_SHEET_NAME);
    }

    // Set headers if the sheet is empty
    if (master.getLastRow() === 0) {
        const headers = ["ID", "Title", "Category", "Description", "Fields", "Created At", "Active"];
        master.getRange(1, 1, 1, headers.length)
            .setValues([headers])
            .setFontWeight("bold")
            .setBackground("#f3f3f3");
        master.setFrozenRows(1);
    }
    return master;
}

/**
 * Handles GET requests (FETCHING JOBS)
 */
function doGet(e) {
    const action = e.parameter.action;
    try {
        if (action === "getJobs") {
            return createResponse(fetchJobsList());
        }
        return createResponse({ error: "Invalid protocol action: " + action });
    } catch (err) {
        return createResponse({ error: "GET fail: " + err.toString() });
    }
}

/**
 * Handles POST requests (CREATE/DELETE/SUBMIT)
 * FIX: Handles text/plain body which is sent to bypass CORS preflight.
 */
function doPost(e) {
    try {
        let contents;
        // Text/plain bodies arrive in postData.contents
        if (e.postData && e.postData.contents) {
            contents = JSON.parse(e.postData.contents);
        } else {
            return createResponse({ error: "No post data received" });
        }

        const action = contents.action;

        if (action === "createJob") return createResponse(handleCreateJob(contents));
        if (action === "submitApplication") return createResponse(handleSubmitApplication(contents));
        if (action === "deleteJob") return createResponse(handleDeleteJob(contents));

        return createResponse({ error: "Invalid POST action: " + action });
    } catch (err) {
        return createResponse({ error: "POST fail: " + err.toString() });
    }
}

function fetchJobsList() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let master = ss.getSheetByName(MASTER_SHEET_NAME);
    if (!master) return [];

    const lastRow = master.getLastRow();
    if (lastRow <= 1) return [];

    const values = master.getRange(1, 1, lastRow, master.getLastColumn()).getValues();
    const headers = values[0];
    const jobs = [];

    for (let i = 1; i < values.length; i++) {
        const job = {};
        headers.forEach((header, index) => {
            let val = values[i][index];
            if (header === "Fields" && val) {
                try { val = JSON.parse(val); } catch (e) { val = []; }
            }
            // Normalize header to key (e.g., "Created At" -> "createdat")
            job[header.toLowerCase().replace(/\s/g, "")] = val;
        });
        jobs.push(job);
    }
    return jobs;
}

function handleCreateJob(data) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const master = setupDatabase();

    const id = "protocol_" + Math.random().toString(36).substr(2, 9);
    const row = [
        id,
        data.title,
        data.category,
        data.description,
        JSON.stringify(data.fields),
        new Date().toISOString(),
        true
    ];

    // Add to Master
    master.appendRow(row);

    // Create unique tab for applicants
    let sheetName = data.title;
    let originalName = sheetName;
    let suffix = 1;
    while (ss.getSheetByName(sheetName)) {
        sheetName = originalName + " (" + suffix + ")";
        suffix++;
    }

    const jobSheet = ss.insertSheet(sheetName);
    const headers = ["Applicant Identity", "Submission Date", ...data.fields.map(f => f.label)];
    jobSheet.getRange(1, 1, 1, headers.length)
        .setValues([headers])
        .setFontWeight("bold")
        .setBackground("#000000")
        .setFontColor("#ffffff");
    jobSheet.setFrozenRows(1);

    return { status: "success", id: id, sheetName: sheetName };
}

function handleSubmitApplication(data) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const jobSheet = ss.getSheetByName(data.jobTitle);
    if (!jobSheet) return { error: "Target protocol tab [" + data.jobTitle + "] not found" };

    const headers = jobSheet.getRange(1, 1, 1, jobSheet.getLastColumn()).getValues()[0];
    const responses = data.responses;
    const rowData = new Array(headers.length).fill("");

    rowData[0] = data.email;
    rowData[1] = data.submittedAt;

    for (let i = 2; i < headers.length; i++) {
        rowData[i] = responses[headers[i]] || "N/A";
    }

    jobSheet.appendRow(rowData);
    return { status: "success" };
}

function handleDeleteJob(data) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const master = ss.getSheetByName(MASTER_SHEET_NAME);
    if (!master) return { error: "Central database not found" };

    const values = master.getDataRange().getValues();
    for (let i = 1; i < values.length; i++) {
        if (values[i][0] === data.id) {
            master.deleteRow(i + 1);
            return { status: "success" };
        }
    }
    return { error: "Protocol ID not found" };
}

function createResponse(data) {
    return ContentService.createTextOutput(JSON.stringify(data))
        .setMimeType(ContentService.MimeType.JSON);
}
