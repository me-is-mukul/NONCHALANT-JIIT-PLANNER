import TimelineItem from "./TimelineItem";

export default function Timeline({ results }) {
  return (
    <div className="relative px-4 sm:px-16 pb-10 sm:pb-20">
      {/* Vertical line */}
      <div className="absolute left-4 sm:left-20 top-0 bottom-0 w-[2px] timeline-line" />

      {results.length === 0 && (
        <p className="text-muted ml-8 sm:ml-32 mt-6">
          No timetable found
        </p>
      )}

      {results.map((entry, i) => (
        <TimelineItem key={i} entry={entry} />
      ))}
    </div>
  );
}
