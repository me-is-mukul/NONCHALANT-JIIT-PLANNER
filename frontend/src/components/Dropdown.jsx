import { useEffect, useRef, useState } from "react";

export default function Dropdown({
  label,
  value,
  onChange,
  options,
  placeholder = "Select...",
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef(null);

  const filtered = options.filter(opt =>
    opt.toLowerCase().includes(query.toLowerCase())
  );

  // close on outside click
  useEffect(() => {
    const handler = e => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative w-64">
      {label && (
        <div className="text-xs text-muted mb-1">{label}</div>
      )}

      {/* Input */}
      <div
        onClick={() => setOpen(o => !o)}
        className="input cursor-pointer flex items-center justify-between"
      >
        <span>{value || placeholder}</span>
        <span className="opacity-60">⌄</span>
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 mt-2 w-full rounded-xl border border-white/10 bg-black/90 backdrop-blur shadow-xl">
          <div className="p-2 border-b border-white/10">
            <input
              autoFocus
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search..."
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>

          <div className="max-h-56 overflow-y-auto">
            {filtered.length === 0 && (
              <div className="px-3 py-2 text-sm text-muted">
                No results
              </div>
            )}

            {filtered.map(opt => (
              <div
                key={opt}
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                  setQuery("");
                }}
                className={`px-3 py-2 text-sm cursor-pointer hover:bg-white/10 ${
                  opt === value ? "bg-white/10" : ""
                }`}
              >
                {opt}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
