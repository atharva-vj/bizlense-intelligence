import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const staleMetrics = [
  { label: "Revenue", value: "$312K", note: "Last updated: 3 days ago" },
  { label: "Churn", value: "2.8%", note: "Last updated: 1 week ago" },
  { label: "Pipeline", value: "$890K", note: "Last updated: 5 days ago" },
];

const liveInsights = [
  { agent: "Sales Agent", text: "Pipeline surged to $1.2M — 23% above last week. 3 Enterprise deals likely to close this sprint.", time: "2s ago" },
  { agent: "Finance Agent", text: "MRR hit $340K. Burn rate stabilized — runway extended by 2 months.", time: "5s ago" },
  { agent: "SMB Agent", text: "Cross-domain synthesis: Revenue growth healthy but marketing ROI declining. Budget reallocation recommended.", time: "Just now" },
];

const DifferentiationSection = () => {
  const [activeInsight, setActiveInsight] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveInsight((prev) => (prev + 1) % liveInsights.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative z-10 py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl md:text-5xl font-bold text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Not dashboards. <span className="text-primary text-glow">Intelligence agents.</span>
        </motion.h2>
        <p className="text-center text-muted-foreground text-sm mb-16">See the difference between looking at data and understanding it.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left — Dead Dashboard */}
          <motion.div
            className="rounded-xl border border-border/30 bg-muted/10 relative overflow-hidden"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Header */}
            <div className="px-5 py-3 border-b border-border/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                <span className="text-[10px] font-mono text-muted-foreground/50 uppercase tracking-widest">Traditional Dashboard</span>
              </div>
              <span className="text-[10px] font-mono text-destructive/60">⚠ STALE</span>
            </div>

            <div className="p-5 space-y-4">
              {/* Stale KPIs */}
              {staleMetrics.map((m, i) => (
                <div key={i} className="flex items-center justify-between opacity-40">
                  <div>
                    <div className="text-xs text-muted-foreground/60 font-mono">{m.label}</div>
                    <div className="text-lg font-bold text-muted-foreground/40">{m.value}</div>
                  </div>
                  <span className="text-[9px] text-destructive/40 font-mono">{m.note}</span>
                </div>
              ))}

              {/* Fake static chart */}
              <div className="mt-4">
                <div className="flex gap-1 h-16 items-end opacity-20">
                  {[40, 55, 35, 60, 45, 50, 30, 55, 40, 45, 50, 35].map((h, i) => (
                    <div key={i} className="flex-1 bg-muted-foreground/30 rounded-sm" style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>

              {/* No insights */}
              <div className="text-center py-4 border-t border-border/20">
                <div className="text-xs text-muted-foreground/30 font-mono">No automated insights available</div>
                <div className="text-[10px] text-muted-foreground/20 font-mono mt-1">Manual analysis required</div>
              </div>
            </div>

            {/* "Dead" overlay stripe */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div className="rotate-[-12deg] text-muted-foreground/[0.06] text-5xl font-black tracking-widest select-none">
                OUTDATED
              </div>
            </div>
          </motion.div>

          {/* Right — Living Intelligence */}
          <motion.div
            className="rounded-xl glass-panel glow-emerald-strong relative overflow-hidden"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Header */}
            <div className="px-5 py-3 border-b border-primary/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <motion.div
                  className="w-2 h-2 rounded-full bg-primary"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <span className="text-[10px] font-mono text-primary uppercase tracking-widest">BizLense Agents — Live</span>
              </div>
              <span className="text-[10px] font-mono text-primary/70">Real-time</span>
            </div>

            <div className="p-5 space-y-4">
              {/* Live animated chart */}
              <div className="flex gap-1 h-16 items-end">
                {Array.from({ length: 16 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 bg-primary/30 rounded-sm"
                    animate={{ height: [`${20 + Math.random() * 40}%`, `${40 + Math.random() * 60}%`] }}
                    transition={{ duration: 1.5 + Math.random(), repeat: Infinity, repeatType: "reverse" }}
                  />
                ))}
              </div>

              {/* Agent insights cycling */}
              <div className="space-y-2">
                {liveInsights.map((insight, i) => (
                  <motion.div
                    key={i}
                    className={`glass-panel rounded-lg p-3 transition-all duration-500 ${
                      i === activeInsight ? "border-primary/30 glow-emerald" : "border-transparent opacity-50"
                    }`}
                    animate={i === activeInsight ? { scale: [0.98, 1], opacity: [0.7, 1] } : {}}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5">
                        <motion.div
                          className="w-1.5 h-1.5 rounded-full bg-primary"
                          animate={i === activeInsight ? { scale: [1, 1.6, 1] } : {}}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                        <span className="text-[10px] text-primary font-mono font-semibold">{insight.agent}</span>
                      </div>
                      <span className="text-[9px] text-primary/50 font-mono">{insight.time}</span>
                    </div>
                    <p className="text-xs text-foreground/70 font-mono leading-relaxed">{insight.text}</p>
                  </motion.div>
                ))}
              </div>

              {/* Active agents strip */}
              <div className="flex items-center gap-3 pt-2 border-t border-primary/10">
                <span className="text-[9px] text-muted-foreground font-mono">Active agents:</span>
                {["Sales", "Finance", "Ops", "Marketing", "SMB"].map((a, i) => (
                  <motion.div
                    key={a}
                    className="flex items-center gap-1"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  >
                    <div className="w-1 h-1 rounded-full bg-primary" />
                    <span className="text-[9px] text-primary/70 font-mono">{a}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DifferentiationSection;
