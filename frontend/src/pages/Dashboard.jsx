import { use, useEffect, useState } from "react";
import axios from "axios";

import TopBar from "../components/TopBar";
import Controls from "../components/Controls";
import Timeline from "../components/Timeline";

export default function Dashboard() {
  const [batch, setBatch] = useState("");
  const [day, setDay] = useState("");
  const [results, setResults] = useState([]);

  function fetchTimetable(b, d) {
    axios
      .post("http://localhost:3000/fetch", { batch: b, day: d })
      .then(res => setResults(res.data.timetable || []))
      .catch(err => {
        console.error(err);
        setResults([]);
      });
  }
  function SubmitHandler() {
    fetchTimetable(batch, day);
  }
  useEffect(() => {
    setBatch("b5");
    const sex = new Date().toLocaleDateString('en-US', { weekday: 'short' }).toLowerCase()
    setDay(sex);
    fetchTimetable("b5", sex);
  }, []);

   return (
    <>
      {/* Fixed background */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-[#0b0615] to-black" />

      {/* Scrollable content */}
      <div className="relative min-h-screen text-purple-100">
        <div className="max-w-6xl mx-auto px-6 pt-6 h-screen">

          <div className="h-full rounded-3xl bg-black/40 backdrop-blur border border-purple-900/30 shadow-lg shadow-purple-900/10 flex flex-col overflow-hidden">
            
            <TopBar />

            <div className="px-6 pt-6">
              <Controls
                batch={batch}
                day={day}
                setBatch={setBatch}
                setDay={setDay}
                onSubmit={() => {SubmitHandler()}}
              />
            </div>

            <div className="h-px bg-purple-900/30 mx-6 my-4" />

            {/* Timeline scrolls, background doesn't */}
            <div className="flex-1 px-6 pb-6 overflow-y-auto custom-scroll">
              {results.length === 0 ? (
                <div className="h-full flex items-center justify-center">
                  <p className="text-sm text-purple-400/70">
                    No timetable found
                  </p>
                </div>
              ) : (
                <Timeline results={results} />
              )}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}