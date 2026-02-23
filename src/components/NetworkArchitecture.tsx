import { motion } from "framer-motion";

const stages = [
  {
    label: "Data Sources",
    sub: ["Business Systems", "CRM", "Financial", "Risk", "Ops"],
    color: "muted-foreground",
  },
  {
    label: "Integration & Storage",
    sub: ["APIs / Event Streams", "Data Lake", "KPI Knowledge Store"],
    color: "muted-foreground",
  },
  {
    label: "Agent Orchestration",
    sub: ["LLM + Reasoning", "Insight Generation"],
    color: "primary",
    highlight: true,
  },
  {
    label: "Insight Repository",
    sub: ["Memory", "Context Engine"],
    color: "primary",
    highlight: true,
  },
  {
    label: "CXO Interfaces",
    sub: ["Executive Dashboard", "Conversational Agent", "Alerts & Notifications"],
    color: "muted-foreground",
  },
];

const NetworkArchitecture = () => {
  return (
    <section className="relative z-10 py-16 md:py-24 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-2xl md:text-5xl font-bold text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Coordinated. <span className="text-primary text-glow">Not siloed.</span>
        </motion.h2>
        <motion.p
          className="text-center text-muted-foreground text-sm max-w-2xl mx-auto mb-10 md:mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Every BizLense product is built on a coordinated multi-agent architecture.
          Specialized AI agents monitor live signals, reason over complex inputs, and
          execute within defined guardrails. This is not workflow automation. It is operational intelligence.
        </motion.p>

        {/* Horizontal pipeline */}
        <div className="overflow-x-auto pb-4">
          <div className="flex items-stretch gap-0 min-w-[800px]">
            {stages.map((stage, i) => (
              <div key={stage.label} className="flex items-center">
                <motion.div
                  className={`glass-panel rounded-xl p-5 w-[170px] flex-shrink-0 ${
                    stage.highlight ? "glow-emerald border-primary/30" : ""
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <motion.div
                      className={`w-2.5 h-2.5 rounded-full ${
                        stage.highlight ? "bg-primary" : "bg-muted-foreground/40"
                      }`}
                      animate={
                        stage.highlight
                          ? { scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }
                          : { opacity: [0.4, 0.7, 0.4] }
                      }
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span
                      className={`text-xs font-mono font-semibold tracking-wide ${
                        stage.highlight ? "text-primary" : "text-foreground/80"
                      }`}
                    >
                      {stage.label}
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    {stage.sub.map((s) => (
                      <div
                        key={s}
                        className="text-[10px] text-muted-foreground font-mono pl-4 border-l border-border/50"
                      >
                        {s}
                      </div>
                    ))}
                  </div>
                </motion.div>

                {i < stages.length - 1 && (
                  <div className="flex items-center w-10 flex-shrink-0">
                    <svg width="40" height="20" viewBox="0 0 40 20" className="overflow-visible">
                      <motion.line
                        x1="0" y1="10" x2="30" y2="10"
                        stroke="hsl(155, 100%, 50%)" strokeWidth="1" strokeOpacity="0.35" strokeDasharray="4 3"
                        animate={{ strokeDashoffset: [14, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      />
                      <motion.polygon
                        points="28,5 38,10 28,15"
                        fill="hsl(155, 100%, 50%)" fillOpacity="0.35"
                        animate={{ fillOpacity: [0.2, 0.5, 0.2] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NetworkArchitecture;
