import XLSX from "xlsx";
import fs from "fs";

export function parseCourseCatalog(xlsxPath) {
  const workbook = XLSX.readFile(xlsxPath);

  const sheetName = workbook.SheetNames[workbook.SheetNames.length - 1];
  const sheet = workbook.Sheets[sheetName];


  const rows = XLSX.utils.sheet_to_json(sheet, {
    header: 1,
    defval: "",
  });


  let headerRowIndex = -1;

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i].map(cell => cell.toString().toLowerCase());

    if (
      row.includes("course code") &&
      row.includes("course name")
    ) {
      headerRowIndex = i;
      break;
    }
  }

  if (headerRowIndex === -1) {
    throw new Error("Course catalog header not found");
  }

  const headerRow = rows[headerRowIndex];


  const columnGroups = [];

  for (let i = 0; i < headerRow.length; i++) {
    if (
      headerRow[i]?.toLowerCase() === "short name" &&
      headerRow[i + 1]?.toLowerCase() === "course code" &&
      headerRow[i + 2]?.toLowerCase() === "course name"
    ) {
      columnGroups.push({
        shortName: i,
        courseCode: i + 1,
        courseName: i + 2,
      });
    }
  }


  const courses = [];

  for (let i = headerRowIndex + 1; i < rows.length; i++) {
    const row = rows[i];

    for (const group of columnGroups) {
      const courseCode = row[group.courseCode];
      const courseName = row[group.courseName];

      if (!courseCode || !courseName) continue;

      courses.push({
        shortName: row[group.shortName] || null,
        courseCode: courseCode.trim(),
        courseName: courseName.trim(),
      });
    }
  }

  return courses;
}

const courses = parseCourseCatalog("sem4_62.xlsx");

fs.writeFileSync("courses.json", JSON.stringify(courses, null, 2));
fs.writeFileSync("../frontend/src/data/courses.json", JSON.stringify(courses, null, 2));
console.log(`parsed ${courses.length} courses`);