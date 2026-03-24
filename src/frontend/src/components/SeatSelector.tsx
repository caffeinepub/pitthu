import { motion } from "motion/react";
import type { KeyboardEvent } from "react";

interface SeatSelectorProps {
  rideType: "private" | "shared" | "bus";
  selectedSeats: number[];
  onToggleSeat: (seat: number) => void;
}

const TAKEN_SEATS = [3, 7, 12, 18, 25, 31];

function SeatRect({
  cx,
  cy,
  w = 18,
  h = 22,
  seatNum,
  selected,
  taken,
  driver = false,
  onToggle,
}: {
  cx: number;
  cy: number;
  w?: number;
  h?: number;
  seatNum: number;
  selected: boolean;
  taken: boolean;
  driver?: boolean;
  onToggle: (n: number) => void;
}) {
  const fill = driver
    ? "#6b7280"
    : taken
      ? "#f87171"
      : selected
        ? "#3b82f6"
        : "#10b981";
  const headrestH = h * 0.28;

  return (
    <g
      onClick={() => !driver && !taken && onToggle(seatNum)}
      onKeyDown={(e: KeyboardEvent<SVGGElement>) => {
        if (e.key === "Enter" || e.key === " ")
          !driver && !taken && onToggle(seatNum);
      }}
      style={{ cursor: driver || taken ? "not-allowed" : "pointer" }}
      data-ocid={`seat.toggle.${seatNum}`}
    >
      {/* Seat body */}
      <motion.rect
        x={cx - w / 2}
        y={cy - h / 2 + headrestH}
        width={w}
        height={h - headrestH}
        rx={4}
        fill={fill}
        opacity={0.9}
        whileHover={!driver && !taken ? { scale: 1.12 } : {}}
        whileTap={!driver && !taken ? { scale: 0.97 } : {}}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      />
      {/* Headrest */}
      <rect
        x={cx - w / 2 + 2}
        y={cy - h / 2}
        width={w - 4}
        height={headrestH + 2}
        rx={3}
        fill={fill}
        opacity={0.7}
      />
      {/* Seat number */}
      <text
        x={cx}
        y={cy + 4}
        textAnchor="middle"
        fontSize="7"
        fontWeight="bold"
        fill="white"
        style={{ userSelect: "none" }}
      >
        {driver ? "D" : seatNum}
      </text>
    </g>
  );
}

function CarTopView({
  selectedSeats,
  onToggleSeat,
}: {
  selectedSeats: number[];
  onToggleSeat: (n: number) => void;
}) {
  const W = 200;
  const H = 360;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full max-w-[220px] mx-auto drop-shadow-xl"
      aria-label="Car top view seat selector"
    >
      <title>Car top-view seat selection</title>
      <defs>
        <linearGradient id="bodyGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1e2a3a" />
          <stop offset="100%" stopColor="#2d3f55" />
        </linearGradient>
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.4" />
        </filter>
      </defs>

      {/* Car body */}
      <rect
        x={20}
        y={30}
        width={W - 40}
        height={H - 60}
        rx={30}
        fill="url(#bodyGrad)"
        stroke="#0f172a"
        strokeWidth={2.5}
        filter="url(#shadow)"
      />

      {/* Front bonnet curve */}
      <path
        d={`M 30 70 Q ${W / 2} 20 ${W - 30} 70`}
        fill="#16213e"
        stroke="#0f172a"
        strokeWidth={1.5}
      />

      {/* Rear boot curve */}
      <path
        d={`M 30 ${H - 70} Q ${W / 2} ${H - 20} ${W - 30} ${H - 70}`}
        fill="#16213e"
        stroke="#0f172a"
        strokeWidth={1.5}
      />

      {/* Front windscreen */}
      <rect
        x={32}
        y={74}
        width={W - 64}
        height={42}
        rx={8}
        fill="rgba(186,230,253,0.35)"
        stroke="rgba(186,230,253,0.5)"
        strokeWidth={1}
      />

      {/* Rear windscreen */}
      <rect
        x={32}
        y={H - 116}
        width={W - 64}
        height={42}
        rx={8}
        fill="rgba(186,230,253,0.25)"
        stroke="rgba(186,230,253,0.4)"
        strokeWidth={1}
      />

      {/* Left mirror */}
      <ellipse
        cx={18}
        cy={120}
        rx={7}
        ry={12}
        fill="#334155"
        stroke="#0f172a"
        strokeWidth={1.5}
      />
      {/* Right mirror */}
      <ellipse
        cx={W - 18}
        cy={120}
        rx={7}
        ry={12}
        fill="#334155"
        stroke="#0f172a"
        strokeWidth={1.5}
      />

      {/* Side windows */}
      <rect
        x={22}
        y={135}
        width={14}
        height={60}
        rx={4}
        fill="rgba(186,230,253,0.22)"
        stroke="rgba(186,230,253,0.35)"
        strokeWidth={0.8}
      />
      <rect
        x={W - 36}
        y={135}
        width={14}
        height={60}
        rx={4}
        fill="rgba(186,230,253,0.22)"
        stroke="rgba(186,230,253,0.35)"
        strokeWidth={0.8}
      />

      {/* Dashboard line */}
      <line
        x1={36}
        y1={118}
        x2={W - 36}
        y2={118}
        stroke="#475569"
        strokeWidth={1.5}
        strokeDasharray="4,3"
      />

      {/* Steering wheel (driver side - left) */}
      <circle
        cx={62}
        cy={135}
        r={10}
        fill="none"
        stroke="#94a3b8"
        strokeWidth={2}
      />
      <line
        x1={62}
        y1={125}
        x2={62}
        y2={145}
        stroke="#94a3b8"
        strokeWidth={1.5}
      />
      <line
        x1={52}
        y1={135}
        x2={72}
        y2={135}
        stroke="#94a3b8"
        strokeWidth={1.5}
      />

      {/* Center console line */}
      <line
        x1={W / 2}
        y1={130}
        x2={W / 2}
        y2={H - 80}
        stroke="#334155"
        strokeWidth={2}
        strokeDasharray="6,4"
      />

      {/* Seats: front row */}
      {/* Seat 1 = Driver (left) */}
      <SeatRect
        cx={68}
        cy={165}
        seatNum={1}
        selected={false}
        taken
        driver
        onToggle={onToggleSeat}
      />
      {/* Seat 2 = Passenger front right */}
      <SeatRect
        cx={132}
        cy={165}
        seatNum={2}
        selected={selectedSeats.includes(2)}
        taken={TAKEN_SEATS.includes(2)}
        onToggle={onToggleSeat}
      />

      {/* Rear bench separator */}
      <rect
        x={36}
        y={208}
        width={W - 72}
        height={3}
        rx={2}
        fill="#334155"
        opacity={0.5}
      />

      {/* Rear row: 3 seats */}
      <SeatRect
        cx={58}
        cy={255}
        seatNum={3}
        selected={selectedSeats.includes(3)}
        taken={TAKEN_SEATS.includes(3)}
        onToggle={onToggleSeat}
      />
      <SeatRect
        cx={100}
        cy={255}
        seatNum={4}
        selected={selectedSeats.includes(4)}
        taken={TAKEN_SEATS.includes(4)}
        onToggle={onToggleSeat}
      />
      <SeatRect
        cx={142}
        cy={255}
        seatNum={5}
        selected={selectedSeats.includes(5)}
        taken={TAKEN_SEATS.includes(5)}
        onToggle={onToggleSeat}
      />

      {/* Rear seat backrest */}
      <rect
        x={36}
        y={210}
        width={W - 72}
        height={14}
        rx={4}
        fill="#334155"
        opacity={0.6}
      />
    </svg>
  );
}

function SharedTopView({
  selectedSeats,
  onToggleSeat,
}: {
  selectedSeats: number[];
  onToggleSeat: (n: number) => void;
}) {
  const W = 220;
  const H = 420;

  const seatPositions: { cx: number; cy: number; seatNum: number }[] = [
    // Row 0: front (driver + 1 passenger)
    { cx: 60, cy: 100, seatNum: 0 }, // driver
    { cx: 155, cy: 100, seatNum: 1 },
    // Row 1
    { cx: 55, cy: 175, seatNum: 2 },
    { cx: 160, cy: 175, seatNum: 3 },
    // Row 2
    { cx: 55, cy: 245, seatNum: 4 },
    { cx: 160, cy: 245, seatNum: 5 },
    // Row 3
    { cx: 55, cy: 315, seatNum: 6 },
    { cx: 160, cy: 315, seatNum: 7 },
  ];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full max-w-[240px] mx-auto drop-shadow-xl"
      aria-label="Tempo traveller seat selector"
    >
      <title>Tempo traveller seat selection</title>
      <defs>
        <linearGradient id="vanGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1e3a5f" />
          <stop offset="100%" stopColor="#2d4f7a" />
        </linearGradient>
      </defs>

      {/* Van body */}
      <rect
        x={15}
        y={25}
        width={W - 30}
        height={H - 50}
        rx={22}
        fill="url(#vanGrad)"
        stroke="#0f172a"
        strokeWidth={2.5}
      />

      {/* Front windscreen */}
      <rect
        x={28}
        y={48}
        width={W - 56}
        height={38}
        rx={6}
        fill="rgba(186,230,253,0.3)"
        stroke="rgba(186,230,253,0.45)"
        strokeWidth={1}
      />

      {/* Rear windscreen */}
      <rect
        x={28}
        y={H - 86}
        width={W - 56}
        height={32}
        rx={6}
        fill="rgba(186,230,253,0.22)"
        stroke="rgba(186,230,253,0.35)"
        strokeWidth={0.8}
      />

      {/* Side windows row 1 */}
      {[155, 225, 295].map((y) => (
        <g key={y}>
          <rect
            x={17}
            y={y}
            width={10}
            height={40}
            rx={3}
            fill="rgba(186,230,253,0.2)"
            stroke="rgba(186,230,253,0.3)"
            strokeWidth={0.6}
          />
          <rect
            x={W - 27}
            y={y}
            width={10}
            height={40}
            rx={3}
            fill="rgba(186,230,253,0.2)"
            stroke="rgba(186,230,253,0.3)"
            strokeWidth={0.6}
          />
        </g>
      ))}

      {/* Mirrors */}
      <ellipse
        cx={13}
        cy={102}
        rx={6}
        ry={10}
        fill="#334155"
        stroke="#0f172a"
        strokeWidth={1.2}
      />
      <ellipse
        cx={W - 13}
        cy={102}
        rx={6}
        ry={10}
        fill="#334155"
        stroke="#0f172a"
        strokeWidth={1.2}
      />

      {/* Dashboard */}
      <line
        x1={28}
        y1={92}
        x2={W - 28}
        y2={92}
        stroke="#475569"
        strokeWidth={1.5}
        strokeDasharray="4,3"
      />

      {/* Steering */}
      <circle
        cx={56}
        cy={105}
        r={9}
        fill="none"
        stroke="#94a3b8"
        strokeWidth={2}
      />
      <line
        x1={56}
        y1={96}
        x2={56}
        y2={114}
        stroke="#94a3b8"
        strokeWidth={1.5}
      />
      <line
        x1={47}
        y1={105}
        x2={65}
        y2={105}
        stroke="#94a3b8"
        strokeWidth={1.5}
      />

      {/* Center aisle */}
      <line
        x1={W / 2}
        y1={95}
        x2={W / 2}
        y2={H - 55}
        stroke="#334155"
        strokeWidth={2}
        strokeDasharray="8,5"
      />

      {/* Row separators */}
      {[143, 213, 283].map((y) => (
        <line
          key={y}
          x1={28}
          y1={y}
          x2={W - 28}
          y2={y}
          stroke="#2d4f7a"
          strokeWidth={1}
          strokeDasharray="4,4"
        />
      ))}

      {seatPositions.map(({ cx, cy, seatNum }) => (
        <SeatRect
          key={seatNum}
          cx={cx}
          cy={cy}
          w={20}
          h={26}
          seatNum={seatNum === 0 ? 0 : seatNum}
          selected={seatNum !== 0 && selectedSeats.includes(seatNum)}
          taken={seatNum !== 0 && TAKEN_SEATS.includes(seatNum)}
          driver={seatNum === 0}
          onToggle={onToggleSeat}
        />
      ))}
    </svg>
  );
}

function BusTopView({
  selectedSeats,
  onToggleSeat,
}: {
  selectedSeats: number[];
  onToggleSeat: (n: number) => void;
}) {
  const ROWS = 10;
  const W = 280;
  const ROW_H = 40;
  const TOP_PAD = 80;
  const H = TOP_PAD + ROWS * ROW_H + 60;

  const seats: { cx: number; cy: number; seatNum: number; col: number }[] = [];
  for (let row = 0; row < ROWS; row++) {
    const cy = TOP_PAD + row * ROW_H + 20;
    seats.push({ cx: 40, cy, seatNum: row * 4 + 1, col: 0 });
    seats.push({ cx: 80, cy, seatNum: row * 4 + 2, col: 1 });
    seats.push({ cx: 130, cy, seatNum: row * 4 + 3, col: 2 });
    seats.push({ cx: 170, cy, seatNum: row * 4 + 4, col: 3 });
  }

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full max-w-[300px] mx-auto drop-shadow-xl"
      aria-label="Bus seat selector"
      style={{ minHeight: 480 }}
    >
      <title>Bus seat selection</title>
      <defs>
        <linearGradient id="busGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1a2035" />
          <stop offset="100%" stopColor="#253050" />
        </linearGradient>
      </defs>

      {/* Bus body */}
      <rect
        x={10}
        y={10}
        width={W - 20}
        height={H - 20}
        rx={18}
        fill="url(#busGrad)"
        stroke="#0f172a"
        strokeWidth={2.5}
      />

      {/* Front windscreen */}
      <rect
        x={22}
        y={22}
        width={W - 44}
        height={40}
        rx={8}
        fill="rgba(186,230,253,0.3)"
        stroke="rgba(186,230,253,0.45)"
        strokeWidth={1}
      />

      {/* Rear windscreen */}
      <rect
        x={22}
        y={H - 62}
        width={W - 44}
        height={32}
        rx={6}
        fill="rgba(186,230,253,0.22)"
        stroke="rgba(186,230,253,0.35)"
        strokeWidth={0.8}
      />

      {/* Side windows */}
      {Array.from({ length: ROWS }).map((_, i) => {
        const y = TOP_PAD + i * ROW_H + 4;
        return (
          // biome-ignore lint/suspicious/noArrayIndexKey: static row grid
          <g key={i}>
            <rect
              x={12}
              y={y}
              width={8}
              height={22}
              rx={2}
              fill="rgba(186,230,253,0.18)"
              stroke="rgba(186,230,253,0.28)"
              strokeWidth={0.5}
            />
            <rect
              x={W - 20}
              y={y}
              width={8}
              height={22}
              rx={2}
              fill="rgba(186,230,253,0.18)"
              stroke="rgba(186,230,253,0.28)"
              strokeWidth={0.5}
            />
          </g>
        );
      })}

      {/* Driver area */}
      <circle
        cx={40}
        cy={68}
        r={10}
        fill="none"
        stroke="#94a3b8"
        strokeWidth={2}
      />
      <line
        x1={40}
        y1={58}
        x2={40}
        y2={78}
        stroke="#94a3b8"
        strokeWidth={1.5}
      />
      <line
        x1={30}
        y1={68}
        x2={50}
        y2={68}
        stroke="#94a3b8"
        strokeWidth={1.5}
      />
      <text x={38} y={74} fontSize="5" fill="#64748b">
        D
      </text>

      {/* Dashboard line */}
      <line
        x1={25}
        y1={76}
        x2={W - 25}
        y2={76}
        stroke="#334155"
        strokeWidth={1.5}
        strokeDasharray="5,3"
      />

      {/* Center aisle */}
      <rect
        x={100}
        y={TOP_PAD - 2}
        width={10}
        height={ROWS * ROW_H + 4}
        rx={2}
        fill="#111827"
        opacity={0.4}
      />
      <line
        x1={105}
        y1={TOP_PAD}
        x2={105}
        y2={TOP_PAD + ROWS * ROW_H}
        stroke="#374151"
        strokeWidth={1}
        strokeDasharray="6,4"
      />

      {/* Row labels */}
      {Array.from({ length: ROWS }).map((_, i) => (
        <text
          // biome-ignore lint/suspicious/noArrayIndexKey: static row grid
          key={i}
          x={220}
          y={TOP_PAD + i * ROW_H + 23}
          fontSize="8"
          fill="#64748b"
          textAnchor="middle"
        >
          R{i + 1}
        </text>
      ))}

      {/* Column labels */}
      <text
        x={40}
        y={TOP_PAD - 6}
        fontSize="7"
        fill="#64748b"
        textAnchor="middle"
      >
        W
      </text>
      <text
        x={80}
        y={TOP_PAD - 6}
        fontSize="7"
        fill="#64748b"
        textAnchor="middle"
      >
        A
      </text>
      <text
        x={130}
        y={TOP_PAD - 6}
        fontSize="7"
        fill="#64748b"
        textAnchor="middle"
      >
        A
      </text>
      <text
        x={170}
        y={TOP_PAD - 6}
        fontSize="7"
        fill="#64748b"
        textAnchor="middle"
      >
        W
      </text>

      {/* Seats */}
      {seats.map(({ cx, cy, seatNum }) => (
        <SeatRect
          key={seatNum}
          cx={cx}
          cy={cy}
          w={16}
          h={20}
          seatNum={seatNum}
          selected={selectedSeats.includes(seatNum)}
          taken={TAKEN_SEATS.includes(seatNum)}
          onToggle={onToggleSeat}
        />
      ))}
    </svg>
  );
}

export default function SeatSelector({
  rideType,
  selectedSeats,
  onToggleSeat,
}: SeatSelectorProps) {
  return (
    <div className="space-y-4">
      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="w-4 h-4 rounded-sm bg-emerald-500 inline-block" />{" "}
          Available
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-4 h-4 rounded-sm bg-blue-500 inline-block" />{" "}
          Selected
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-4 h-4 rounded-sm bg-red-400 inline-block" /> Taken
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-4 h-4 rounded-sm bg-gray-500 inline-block" />{" "}
          Driver
        </span>
      </div>

      <div className="bg-muted/50 rounded-2xl p-4 border border-border overflow-auto">
        {rideType === "private" && (
          <CarTopView
            selectedSeats={selectedSeats}
            onToggleSeat={onToggleSeat}
          />
        )}
        {rideType === "shared" && (
          <SharedTopView
            selectedSeats={selectedSeats}
            onToggleSeat={onToggleSeat}
          />
        )}
        {rideType === "bus" && (
          <div className="overflow-y-auto max-h-[70vh]">
            <BusTopView
              selectedSeats={selectedSeats}
              onToggleSeat={onToggleSeat}
            />
          </div>
        )}
      </div>

      {selectedSeats.length > 0 && (
        <motion.p
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm font-semibold text-primary font-montserrat"
        >
          Selected seats: {selectedSeats.join(", ")}
        </motion.p>
      )}
    </div>
  );
}
