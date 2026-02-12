import { motion } from "framer-motion";

const logs = [
  "Sales Agent: New lead qualified — score 88",
  "Finance Agent: Forecast updated — Q1 adjusted +4%",
  "SMB Agent: Cross-domain sync complete",
  "Ops Agent: Vendor SLA breach detected",
  "Marketing Agent: Email campaign CTR up 23%",
  "HR Agent: Hiring pipeline review triggered",
  "Sales Agent: Deal velocity anomaly flagged",
  "Finance Agent: Budget variance within threshold",
];

const ActivityTicker = () => {
  const doubled = [...logs, ...logs];

  return (
    <div className="relative z-10 w-full ticker-glow py-3 overflow-hidden">
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((log, i) => (
          <span key={i} className="text-xs font-mono text-muted-foreground flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-primary animate-pulse-glow" />
            {log}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default ActivityTicker;
