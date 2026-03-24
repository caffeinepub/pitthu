import { Button } from "@/components/ui/button";
import { Mountain } from "lucide-react";
import { motion } from "motion/react";

interface Props {
  show: boolean;
  from?: string;
  to?: string;
  type?: "ride" | "drone";
}

export default function EmptyState({ show }: Props) {
  if (!show) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
      data-ocid="search.empty_state"
    >
      <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-5">
        <Mountain className="w-10 h-10 text-muted-foreground" />
      </div>
      <h3 className="font-montserrat font-black uppercase text-lg text-foreground mb-2">
        No rides available for this route today
      </h3>
      <p className="text-muted-foreground text-sm mb-6 max-w-xs">
        Try a nearby city or different transport mode
      </p>
      <div className="flex gap-3 flex-wrap justify-center">
        <Button
          variant="outline"
          className="rounded-full font-montserrat font-bold uppercase text-xs"
          data-ocid="search.secondary_button"
        >
          Try Bus Instead
        </Button>
        <Button
          variant="outline"
          className="rounded-full font-montserrat font-bold uppercase text-xs"
          data-ocid="search.secondary_button"
        >
          Nearby Cities
        </Button>
      </div>
    </motion.div>
  );
}
