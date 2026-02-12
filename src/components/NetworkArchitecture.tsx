import { motion } from "framer-motion";

const nodes = [
  { label: "Data Sources", x: 10, y: 50 },
  { label: "Sales Agent", x: 30, y: 25 },
  { label: "Finance Agent", x: 30, y: 75 },
  { label: "Ops Agent", x: 50, y: 15 },
  { label: "Marketing Agent", x: 50, y: 85 },
  { label: "HR Agent", x: 50, y: 50 },
  { label: "SMB Super Agent", x: 72, y: 50 },
  { label: "Executive Interface", x: 92, y: 50 },
];

const connections = [
  [0, 1], [0, 2], [1, 5], [2, 5], [3, 6], [4, 6], [5, 6], [1, 6], [2, 6], [6, 7],
];

const NetworkArchitecture = () => {
  return (
    <section className="relative z-10 py-24 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl md:text-5xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Intelligence <span className="text-primary text-glow">Architecture</span>
        </motion.h2>

        <div className="relative w-full aspect-[3/1] min-h-[300px]">
          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full">
            {connections.map(([from, to], i) => (
              <motion.line
                key={i}
                x1={`${nodes[from].x}%`}
                y1={`${nodes[from].y}%`}
                x2={`${nodes[to].x}%`}
                y2={`${nodes[to].y}%`}
                stroke="hsl(155, 100%, 50%)"
                strokeWidth={to === 6 || from === 6 ? "1" : "0.5"}
                strokeOpacity={to === 6 || from === 6 ? "0.3" : "0.12"}
                strokeDasharray="6 4"
                animate={{ strokeDashoffset: [20, 0] }}
                transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: "linear" }}
              />
            ))}
          </svg>

          {/* Nodes */}
          {nodes.map((node, i) => {
            const isSmb = node.label === "SMB Super Agent";
            const isExec = node.label === "Executive Interface";
            return (
              <motion.div
                key={node.label}
                className="absolute flex flex-col items-center gap-2"
                style={{ left: `${node.x}%`, top: `${node.y}%`, transform: "translate(-50%, -50%)" }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <motion.div
                  className={`rounded-full ${isSmb ? "w-10 h-10 bg-primary glow-emerald-strong" : isExec ? "w-8 h-8 bg-foreground/20 border border-foreground/30" : "w-5 h-5 bg-primary/40 border border-primary/30"}`}
                  animate={isSmb ? { scale: [1, 1.15, 1], boxShadow: ["0 0 20px hsl(155 100% 50% / 0.3)", "0 0 40px hsl(155 100% 50% / 0.5)", "0 0 20px hsl(155 100% 50% / 0.3)"] } : { opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: isSmb ? 3 : 2, repeat: Infinity }}
                />
                <span className={`text-[10px] md:text-xs font-mono whitespace-nowrap ${isSmb ? "text-primary font-bold" : "text-muted-foreground"}`}>
                  {node.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default NetworkArchitecture;
