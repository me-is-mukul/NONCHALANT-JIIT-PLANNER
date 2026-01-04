import XLSX from "xlsx";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const FILE_PATH = "sem4_62.xlsx";

const DAY_MAP = {
  MON: "MON",
  MONDAY: "MON",
  TUE: "TUE",
  TUES: "TUE",
  TUESDAY: "TUE",
  WED: "WED",
  WEDNESDAY: "WED",
  THU: "THU",
  THUR: "THU",
  THURS: "THU",
  THURSDAY: "THU",
  FRI: "FRI",
  FRIDAY: "FRI",
  SAT: "SAT",
  SATUR: "SAT",
  SATURDAY: "SAT"
};

const workbook = XLSX.readFile(FILE_PATH);
const sheet = workbook.Sheets[workbook.SheetNames[0]];
let rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

const STOP_KEYWORDS = ["COURSE CODE", "COURSE NAME", "SHORT NAME"];

let stopIndex = rows.length;

for (let i = 0; i < rows.length; i++) {
  const row = rows[i];
  if (
    row.some(
      cell =>
        typeof cell === "string" &&
        STOP_KEYWORDS.some(k => cell.toUpperCase().includes(k))
    )
  ) {
    stopIndex = i;
    break;
  }
}
rows = rows.slice(0, stopIndex);

const timeRow = rows.find(row =>
  row.some(cell => typeof cell === "string" && cell.includes("AM"))
);

const timeSlots = {};
timeRow.forEach((cell, idx) => {
  if (typeof cell === "string" && cell.trim()) {
    timeSlots[idx] = cell.trim();
  }
});

const dayBuckets = {};
let currentDay = null;

for (const row of rows) {
  const rawDay =
    typeof row[0] === "string"
      ? row[0].replace(/[^A-Z]/gi, "").toUpperCase()
      : null;

  if (rawDay && DAY_MAP[rawDay]) {
    currentDay = DAY_MAP[rawDay];
    dayBuckets[currentDay] = [];
    continue;
  }

  if (currentDay) {
    dayBuckets[currentDay].push(row);
  }
}

const events = [];

for (const [day, dayRows] of Object.entries(dayBuckets)) {
  for (const row of dayRows) {
    for (const [colIdx, cell] of row.entries()) {
      if (!cell || typeof cell !== "string") continue;
      if (!timeSlots[colIdx]) continue;
      if (cell.trim() === "LUNCH") continue;

      events.push({
        day,
        time: timeSlots[colIdx],
        raw: cell.trim()
      });
    }
  }
}

function normalizeBatch(token) {
  const cleaned = token.replace(/^[LTP]/i, "");
  if (/^\d+$/.test(cleaned)) return "B" + cleaned;
  return cleaned;
}

function parseCell(raw) {
  const trimmed = raw.trim();

  const result = {
    batches: [],
    course: null,
    room: null,
    faculty: [],
    type: /^P/i.test(trimmed)
      ? "Practical"
      : /^T/i.test(trimmed)
      ? "Tutorial"
      : "Lecture"
  };

  const batchMatch = trimmed.match(/^([A-Z0-9,\-\s]+)/);
  if (batchMatch) {
    result.batches = batchMatch[1]
      .split(",")
      .map(b => normalizeBatch(b.trim()))
      .filter(Boolean);
  }

  const courseMatch = trimmed.match(/\(([^)]+)\)/);
  if (courseMatch) result.course = courseMatch[1].trim();

  const roomMatch = trimmed.match(/-\s*([^/]+)/);
  if (roomMatch) result.room = roomMatch[1].trim();

  const slashSplit = trimmed.split("/");
  if (slashSplit.length > 1) {
    result.faculty = slashSplit[1].split(",").map(f => f.trim());
  }

  return result;
}

const normalized = events.map(e => ({
  day: e.day,
  time: e.time,
  ...parseCell(e.raw),
  raw: e.raw
}));

fs.writeFileSync("../backend/data/timetable.json", JSON.stringify(normalized, null, 2));

console.log(`Parsed ${normalized.length} timetable entries`);
