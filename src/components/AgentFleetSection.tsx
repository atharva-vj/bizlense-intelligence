import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { useEmailModal } from "./EmailModalContext";

const agents = [
  { name: "Sales Agent", status: "active", insight: "Pipeline velocity trending 18% above Q3 average.", kpi: "87 leads/day", icon: "📈" },
  { name: "Finance Agent", status: "active", insight: "Cash burn rate stabilized. Runway extended by 2 months.", kpi: "$340K MRR", icon: "💰" },
  { name: "Ops Agent", status: "active", insight: "3 vendor SLAs at risk. Mitigation protocols activated.", kpi: "99.2% uptime", icon: "⚙️" },
  { name: "Marketing Agent", status: "active", insight: "Campaign #47 outperforming benchmark by 34%.", kpi: "4.2% CTR", icon: "📣" },
  { name: "HR Agent", status: "active", insight: "Engineering attrition risk elevated. Retention alert sent.", kpi: "12 open roles", icon: "👥" },
  { name: "ORBIT Agent", status: "primary", insight: "Super Agent synthesizing all domain signals into unified brief.", kpi: "7 agents", icon: "🧠" },
];

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function generateSparklinePoints(agentIndex: number): number[] {
  const rng = seededRandom((agentIndex + 1) * 7919);
  const points: number[] = [];
  let val = 30 + rng() * 40;
  for (let i = 0; i < 12; i++) {
    val += (rng() - 0.4) * 20;
    val = Math.max(10, Math.min(90, val));
    points.push(val);
  }
  return points;
}

function buildSparklinePath(points: number[], width: number, height: number): { line: string; area: string } {
  const stepX = width / (points.length - 1);
  const coords = points.map((p, i) => ({ x: i * stepX, y: height - (p / 100) * height }));

  let line = `M ${coords[0].x},${coords[0].y}`;
  for (let i = 1; i < coords.length; i++) {
    const cpx1 = coords[i - 1].x + stepX * 0.4;
    const cpy1 = coords[i - 1].y;
    const cpx2 = coords[i].x - stepX * 0.4;
    const cpy2 = coords[i].y;
    line += ` C ${cpx1},${cpy1} ${cpx2},${cpy2} ${coords[i].x},${coords[i].y}`;
  }

  const area = `${line} L ${width},${height} L 0,${height} Z`;
  return { line, area };
}

const Sparkline = ({ agentIndex }: { agentIndex: number }) => {
  const W = 200;
  const H = 40;
  const { line, area } = useMemo(() => {
    const pts = generateSparklinePoints(agentIndex);
    return buildSparklinePath(pts, W, H);
  }, [agentIndex]);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-8 mb-3 relative z-10" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`grad-${agentIndex}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(155, 100%, 50%)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="hsl(155, 100%, 50%)" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#grad-${agentIndex})`} />
      <motion.path
        d={line}
        fill="none"
        stroke="hsl(155, 100%, 50%)"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 0.7 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: agentIndex * 0.1 }}
      />
    </svg>
  );
};

const AgentFleetSection = () => {
  const { open } = useEmailModal();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="relative z-10 py-16 md:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-2xl md:text-5xl font-bold text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Our <span className="text-primary text-glow">Systems</span>
        </motion.h2>
        <p className="text-center text-muted-foreground mb-10 md:mb-16 text-sm">Two agentic systems. One coordinated architecture.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">

          {agents.map((agent, i) => (
            <motion.div
              key={agent.name}
              className={`relative z-10 glass-panel rounded-xl p-5 md:p-6 cursor-pointer transition-all duration-300 ${
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

              <Sparkline agentIndex={i} />

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
