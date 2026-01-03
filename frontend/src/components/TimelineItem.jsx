import Tag from "./Tag";
import COURSE_MAP from "./helper";


export default function TimelineItem({ entry }) {
    const courseName = COURSE_MAP[entry.course] || entry.course;

    return (
        <div className="relative flex gap-10 mb-10">
            {/* Time */}
            <div className="w-36 text-right text-sm text-muted pt-2">
                {entry.time.split("-")[0].trim() === "12 NOON"
                    ? "12:00"
                    : entry.time.split("-")[0] + ":00"}
                {" - "}
                {entry.time.split("-")[1]}
            </div>

            {/* Dot */}
            <div className="relative z-10">
                <div className="w-3 h-3 rounded-full dot-accent mt-3" />
            </div>

            {/* Card */}
            <div className="card-cta w-[420px] transition duration-300 ease-out hover:-translate-y-[2px] hover:shadow-lg hover:shadow-purple-900/15">
                <div className="text-sm text-muted mb-1">
                    {entry.time}
                </div>

                <div className="text-xl font-semibold mb-3">
                    {courseName}
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
