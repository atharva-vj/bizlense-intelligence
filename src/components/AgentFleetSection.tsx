import { motion } from "framer-motion";
import { useState } from "react";

const agents = [
  { name: "Sales Agent", status: "active", insight: "Pipeline velocity trending 18% above Q3 average.", kpi: "87 leads/day", icon: "📈" },
  { name: "Finance Agent", status: "active", insight: "Cash burn rate stabilized. Runway extended by 2 months.", kpi: "$340K MRR", icon: "💰" },
  { name: "Ops Agent", status: "active", insight: "3 vendor SLAs at risk. Mitigation protocols activated.", kpi: "99.2% uptime", icon: "⚙️" },
  { name: "Marketing Agent", status: "active", insight: "Campaign #47 outperforming benchmark by 34%.", kpi: "4.2% CTR", icon: "📣" },
  { name: "HR Agent", status: "active", insight: "Engineering attrition risk elevated. Retention alert sent.", kpi: "12 open roles", icon: "👥" },
  { name: "SMB Agent", status: "primary", insight: "Super Agent synthesizing all domain signals into unified brief.", kpi: "7 agents", icon: "🧠" },
];

const AgentFleetSection = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="relative z-10 py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl md:text-5xl font-bold text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Meet the <span className="text-primary text-glow">Agent Fleet</span>
        </motion.h2>
        <p className="text-center text-muted-foreground mb-16 text-sm">Coordinated intelligence across every domain.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {/* SVG connection lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block" style={{ zIndex: 0 }}>
            <motion.line x1="33%" y1="30%" x2="66%" y2="30%" stroke="hsl(155, 100%, 50%)" strokeWidth="0.5" strokeOpacity="0.15" strokeDasharray="4 4"
              animate={{ strokeDashoffset: [8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} />
            <motion.line x1="33%" y1="70%" x2="66%" y2="70%" stroke="hsl(155, 100%, 50%)" strokeWidth="0.5" strokeOpacity="0.15" strokeDasharray="4 4"
              animate={{ strokeDashoffset: [8, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }} />
            <motion.line x1="50%" y1="20%" x2="50%" y2="80%" stroke="hsl(155, 100%, 50%)" strokeWidth="0.5" strokeOpacity="0.1" strokeDasharray="4 4"
              animate={{ strokeDashoffset: [8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} />
          </svg>

          {agents.map((agent, i) => (
            <motion.div
              key={agent.name}
              className={`relative z-10 glass-panel rounded-xl p-6 cursor-pointer transition-all duration-300 ${
                agent.status === "primary" ? "glow-emerald-strong glow-border border-primary/30" : "hover:glow-emerald"
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              whileHover={{ scale: 1.03, y: -4 }}
            >
              {/* Scanning line effect */}
              <motion.div
                className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none"
                style={{ zIndex: 1 }}
              >
                <motion.div
                  className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent"
                  animate={{ top: ["0%", "100%"] }}
                  transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>

              <div className="flex items-center gap-3 mb-3 relative z-10">
                <motion.div
                  className={`w-2.5 h-2.5 rounded-full ${agent.status === "primary" ? "bg-primary" : "bg-primary/70"}`}
                  animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                />
                <span className="font-semibold text-foreground">{agent.name}</span>
                {agent.status === "primary" && (
                  <span className="text-[10px] font-mono text-primary px-2 py-0.5 rounded-full border border-primary/30 bg-primary/5">
                    SUPER AGENT
                  </span>
                )}
              </div>

              <div className="text-xs text-muted-foreground font-mono mb-3 relative z-10">{agent.kpi}</div>

              {/* Mini chart bar */}
              <div className="flex gap-0.5 h-8 items-end mb-3 relative z-10">
                {Array.from({ length: 12 }).map((_, j) => (
                  <motion.div
                    key={j}
                    className="flex-1 bg-primary/20 rounded-sm"
                    style={{ height: `${20 + Math.random() * 80}%` }}
                    animate={{ height: [`${20 + Math.random() * 60}%`, `${30 + Math.random() * 70}%`] }}
                    transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, repeatType: "reverse" }}
                  />
                ))}
              </div>

              {/* Hover insight */}
              <motion.div
                initial={false}
                animate={{ height: hoveredIdx === i ? "auto" : 0, opacity: hoveredIdx === i ? 1 : 0 }}
                className="overflow-hidden relative z-10"
              >
                <p className="text-xs text-primary/80 font-mono pt-2 border-t border-border">
                  → {agent.insight}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgentFleetSection;
