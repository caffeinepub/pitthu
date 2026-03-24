interface SeatSelectorProps {
  rideType: "private" | "shared" | "bus";
  selectedSeats: number[];
  onToggleSeat: (seat: number) => void;
}

const takenSeats = [3, 7, 12, 18, 25, 31];

export default function SeatSelector({
  rideType,
  selectedSeats,
  onToggleSeat,
}: SeatSelectorProps) {
  const rows = rideType === "bus" ? 10 : 2;
  const cols = rideType === "bus" ? 4 : 2;
  const total = rows * cols;

  return (
    <div>
      <div className="flex items-center gap-4 mb-4 text-sm">
        <span className="flex items-center gap-1.5">
          <span className="w-5 h-5 rounded bg-emerald-500 inline-block" />{" "}
          Available
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-5 h-5 rounded bg-primary inline-block" /> Selected
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-5 h-5 rounded bg-red-400 inline-block" /> Taken
        </span>
      </div>

      {rideType === "bus" && (
        <div className="flex items-center justify-between mb-2 text-xs text-muted-foreground font-montserrat uppercase tracking-wider">
          <span>← Driver</span>
          <span>Window</span>
        </div>
      )}

      <div
        className="grid gap-2"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: total }, (_, i) => i + 1).map((seat) => {
          const taken = takenSeats.includes(seat);
          const selected = selectedSeats.includes(seat);
          return (
            <button
              key={seat}
              type="button"
              disabled={taken}
              onClick={() => onToggleSeat(seat)}
              className={`rounded p-2 text-xs font-bold font-montserrat transition-all ${
                taken
                  ? "bg-red-400 text-white cursor-not-allowed opacity-70"
                  : selected
                    ? "bg-primary text-white ring-2 ring-primary/40 scale-105"
                    : "bg-emerald-500 text-white hover:bg-emerald-600 hover:scale-105"
              }`}
              data-ocid={`seat.toggle.${seat}`}
            >
              {seat}
            </button>
          );
        })}
      </div>

      {selectedSeats.length > 0 && (
        <p className="mt-3 text-sm text-primary font-semibold">
          Selected seats: {selectedSeats.join(", ")}
        </p>
      )}
    </div>
  );
}
