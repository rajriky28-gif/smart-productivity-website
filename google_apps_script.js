/**
 * Google Apps Script for "Smart Productivity" Career Sync v2
 * Primary Database: Google Sheets
 * 
 * Instructions:
 * 1. Open your Google Sheet.
 * 2. Extensions > Apps Script.
 * 3. Paste this code.
 * 4. Deploy > New Deployment > Web App.
 * 5. Set 'Execute as: Me' and 'Who has access: Anyone'.
 * 6. Copy the Web App URL for your website.
 */

const MASTER_SHEET_NAME = "MASTER_JOBS";

function onOpen() {
    SpreadsheetApp.getUi()
        .createMenu('Smart Productivity')
        .addItem('Prepare Database', 'setupDatabase')
        .addToUi();
}

function setupDatabase() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let master = ss.getSheetByName(MASTER_SHEET_NAME);
    if (!master) {
        master = ss.insertSheet(MASTER_SHEET_NAME);
        const headers = ["ID", "Title", "Category", "Description", "Fields", "Created At", "Active"];
        master.getRange(1, 1, 1, headers.length)
            .setValues([headers])
            .setFontWeight("bold")
            .setBackground("#f3f3f3");
        master.setFrozenRows(1);
    }
    return master;
}

function doGet(e) {
    const action = e.parameter.action;
    if (action === "getJobs") return createResponse(fetchJobsList());
    return createResponse({ error: "Invalid GET action" });
}

function doPost(e) {
    try {
        const data = JSON.parse(e.postData.contents);
        const action = data.action;

        if (action === "createJob") return createResponse(handleCreateJob(data));
        if (action === "submitApplication") return createResponse(handleSubmitApplication(data));
        if (action === "deleteJob") return createResponse(handleDeleteJob(data));

        return createResponse({ error: "Invalid POST action" });
    } catch (err) {
        return createResponse({ error: err.toString() });
    }
}

function fetchJobsList() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let master = ss.getSheetByName(MASTER_SHEET_NAME);
    if (!master) return [];

    const values = master.getDataRange().getValues();
    if (values.length <= 1) return [];

    const headers = values[0];
    const jobs = [];

    for (let i = 1; i < values.length; i++) {
        const job = {};
        headers.forEach((header, index) => {
            let val = values[i][index];
            if (header === "Fields") {
                try { val = JSON.parse(val); } catch (e) { val = []; }
            }
            job[header.toLowerCase().replace(" ", "")] = val;
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

    master.insertRowAfter(1);
    master.getRange(2, 1, 1, row.length).setValues([row]);

    // Create unique tab for applicants
    let sheetName = data.title;
    let suffix = 1;
    while (ss.getSheetByName(sheetName)) {
        sheetName = data.title + " (" + suffix + ")";
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
    if (!jobSheet) return { error: "Target protocol tab not found" };

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
    if (!master) return { error: "Database not found" };

    const values = master.getDataRange().getValues();
    for (let i = 1; i < values.length; i++) {
        if (values[i][0] === data.id) {
            const title = values[i][1];
            master.deleteRow(i + 1);
            // Optionally delete the tab? User said "i refresh the job goes" 
            // but we might want to keep data for history. 
            // For now, let's keep the tab but remove from master.
            return { status: "success", removed: title };
        }
    }
    return { error: "Protocol not found" };
}

function createResponse(data) {
    return ContentService.createTextOutput(JSON.stringify(data))
        .setMimeType(ContentService.MimeType.JSON);
}
