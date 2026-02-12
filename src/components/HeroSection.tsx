import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const agentMessages = [
  { agent: "Sales Agent", msg: "Anomaly detected in Q4 pipeline conversion", type: "alert" },
  { agent: "Finance Agent", msg: "Updating revenue forecast — confidence 94%", type: "update" },
  { agent: "SMB Agent", msg: "Synthesizing cross-domain insights", type: "sync" },
  { agent: "Ops Agent", msg: "Supply chain latency reduced by 12%", type: "success" },
  { agent: "Marketing Agent", msg: "Campaign ROI exceeding threshold", type: "success" },
  { agent: "HR Agent", msg: "Attrition risk flagged — Engineering team", type: "alert" },
  { agent: "Sales Agent", msg: "New enterprise lead scored 92/100", type: "update" },
  { agent: "Finance Agent", msg: "Cash flow projection aligned", type: "sync" },
];

const kpis = [
  { label: "Revenue", value: "$2.4M", delta: "+12.3%" },
  { label: "Agents Active", value: "7", delta: "all online" },
  { label: "Anomalies", value: "3", delta: "2 resolved" },
  { label: "Confidence", value: "96%", delta: "stable" },
];

const AgentNode = ({ x, y, label, delay }: { x: string; y: string; label: string; delay: number }) => (
  <motion.div
    className="absolute flex flex-col items-center gap-1"
    style={{ left: x, top: y }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.5 }}
  >
    <motion.div
      className="w-3 h-3 rounded-full bg-primary glow-emerald"
      animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
      transition={{ duration: 2, repeat: Infinity, delay: delay * 0.5 }}
    />
    <span className="text-[10px] text-muted-foreground whitespace-nowrap">{label}</span>
  </motion.div>
);

const HeroSection = () => {
  const [visibleLogs, setVisibleLogs] = useState<number[]>([0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleLogs((prev) => {
        const next = (prev[prev.length - 1] + 1) % agentMessages.length;
        const updated = [...prev, next];
        return updated.length > 5 ? updated.slice(-5) : updated;
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-12 overflow-hidden">
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-overlay opacity-40" />

      {/* Hero text */}
      <motion.div
        className="relative z-10 text-center max-w-4xl mx-auto mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6">
          A coordinated fleet of AI agents{" "}
          <span className="text-primary text-glow">running your business.</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Monitoring. Explaining. Deciding. Continuously.
        </p>
        <motion.button
          className="px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg glow-emerald-strong hover:scale-105 transition-transform duration-200 text-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          Deploy your first agent
        </motion.button>
      </motion.div>

      {/* Live AI System Panel */}
      <motion.div
        className="relative z-10 w-full max-w-5xl mx-auto glass-panel rounded-xl p-6 glow-emerald"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <motion.div
            className="w-2 h-2 rounded-full bg-primary"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="text-xs text-primary font-mono uppercase tracking-widest">System Active — Live</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Agent Network */}
          <div className="relative h-48 md:h-64 glass-panel rounded-lg overflow-hidden col-span-1">
            <div className="absolute inset-0 grid-overlay opacity-20" />
            <AgentNode x="20%" y="20%" label="Sales" delay={0.5} />
            <AgentNode x="70%" y="15%" label="Finance" delay={0.7} />
            <AgentNode x="15%" y="65%" label="Ops" delay={0.9} />
            <AgentNode x="75%" y="60%" label="Marketing" delay={1.1} />
            <AgentNode x="45%" y="40%" label="SMB Agent" delay={0.3} />
            {/* Signal lines via SVG */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <motion.line x1="50%" y1="45%" x2="25%" y2="25%" stroke="hsl(155, 100%, 50%)" strokeWidth="0.5" strokeOpacity="0.3"
                strokeDasharray="4 4"
                animate={{ strokeDashoffset: [8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <motion.line x1="50%" y1="45%" x2="75%" y2="20%" stroke="hsl(155, 100%, 50%)" strokeWidth="0.5" strokeOpacity="0.3"
                strokeDasharray="4 4"
                animate={{ strokeDashoffset: [8, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              />
              <motion.line x1="50%" y1="45%" x2="20%" y2="70%" stroke="hsl(155, 100%, 50%)" strokeWidth="0.5" strokeOpacity="0.3"
                strokeDasharray="4 4"
                animate={{ strokeDashoffset: [8, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
              />
              <motion.line x1="50%" y1="45%" x2="80%" y2="65%" stroke="hsl(155, 100%, 50%)" strokeWidth="0.5" strokeOpacity="0.3"
                strokeDasharray="4 4"
                animate={{ strokeDashoffset: [8, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
              />
            </svg>
          </div>

          {/* Activity Log */}
          <div className="glass-panel rounded-lg p-4 col-span-1 overflow-hidden">
            <div className="text-xs text-muted-foreground font-mono mb-3 uppercase tracking-wider">Live Activity</div>
            <div className="space-y-2">
              {visibleLogs.map((idx, i) => {
                const log = agentMessages[idx];
                return (
                  <motion.div
                    key={`${idx}-${i}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-start gap-2 text-xs"
                  >
                    <span className={`w-1.5 h-1.5 rounded-full mt-1 flex-shrink-0 ${
                      log.type === "alert" ? "bg-amber-400" : log.type === "success" ? "bg-primary" : "bg-blue-400"
                    }`} />
                    <div>
                      <span className="text-primary font-mono">{log.agent}</span>
                      <span className="text-muted-foreground ml-1">{log.msg}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* KPI Panels */}
          <div className="grid grid-cols-2 gap-2 col-span-1">
            {kpis.map((kpi, i) => (
              <motion.div
                key={kpi.label}
                className="glass-panel rounded-lg p-3 flex flex-col justify-between"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                <span className="text-[10px] text-muted-foreground font-mono uppercase">{kpi.label}</span>
                <span className="text-xl font-bold text-foreground">{kpi.value}</span>
                <span className="text-[10px] text-primary">{kpi.delta}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
