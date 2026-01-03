import TimelineItem from "./TimelineItem";

export default function Timeline({ results }) {
  return (
    <div className="relative px-16 pb-20">
      {/* Vertical line */}
      <div className="absolute left-20 top-0 bottom-0 w-[2px] bg-purple-900/40" />

      {results.length === 0 && (
        <p className="text-purple-400 ml-32 mt-6">
          No timetable found
        </p>
      )}

      {results.map((entry, i) => (
        <TimelineItem key={i} entry={entry} />
      ))}
    </div>
  );
}
