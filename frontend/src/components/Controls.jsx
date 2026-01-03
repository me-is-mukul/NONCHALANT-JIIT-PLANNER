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
        className="bg-black/40 border border-purple-900/40 px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
      />

      <input
        type="text"
        value={day}
        onChange={e => setDay(e.target.value)}
        placeholder="Day"
        className="bg-black/40 border border-purple-900/40 px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
      />

      <button
        onClick={onSubmit}
        className="bg-purple-600 hover:bg-purple-500 px-6 py-2 rounded-lg font-medium transition"
      >
        Get
      </button>
    </div>
  );
}
