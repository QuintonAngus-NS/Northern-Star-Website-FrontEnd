console.log('Script running');

const Btn = document.getElementById('Btn');
const EDIT = document.getElementById('EDIT');
const BODY = document.getElementById('bodyWrapper');
const addPeriodBtn = document.getElementById('submitBtn');
const continueBtn = document.getElementById('continueBtn');
const timeTableBtn = document.getElementById('timeTableBtn');
const periodText = document.getElementById('periodText');

let periodCount = 1;
let dayData = [];
let timeTable = [];

// --------------------
// STEP 1: SETUP DAY
// --------------------

Btn.addEventListener('click', () => {
    Btn.disabled = true;
    BODY.style.display = 'none';
    EDIT.style.display = 'flex';
});

addPeriodBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const startTime = document.getElementById('startTimeInput').value;
    const endTime = document.getElementById('endTimeInput').value;

    const period = {
        name: `P${periodCount}`,
        startTime,
        endTime
    };

    dayData.push(period);
    periodCount++;

    periodText.innerHTML = `|| Period ${periodCount} ||`;
});

// --------------------
// BUILD TIMETABLE BASED ON USER PERIOD COUNT
// --------------------

function buildTimeTable() {
    const days = 5;
    const periods = dayData.length;

    timeTable = Array.from({ length: days }, () =>
        Array.from({ length: periods }, () => ({
            class: "",
            teacher: "",
            room: ""
        }))
    );
}

// --------------------
// STEP 2: ASSIGN LESSONS
// --------------------

continueBtn.addEventListener('click', () => {
    EDIT.style.display = 'none';
    document.getElementById('ADD').style.display = 'flex';

    buildTimeTable(); // build timetable dynamically

    let dayNum = 0;        // 0 = Monday
    let periodNum = 0;     // 0 = P1

    const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const dayPeriodText = document.getElementById('day-Period-Text');

    function updateUI() {
        dayPeriodText.innerHTML = `${dayNames[dayNum]} P${periodNum + 1}`;
    }

    updateUI();

    timeTableBtn.addEventListener('click', () => {
        const classInput = document.getElementById('classInput').value;
        const teacherInput = document.getElementById('teacherInput').value;
        const roomInput = document.getElementById('roomInput').value;

        // Save into timetable
        timeTable[dayNum][periodNum] = {
            class: classInput,
            teacher: teacherInput,
            room: roomInput
        };

        // Clear inputs
        document.getElementById('classInput').value = "";
        document.getElementById('teacherInput').value = "";
        document.getElementById('roomInput').value = "";

        // Move to next period
        periodNum++;

        // If finished all periods for the day
        if (periodNum >= dayData.length) {
            periodNum = 0;
            dayNum++;
        }

        // If timetable is complete
        if (dayNum >= 5) {
            showFinalScreen();
            return;
        }

        updateUI();
    });
});

// --------------------
// STEP 3: FINAL SCREEN
// --------------------

function renderTimetable() {
    const output = document.getElementById('timetableOutput');
    output.innerHTML = ""; // clear previous content

    const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

    for (let d = 0; d < 5; d++) {
        output.innerHTML += `<h2>${dayNames[d]}</h2>`;

        for (let p = 0; p < dayData.length; p++) {
            const slot = timeTable[d][p];

            output.innerHTML += `
                <div style="margin-bottom: 8px;">
                    <b>P${p + 1}:</b>
                    ${slot.class || ""} 
                    ${slot.teacher || ""} 
                    ${slot.room || ""}
                </div>
            `;
        }

        output.innerHTML += `<div class="divider" style="margin:15px 0;"></div>`;
    }
}

function showFinalScreen() {
    // Hide the ADD screen
    document.getElementById('ADD').style.display = 'none';

    // Show the FINAL screen
    const finalScreen = document.getElementById('FINAL');
    finalScreen.style.display = 'flex';

    // Render the timetable into the output box
    renderTimetable();
}



// PRINT BUTTON
document.getElementById('printBtn').addEventListener('click', () => {
    window.print();
});

// DOWNLOAD BUTTON
document.getElementById('downloadBtn').addEventListener('click', () => {
    const data = JSON.stringify(timeTable, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "timetable.json";
    a.click();

    URL.revokeObjectURL(url);
});