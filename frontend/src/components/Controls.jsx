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
    <div className="flex flex-wrap gap-4 px-8 py-6 items-end">
      
      <Dropdown
        label="Batch"
        value={batch}
        onChange={setBatch}
        options={BATCHES}
        placeholder="Select batch"
      />

      <Dropdown
        label="Day"
        value={day}
        onChange={setDay}
        options={DAYS}
        placeholder="Select day"
      />

      <button
        onClick={onSubmit}
        className="btn-primary h-[42px]"
      >
        Get
      </button>
    </div>
  );
}
