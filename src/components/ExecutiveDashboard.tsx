import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const kpis = [
  { label: "MRR", value: "$340K", trend: "+8.2%" },
  { label: "Churn", value: "2.1%", trend: "-0.4%" },
  { label: "NPS", value: "72", trend: "+5" },
  { label: "Pipeline", value: "$1.2M", trend: "+23%" },
];

const alerts = [
  { level: "high", text: "Enterprise churn risk detected — 3 accounts" },
  { level: "medium", text: "Marketing budget utilization at 94%" },
  { level: "low", text: "New competitor pricing detected in segment B" },
];

const aiExplanation = "Revenue growth is primarily driven by improved close rates in the Enterprise segment (+18% MoM). However, marketing cost-per-acquisition is trending upward, suggesting diminishing returns on current campaign strategy. Recommend shifting 15% of budget to high-intent channels identified by the Marketing Agent.";

const ExecutiveDashboard = () => {
  const [typedText, setTypedText] = useState("");
  const [confidence, setConfidence] = useState(0);

  useEffect(() => {
    let charIdx = 0;
    const interval = setInterval(() => {
      if (charIdx <= aiExplanation.length) {
        setTypedText(aiExplanation.slice(0, charIdx));
        charIdx++;
      } else {
        clearInterval(interval);
      }
    }, 25);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setConfidence((prev) => {
        if (prev >= 96) return 94;
        return prev + 0.5;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative z-10 py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          className="text-3xl md:text-5xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Executive <span className="text-primary text-glow">Dashboard</span>
        </motion.h2>

        <motion.div
          className="glass-panel rounded-xl overflow-hidden glow-emerald"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* KPI Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 border-b border-border">
            {kpis.map((kpi, i) => (
              <motion.div
                key={kpi.label}
                className="p-4 md:p-6 border-r border-border last:border-r-0"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">{kpi.label}</div>
                <div className="text-2xl md:text-3xl font-bold text-foreground mt-1">{kpi.value}</div>
                <div className="text-xs text-primary mt-1">{kpi.trend}</div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Alerts */}
            <div className="p-6 border-r border-border">
              <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-4">Active Alerts</div>
              <div className="space-y-3">
                {alerts.map((alert, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-3 glass-panel rounded-lg p-3"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.15 }}
                  >
                    <motion.div
                      className={`w-2 h-2 rounded-full mt-1 flex-shrink-0 ${
                        alert.level === "high" ? "bg-red-400" : alert.level === "medium" ? "bg-amber-400" : "bg-primary"
                      }`}
                      animate={{ opacity: [1, 0.4, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="text-xs text-foreground/80">{alert.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* AI Explanation */}
            <div className="p-6">
              <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-4">AI Analysis</div>
              <p className="text-sm text-foreground/70 font-mono leading-relaxed">
                {typedText}
                <motion.span className="inline-block w-1.5 h-4 bg-primary ml-0.5 align-middle" animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }} />
              </p>
              {/* Confidence meter */}
              <div className="mt-6">
                <div className="flex justify-between text-[10px] text-muted-foreground font-mono mb-1">
                  <span>Confidence</span>
                  <span>{confidence.toFixed(0)}%</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${confidence}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExecutiveDashboard;
