import express from "express";
import fs from "fs";
import dotenv from "dotenv";
import cors from "cors";
import Helper from "./Helper.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());




app.post("/fetch", async (req, res) => {
  const { day, batch, enrolled } = req.body;

  if (!day || !batch ) {
    return res.status(400).json({
      error: "Missing day or batch",
    });
  }
  const Add = Helper(enrolled,  day.toUpperCase(), batch.toUpperCase());
  const timetable = JSON.parse(
    fs.readFileSync("./data/timetable.json", "utf-8")
  );

  const filtered = timetable.filter(entry => {
    if (!entry?.day || !entry?.batches) return false;
    if (entry.day.toUpperCase() !== day.toUpperCase()) return false;
    if (enrolled.includes(entry.course)) return false;
    return entry.batches.includes(batch.toUpperCase());
  });


  res.json({
    timetable: filtered,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
