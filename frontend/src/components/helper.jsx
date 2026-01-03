import courses from "../data/courses.json";

const COURSE_MAP = Object.fromEntries(
  courses.flatMap(c => {
    const entries = [];
    if (c.courseCode) entries.push([c.courseCode, c.courseName]);
    if (c.shortName) entries.push([c.shortName, c.courseName]);
    return entries;
  })
);

export default COURSE_MAP;