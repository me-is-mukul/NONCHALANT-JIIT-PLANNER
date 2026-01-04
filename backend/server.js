import express from "express";
import fs from "fs";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.post("/fetch", async (req, res) => {
  const { day, batch, enrolled } = req.body;

  if (!day || !batch) {
    return res.status(400).json({
      error: "Missing day or batch",
    });
  }

  const timetable = JSON.parse(fs.readFileSync("./data/timetable.json", "utf-8"));
  const courses = JSON.parse(fs.readFileSync("./data/courses.json", "utf-8"));
  const electives = JSON.parse(fs.readFileSync("./data/electives.json", "utf-8"));

  function getParentBatch(batch) {
    const match = batch.match(/^([A-Z]+)/);
    return match ? match[1] : batch;
  }

  function batchMatches(entryBatches, queryBatch, parentBatch) {
    for (const b of entryBatches) {
      if (b === queryBatch || b === parentBatch) return true;
      if (b.includes(parentBatch)) return true;
    }
    return false;
  }

  const parentBatch = getParentBatch(batch.toUpperCase());
  const shortToLong = new Map();
  const longToShort = new Map();

  for (const course of courses) {
    if (course.courseCode && course.shortName) {
      shortToLong.set(course.shortName, course.courseCode);
      longToShort.set(course.courseCode, course.shortName);
    }
  }

  function isElectiveCode(timetableCode, electivesList) {
    if (!timetableCode) return false;
    const normalizedTimetableCode = timetableCode.replace(/^DE\d+/, '');
    for (const elective of electivesList) {
      if (timetableCode === elective) return true;
      if (elective.endsWith(timetableCode)) return true;
      if (elective.endsWith(normalizedTimetableCode)) return true;
      const shortCode = longToShort.get(elective);
      if (shortCode) {
        const normalizedShortCode = shortCode.replace(/^DE\d+/, '');
        if (timetableCode === shortCode || normalizedTimetableCode === normalizedShortCode) return true;
      }
    }
    return false;
  }

  const nonElectives = timetable.filter(entry => {
    if (!entry?.day || !entry?.batches) return false;
    if (entry.day.toUpperCase() !== day.toUpperCase()) return false;
    if (!entry.batches.includes(batch.toUpperCase())) return false;
    if (isElectiveCode(entry.course, electives)) return false;
    return true;
  });

  const enrolledSet = new Set(enrolled || []);
  const enrolledElectives = electives.filter(elective => {
    if (enrolledSet.has(elective)) return true;
    const shortCode = longToShort.get(elective);
    if (shortCode && enrolledSet.has(shortCode)) return true;
    for (const enrolledCode of enrolledSet) {
      if (elective.endsWith(enrolledCode)) return true;
    }
    return false;
  });

  const electiveTimetable = timetable.filter(entry => {
    if (!entry?.day || !entry?.batches) return false;
    if (entry.day.toUpperCase() !== day.toUpperCase()) return false;
    if (!batchMatches(entry.batches, batch.toUpperCase(), parentBatch)) return false;
    return isElectiveCode(entry.course, enrolledElectives);
  });

  const merged = [...nonElectives, ...electiveTimetable];

  function timeToMinutes(timeStr) {
    const parts = timeStr.toLowerCase().match(/(\d+(?:\.\d+)?)\s*-\s*(\d+(?:\.\d+)?)\s*(am|pm|noon)/i);
    if (!parts) return Infinity;
    let hour = parseFloat(parts[1]);
    const period = parts[3];
    if (period === 'noon') return 12 * 60;
    if (period === 'pm' && hour !== 12) hour += 12;
    if (period === 'am' && hour === 12) hour = 0;
    const minutes = (hour % 1) * 60;
    return Math.floor(hour) * 60 + minutes;
  }

  merged.sort((a, b) => timeToMinutes(a.time) - timeToMinutes(b.time));

  res.json({
    timetable: merged,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
