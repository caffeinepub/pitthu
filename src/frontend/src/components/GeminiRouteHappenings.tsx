import { RefreshCw, Sparkles, WifiOff } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import {
  type Happening,
  type HappeningType,
  type Severity,
  useGeminiRouteHappenings,
} from "../hooks/useGeminiRouteHappenings";

const TYPE_ICON: Record<HappeningType, string> = {
  weather: "🌦️",
  traffic: "🚧",
  event: "🎪",
  wildlife: "🐘",
  alert: "⚠️",
  crowd: "👥",
};

const SEVERITY_CLASS: Record<Severity, string> = {
  info: "border-l-blue-400 bg-blue-500/10",
  warning: "border-l-amber-400 bg-amber-500/10",
  danger: "border-l-red-400 bg-red-500/10",
};

const SEVERITY_BADGE: Record<Severity, string> = {
  info: "bg-blue-500/20 text-blue-300",
  warning: "bg-amber-500/20 text-amber-300",
  danger: "bg-red-500/20 text-red-300",
};

function HappeningItem({ item, index }: { item: Happening; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.35, ease: "easeOut" }}
      className={`flex gap-3 p-3 rounded-xl border-l-4 ${SEVERITY_CLASS[item.severity]}`}
      data-ocid={`happenings.item.${index + 1}`}
    >
      <span className="text-2xl flex-shrink-0 mt-0.5">
        {TYPE_ICON[item.type]}
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="font-semibold text-sm text-white leading-tight">
            {item.title}
          </p>
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-medium ${SEVERITY_BADGE[item.severity]}`}
          >
            {item.severity}
          </span>
        </div>
        <p className="text-xs text-white/70 mt-1 leading-relaxed">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

function SkeletonRow() {
  return (
    <div className="flex gap-3 p-3 rounded-xl bg-white/5 animate-pulse">
      <div className="w-8 h-8 rounded-full bg-white/10 flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-3 bg-white/10 rounded w-3/4" />
        <div className="h-3 bg-white/10 rounded w-full" />
      </div>
    </div>
  );
}

interface Props {
  from: string;
  to: string;
}

export default function GeminiRouteHappenings({ from, to }: Props) {
  const { happenings, loading, error, refetch } = useGeminiRouteHappenings(
    from,
    to,
  );

  return (
    <div
      className="rounded-2xl border border-white/20 backdrop-blur-md bg-gradient-to-br from-slate-900/80 to-blue-950/80 shadow-xl overflow-hidden mb-6"
      data-ocid="happenings.card"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-orange-400" />
            <h3 className="font-montserrat font-bold text-white text-base tracking-wide">
              Live Route Intel
            </h3>
          </div>
          <p className="text-xs text-white/50 mt-0.5">
            Powered by Gemini AI · {from} → {to}
          </p>
        </div>
        <button
          type="button"
          onClick={refetch}
          disabled={loading}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors disabled:opacity-50"
          aria-label="Refresh live route intel"
          data-ocid="happenings.button"
        >
          <RefreshCw
            className={`w-4 h-4 text-white/80 ${loading ? "animate-spin" : ""}`}
          />
        </button>
      </div>

      {/* Body */}
      <div className="p-4 space-y-2">
        {loading && (
          <div className="space-y-2" data-ocid="happenings.loading_state">
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
          </div>
        )}

        {!loading && error && happenings.length === 0 && (
          <div
            className="flex flex-col items-center gap-3 py-4"
            data-ocid="happenings.error_state"
          >
            <WifiOff className="w-8 h-8 text-white/40" />
            <p className="text-white/60 text-sm text-center">
              Unable to fetch live data
            </p>
            <button
              type="button"
              onClick={refetch}
              className="text-xs px-4 py-2 rounded-full bg-orange-500/20 border border-orange-400/30 text-orange-300 hover:bg-orange-500/30 transition-colors"
              data-ocid="happenings.secondary_button"
            >
              Retry
            </button>
          </div>
        )}

        <AnimatePresence>
          {!loading && happenings.length > 0 && (
            <>
              {error && (
                <div className="flex items-center gap-1.5 text-xs text-amber-400/80 mb-1">
                  <span>⚡</span>
                  <span>{error}</span>
                </div>
              )}
              {happenings.map((item, i) => (
                <HappeningItem key={item.title} item={item} index={i} />
              ))}
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
