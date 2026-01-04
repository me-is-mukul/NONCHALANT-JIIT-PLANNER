import Tag from "./Tag";
import COURSE_MAP from "./helper";


export default function TimelineItem({ entry }) {
    const courseName = COURSE_MAP[entry.course] || entry.course;

    return (
        <div className="relative flex gap-4 sm:gap-10 mb-8 sm:mb-10">
            {/* Time */}
            <div className="w-16 sm:w-36 text-right text-xs sm:text-sm text-muted pt-2 flex-shrink-0">
                <span className="hidden sm:inline">
                    {entry.time.split("-")[0].trim() === "12 NOON"
                        ? "12:00"
                        : entry.time.split("-")[0] + ":00"}
                    {" - "}
                    {entry.type === "Practical" ? parseInt(entry.time.split("-")[1]) + 1 + ":50" : entry.time.split("-")[1]}
                </span>
                <span className="sm:hidden">
                    {entry.time.split("-")[0].trim() === "12 NOON"
                        ? "12:00"
                        : entry.time.split("-")[0].trim()}
                </span>
            </div>

            {/* Dot */}
            <div className="relative z-10 flex-shrink-0">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full dot-accent mt-2 sm:mt-3" />
            </div>

            {/* Card */}
            <div className="card-cta w-full sm:w-[420px] transition duration-300 ease-out hover:-translate-y-[2px] hover:shadow-lg hover:shadow-purple-900/15">
                <div className="text-xs sm:text-sm text-muted mb-1">
                    {entry.time}
                </div>

                <div className="text-base sm:text-xl font-semibold mb-2 sm:mb-3">
                    {courseName}
                </div>

                <div className="flex flex-wrap gap-1.5 sm:gap-2 text-xs">
                    <Tag>{entry.type}</Tag>
                    <Tag>{entry.faculty.join(", ")}</Tag>
                    <Tag>{entry.batches.join(", ")}</Tag>
                    <Tag>{entry.room}</Tag>
                </div>
            </div>
        </div>
    );
}
