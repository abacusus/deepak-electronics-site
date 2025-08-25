import React, { useEffect, useMemo, useRef, useState } from "react";
import { Search, X, Mic, Loader2 } from "lucide-react";


export default function BigSearchBar({
  placeholder = "Search products, categories, brands…",
  defaultValue = "",
  suggestions = [],
  loading = false,
  onSearch,
  onChange,
  className = "",
  showMic = false,
}) {
  const [query, setQuery] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(-1);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const normalized = useMemo(() =>
    suggestions.map((s) =>
      typeof s === "string" ? { label: s, value: s } : s
    ), [suggestions]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return normalized.slice(0, 8);
    return normalized.filter((s) => s.label.toLowerCase().includes(q)).slice(0, 8);
  }, [query, normalized]);

  useEffect(() => {
    if (onChange) onChange(query);
  }, [query]);

  const commitSearch = (value = query) => {
    const q = value.trim();
    if (!q) return;
    setOpen(false);
    setHighlight(-1);
    onSearch?.(q);
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setHighlight((h) => Math.min(h + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter") {
      if (open && highlight >= 0) {
        commitSearch(filtered[highlight].value);
      } else {
        commitSearch();
      }
    } else if (e.key === "Escape") {
      setOpen(false);
      setHighlight(-1);
    }
  };

  const onBlur = (e) => {
    // close only if clicking outside the popover
    requestAnimationFrame(() => {
      const active = document.activeElement;
      if (!listRef.current || !listRef.current.contains(active)) {
        setOpen(false);
        setHighlight(-1);
      }
    });
  };

  return (
    <div className={`w-full max-w-3xl mx-auto ${className}`}>
      <div className="relative group">
        {/* Input container */}
        <div className="flex items-center gap-2 bg-white rounded-3xl shadow-lg ring-1 ring-black/5 px-4 md:px-6 py-3 md:py-4 transition focus-within:ring-indigo-300">
          <Search className="w-5 h-5 md:w-6 md:h-6 text-gray-400" aria-hidden />

          <input
            ref={inputRef}
            type="search"
            className="w-full bg-transparent outline-none text-base md:text-lg text-gray-800 placeholder:text-gray-400"
            placeholder={placeholder}
            value={query}
            onFocus={() => setOpen(true)}
            onBlur={onBlur}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            aria-autocomplete="list"
            aria-expanded={open}
            aria-controls="search-suggestions"
          />

          {query && (
            <button
              type="button"
              aria-label="Clear search"
              className="p-2 rounded-full hover:bg-gray-100 text-gray-500"
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {showMic && (
            <button
              type="button"
              aria-label="Voice search"
              className="hidden sm:inline-flex p-2 rounded-full hover:bg-gray-100 text-gray-500"
              onClick={() => console.log("Mic clicked")}
            >
              <Mic className="w-4 h-4" />
            </button>
          )}

          <button
            type="button"
            onClick={() => commitSearch()}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm md:text-base font-semibold px-4 md:px-5 py-2 md:py-2.5 rounded-2xl disabled:opacity-50"
            disabled={loading}
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            <span className="hidden sm:inline">Search</span>
          </button>
        </div>

        {/* Suggestions popover */}
        {open && filtered.length > 0 && (
          <ul
            id="search-suggestions"
            ref={listRef}
            role="listbox"
            className="absolute z-10 left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl ring-1 ring-black/5 overflow-hidden max-h-80 overflow-y-auto"
          >
            {filtered.map((s, i) => (
              <li key={s.value}>
                <button
                  role="option"
                  aria-selected={i === highlight}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-indigo-50 ${
                    i === highlight ? "bg-indigo-50" : ""
                  }`}
                  onMouseEnter={() => setHighlight(i)}
                  onClick={() => commitSearch(s.value)}
                >
                  <Search className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-800">{s.label}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* helper text */}
      <p className="mt-3 text-center text-sm text-gray-500">
        Tip: Press <kbd className="px-1 py-0.5 rounded bg-gray-100 border">/</kbd> to focus, <kbd className="px-1 py-0.5 rounded bg-gray-100 border">Enter</kbd> to search
      </p>
      <br></br>

      <hr></hr>
    </div>
  );
}

