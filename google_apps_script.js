/**
 * Google Apps Script for "Smart Productivity" Career Sync v4
 * Primary Database: Google Sheets
 */

const MASTER_SHEET_NAME = "MASTER_JOBS";

function onOpen() {
    SpreadsheetApp.getUi()
        .createMenu('Smart Productivity')
        .addItem('Setup Database', 'setupDatabase')
        .addToUi();
}

/**
 * Initializes or repairs the Master sheet.
 */
function setupDatabase() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let master = ss.getSheetByName(MASTER_SHEET_NAME);
    if (!master) {
        master = ss.insertSheet(MASTER_SHEET_NAME);
    }

    // Hard-set columns to match frontend expectations exactly
    const headers = ["id", "title", "category", "description", "fields", "createdat", "active", "sheetName"];
    master.getRange(1, 1, 1, headers.length).setValues([headers]);
    master.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#f3f3f3");
    master.setFrozenRows(1);

    return master;
}

/**
 * GET Handler: Fetch Job Listings
 */
function doGet(e) {
    const action = e.parameter.action;
    try {
        if (action === "getJobs") {
            return createResponse(fetchJobsList());
        }
        return createResponse({ error: "Invalid action: " + action });
    } catch (err) {
        return createResponse({ error: err.toString() });
    }
}

/**
 * POST Handler: Create/Delete/Submit
 */
function doPost(e) {
    try {
        const contents = JSON.parse(e.postData.contents);
        const action = contents.action;

        if (action === "createJob") return createResponse(handleCreateJob(contents));
        if (action === "submitApplication") return createResponse(handleSubmitApplication(contents));
        if (action === "deleteJob") return createResponse(handleDeleteJob(contents));

        return createResponse({ error: "Action not recognized" });
    } catch (err) {
        return createResponse({ error: "Execution failed: " + err.toString() });
    }
}

function fetchJobsList() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const master = ss.getSheetByName(MASTER_SHEET_NAME);
    if (!master) return [];

    const lastRow = master.getLastRow();
    if (lastRow <= 1) return [];

    const data = master.getRange(2, 1, lastRow - 1, 8).getValues();
    return data.map(row => ({
        id: row[0],
        title: row[1],
        category: row[2],
        description: row[3],
        fields: row[4] ? JSON.parse(row[4]) : [],
        createdat: row[5],
        active: row[6],
        sheetName: row[7]
    }));
}

function handleCreateJob(data) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const master = setupDatabase();

    const id = "job_" + Math.random().toString(36).substr(2, 6);

    // Create Job-specific tab for applicants
    const sheetNameBase = data.title || id;
    let finalSheetName = sheetNameBase;
    let suffix = 1;
    while (ss.getSheetByName(finalSheetName)) {
        finalSheetName = sheetNameBase + " (" + suffix + ")";
        suffix++;
    }

    const row = [
        id,
        data.title || "Untitled Position",
        data.category || "General",
        data.description || "",
        JSON.stringify(data.fields || []),
        new Date().toISOString(),
        true,
        finalSheetName
    ];

    // Append to metadata sheet
    master.appendRow(row);

    const jobSheet = ss.insertSheet(finalSheetName);
    const applicantHeaders = ["Source", "Timestamp", ... (data.fields || []).map(f => f.label)];
    jobSheet.getRange(1, 1, 1, applicantHeaders.length)
        .setValues([applicantHeaders])
        .setFontWeight("bold")
        .setBackground("#000000")
        .setFontColor("#ffffff");
    jobSheet.setFrozenRows(1);

    return { status: "success", id: id };
}

function handleSubmitApplication(data) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    // Find sheetName from MASTER_JOBS using jobId
    const master = ss.getSheetByName(MASTER_SHEET_NAME);
    let targetSheetName = data.jobTitle; // fallback

    if (master && data.jobId) {
        const rows = master.getDataRange().getValues();
        for (let i = 1; i < rows.length; i++) {
            if (rows[i][0] === data.jobId) {
                targetSheetName = rows[i][7] || rows[i][1];
                break;
            }
        }
    }

    const jobSheet = ss.getSheetByName(targetSheetName);
    if (!jobSheet) return { error: "Job tab not found: " + targetSheetName };

    const headers = jobSheet.getRange(1, 1, 1, jobSheet.getLastColumn()).getValues()[0];
    const rowData = new Array(headers.length).fill("N/A");

    rowData[0] = data.email || "Unknown";
    rowData[1] = new Date().toLocaleString();

    const responses = data.responses || {};
    for (let i = 2; i < headers.length; i++) {
        rowData[i] = responses[headers[i]] || "N/A";
    }

    jobSheet.appendRow(rowData);
    return { status: "success" };
}

function handleDeleteJob(data) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const master = ss.getSheetByName(MASTER_SHEET_NAME);
    if (!master) return { error: "Database offline" };

    const rows = master.getDataRange().getValues();
    for (let i = 1; i < rows.length; i++) {
        if (rows[i][0] === data.id) {
            master.deleteRow(i + 1);
            return { status: "success" };
        }
    }
    return { error: "Job ID not found" };
}

function createResponse(data) {
    return ContentService.createTextOutput(JSON.stringify(data))
        .setMimeType(ContentService.MimeType.JSON);
}
