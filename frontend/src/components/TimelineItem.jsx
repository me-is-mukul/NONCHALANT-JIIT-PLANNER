import Tag from "./Tag";

export default function TimelineItem({ entry }) {
    return (
        <div className="relative flex gap-10 mb-10">
            {/* Time */}
            <div className="w-36 text-right text-sm text-purple-400 pt-2">
                {entry.time.split("-")[0].trim() === "12 NOON"
                    ? "12:00"
                    : entry.time.split("-")[0]+":00"}
                {" - "}
                {entry.time.split("-")[1]}
            </div>

            {/* Dot */}
            <div className="relative z-10">
                <div className="w-3 h-3 rounded-full bg-purple-500 mt-3" />
            </div>

            {/* Card */}
            <div className="bg-black/50 backdrop-blur border hover:scale-105 duration-500 border-purple-900/40 rounded-2xl p-6 w-[420px] shadow-lg shadow-purple-900/20">
                <div className="text-sm text-purple-400 mb-1">
                    {entry.time}
                </div>

                <div className="text-xl font-semibold mb-3">
                    {entry.course}
                </div>

                <div className="flex flex-wrap gap-2 text-xs">
                    <Tag>{entry.type}</Tag>
                    <Tag>{entry.faculty.join(", ")}</Tag>
                    <Tag>{entry.batches.join(", ")}</Tag>
                    <Tag>{entry.room}</Tag>
                </div>
            </div>
        </div>
    );
}
