import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";

const CITIES = [
  "Dehradun",
  "Haridwar",
  "Rishikesh",
  "Mussoorie",
  "Nainital",
  "Almora",
  "Ranikhet",
  "Lansdowne",
  "Tehri",
  "Uttarkashi",
  "Chamoli",
  "Bageshwar",
  "Pithoragarh",
  "Champawat",
  "Rudraprayag",
  "Pauri",
  "Kotdwar",
  "Kedarnath",
  "Badrinath",
  "Gangotri",
  "Yamunotri",
  "Auli",
  "Chopta",
  "Tungnath",
  "Mana",
];

const HISTORY_KEY = "pitthu-search-history";

function getHistory(): string[] {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]").slice(0, 5);
  } catch {
    return [];
  }
}

function addToHistory(city: string) {
  const prev = getHistory().filter((c) => c !== city);
  const next = [city, ...prev].slice(0, 5);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
}

interface Props {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  id?: string;
}

export default function CityAutocomplete({
  value,
  onChange,
  placeholder,
  id,
}: Props) {
  const [open, setOpen] = useState(false);
  const [history] = useState<string[]>(getHistory);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = value
    ? CITIES.filter((c) => c.toLowerCase().includes(value.toLowerCase()))
    : CITIES;

  const handleSelect = (city: string) => {
    onChange(city);
    addToHistory(city);
    setOpen(false);
  };

  const showHistory = !value && history.length > 0;

  return (
    <div className="relative">
      <Input
        ref={inputRef}
        id={id}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        placeholder={placeholder}
        autoComplete="off"
        data-ocid="city.input"
      />
      {open && (
        <div className="absolute z-50 left-0 right-0 top-full mt-1 bg-popover border border-border rounded-lg shadow-lg overflow-hidden">
          {showHistory && (
            <div className="px-3 pt-2 pb-1">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">
                Recent
              </p>
              <div className="flex flex-wrap gap-1 mb-2">
                {history.map((city) => (
                  <button
                    key={city}
                    type="button"
                    onMouseDown={() => handleSelect(city)}
                    className="px-2 py-0.5 rounded-full bg-muted text-xs text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
          )}
          <ul className="max-h-40 overflow-y-auto">
            {filtered.map((city) => (
              <li
                key={city}
                onMouseDown={() => handleSelect(city)}
                className="px-3 py-2 text-sm cursor-pointer hover:bg-muted text-foreground"
              >
                {city}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
