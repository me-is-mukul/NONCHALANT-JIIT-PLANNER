import COURSES from "./data/courses.json" with { type: "json" };
import TIMETABLE from "./data/timetable.json" with { type: "json" };
import ELECTIVES from "./data/electives.json" with { type: "json" };
function Helper(ENROLLED, DAY, BATCH) {
  const codeToCourse = new Map();
  const shortToLong = new Map();
  for (const c of COURSES) {
    if (c.courseCode) {
      codeToCourse.set(c.courseCode, c);
    }
    if (c.shortName) {
      shortToLong.set(c.shortName, c.courseCode);
    }
  }
  const enrolledSet = new Set(ENROLLED);
  const electivesSet = new Set(ELECTIVES);
  const enrolledElectives = [...enrolledSet].filter(code =>
    electivesSet.has(code)
    );
  const normalizedElectives = new Set();
  for (const code of enrolledElectives) {
    normalizedElectives.add(code);
    // add short version if exists
    const course = codeToCourse.get(code);
    if (course?.shortName) {
      normalizedElectives.add(course.shortName);
    }
  }
  const result = [];
  const seen = new Set();
  for (const entry of TIMETABLE) {
    if (entry.day !== DAY) continue;
    if (!entry.batches.includes(BATCH)) continue;
    const courseCode = entry.course;
    // normalize timetable course
    const normalizedCourse =
      normalizedElectives.has(courseCode) ||
      normalizedElectives.has(shortToLong.get(courseCode));
    if (!normalizedCourse) continue;
    // uniqueness key
    const key = `${entry.day}|${entry.time}|${courseCode}|${entry.room}`;
    if (seen.has(key)) continue;
    seen.add(key);
    result.push({
      ...entry,
      courseName:
        codeToCourse.get(shortToLong.get(courseCode) || courseCode)
          ?.courseName || courseCode,
    });
  }
  return result;
}

export default Helper;
