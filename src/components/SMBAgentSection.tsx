import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const orbitAgents = ["Sales", "Finance", "Ops", "Marketing", "HR", "Support"];

const panelLines = [
  "→ Revenue: $2.4M (+12.3% MoM) — healthy",
  "→ Root cause: Spike driven by Enterprise segment close rate improvement",
  "→ Risk: Marketing spend efficiency declining — recommend reallocation",
  "→ Action: Trigger budget review with Finance Agent",
  "→ Confidence: 96% — based on 14-day rolling analysis",
];

const SMBAgentSection = () => {
  const [showPanel, setShowPanel] = useState(false);
  const [typedLines, setTypedLines] = useState<string[]>([]);

  useEffect(() => {
    if (!showPanel) {
      setTypedLines([]);
      return;
    }
    let idx = 0;
    const interval = setInterval(() => {
      if (idx < panelLines.length) {
        setTypedLines((prev) => [...prev, panelLines[idx]]);
        idx++;
      } else {
        clearInterval(interval);
      }
    }, 600);
    return () => clearInterval(interval);
  }, [showPanel]);

  return (
    <section className="relative z-10 py-24 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          className="text-3xl md:text-5xl font-bold mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          The <span className="text-primary text-glow">Super Agent</span>
        </motion.h2>

        {/* Central orbit visualization */}
        <div className="relative w-72 h-72 md:w-96 md:h-96 mx-auto mb-12">
          {/* Center node */}
          <motion.div
            className="absolute inset-0 m-auto w-20 h-20 md:w-28 md:h-28 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center cursor-pointer glow-emerald-strong z-10"
            animate={{ boxShadow: ["0 0 30px hsl(155 100% 50% / 0.3)", "0 0 60px hsl(155 100% 50% / 0.5)", "0 0 30px hsl(155 100% 50% / 0.3)"] }}
            transition={{ duration: 3, repeat: Infinity }}
            onClick={() => setShowPanel(!showPanel)}
            whileHover={{ scale: 1.1 }}
          >
            <div className="text-center">
              <div className="text-xs md:text-sm font-bold text-primary">SMB</div>
              <div className="text-[8px] md:text-[10px] text-primary/70 font-mono">Super Agent</div>
            </div>
          </motion.div>

          {/* Orbit ring */}
          <div className="absolute inset-0 rounded-full border border-primary/10" />

          {/* Orbiting agents */}
          {orbitAgents.map((agent, i) => {
            const angle = (360 / orbitAgents.length) * i;
            const radius = 130;
            return (
              <motion.div
                key={agent}
                className="absolute w-10 h-10 md:w-12 md:h-12 rounded-full bg-secondary border border-primary/20 flex items-center justify-center"
                style={{
                  left: "50%",
                  top: "50%",
                }}
                animate={{
                  x: [
                    Math.cos(((angle) * Math.PI) / 180) * radius - 20,
                    Math.cos(((angle + 360) * Math.PI) / 180) * radius - 20,
                  ],
                  y: [
                    Math.sin(((angle) * Math.PI) / 180) * radius - 20,
                    Math.sin(((angle + 360) * Math.PI) / 180) * radius - 20,
                  ],
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              >
                <span className="text-[8px] md:text-[10px] text-muted-foreground font-mono">{agent}</span>
              </motion.div>
            );
          })}
        </div>

        <p className="text-sm text-muted-foreground mb-4">Click the Super Agent to open the executive panel</p>

        {/* Executive Panel */}
        <AnimatePresence>
          {showPanel && (
            <motion.div
              className="glass-panel rounded-xl p-6 text-left max-w-2xl mx-auto glow-emerald"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <motion.div className="w-2 h-2 rounded-full bg-primary" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1, repeat: Infinity }} />
                <span className="text-xs text-primary font-mono uppercase tracking-widest">Executive Brief — Live</span>
              </div>
              <div className="space-y-2 font-mono text-sm">
                {typedLines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-foreground/80"
                  >
                    {line}
                  </motion.div>
                ))}
                {typedLines.length < panelLines.length && (
                  <motion.span className="inline-block w-2 h-4 bg-primary" animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }} />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default SMBAgentSection;
