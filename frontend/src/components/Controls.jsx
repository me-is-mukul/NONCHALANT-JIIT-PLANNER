export default function Controls({
  batch,
  day,
  setBatch,
  setDay,
  onSubmit,
}) {
  return (
    <div className="flex flex-wrap gap-3 px-8 py-6">
      
      <input
        type="text"
        value={batch}
        onChange={e => setBatch(e.target.value)}
        placeholder="Batch"
        className="input max-w-xs"
      />

      <input
        type="text"
        value={day}
        onChange={e => setDay(e.target.value)}
        placeholder="Day"
        className="input max-w-xs"
      />

      <button
        onClick={onSubmit}
        className="btn-primary"
      >
        Get
      </button>
    </div>
  );
}
