import Dropdown from "./Dropdown";

const BATCHES = [
  "A1","A2","A3","A4","A5","A6","A7","A8","A9","A10","A15","A16","A17","A18",
  "B1","B2","B3","B4","B5","B6","B7","B8","B9","B10","B15","B16","C1","C2","C3","G1","G2"
];

const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT"];

export default function Controls({
  batch,
  day,
  setBatch,
  setDay,
  onSubmit,
}) {
  return (
    <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 px-4 sm:px-8 py-4 sm:py-6 items-stretch sm:items-end">
      
      <div className="flex-1 min-w-[120px]">
        <Dropdown
          label="Batch"
          value={batch}
          onChange={setBatch}
          options={BATCHES}
          placeholder="Select batch"
        />
      </div>

      <div className="flex-1 min-w-[120px]">
        <Dropdown
          label="Day"
          value={day}
          onChange={setDay}
          options={DAYS}
          placeholder="Select day"
        />
      </div>

      <button
        onClick={onSubmit}
        className="btn-primary h-[42px] sm:w-auto w-full"
      >
        Get
      </button>
    </div>
  );
}
