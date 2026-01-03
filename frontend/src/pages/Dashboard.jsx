import { useEffect, useState } from "react";
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
      <div className="fixed inset-0 app-bg" />

      {/* Scrollable content */}
      <div className="relative min-h-screen">
        <div className="max-w-6xl mx-auto px-6 pt-6 h-screen">

          <div className="h-full rounded-3xl glass-panel flex flex-col overflow-hidden">
            
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

            <div className="divider mx-6 my-4" />

            {/* Timeline scrolls, background doesn't */}
            <div className="flex-1 px-6 pb-6 overflow-y-auto custom-scroll">
              {results.length === 0 ? (
                <div className="h-full flex items-center justify-center">
                  <p className="text-sm text-muted">
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