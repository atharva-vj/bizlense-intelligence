import { motion } from "framer-motion";

const DifferentiationSection = () => {
  return (
    <section className="relative z-10 py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl md:text-5xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Not dashboards. <span className="text-primary text-glow">Intelligence agents.</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left — Dead Dashboard */}
          <motion.div
            className="rounded-xl p-6 border border-border/50 bg-muted/20 relative overflow-hidden"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="absolute top-4 right-4 text-[10px] font-mono text-muted-foreground/50 uppercase">Static</div>
            <div className="space-y-4 opacity-30">
              <div className="h-3 bg-muted-foreground/20 rounded w-3/4" />
              <div className="h-3 bg-muted-foreground/20 rounded w-1/2" />
              <div className="grid grid-cols-3 gap-2 mt-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-20 bg-muted-foreground/10 rounded" />
                ))}
              </div>
              <div className="h-32 bg-muted-foreground/10 rounded mt-4" />
              <div className="h-3 bg-muted-foreground/20 rounded w-2/3 mt-4" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-muted-foreground/20">Yesterday's data</span>
            </div>
          </motion.div>

          {/* Right — Living Intelligence */}
          <motion.div
            className="rounded-xl p-6 glass-panel glow-emerald relative overflow-hidden"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="absolute top-4 right-4 flex items-center gap-1.5">
              <motion.div className="w-1.5 h-1.5 rounded-full bg-primary" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1, repeat: Infinity }} />
              <span className="text-[10px] font-mono text-primary uppercase">Live</span>
            </div>
            <div className="space-y-3">
              {/* Animated bars */}
              <div className="flex gap-1 h-8 items-end">
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 bg-primary/30 rounded-sm"
                    animate={{ height: [`${20 + Math.random() * 40}%`, `${40 + Math.random() * 60}%`] }}
                    transition={{ duration: 1.5 + Math.random(), repeat: Infinity, repeatType: "reverse" }}
                  />
                ))}
              </div>
              {/* Agent activity */}
              {["Sales Agent analyzing pipeline...", "Finance Agent updating forecast...", "SMB Agent synthesizing..."].map((msg, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-2 text-xs font-mono"
                  initial={{ opacity: 0, x: -5 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.2 }}
                >
                  <motion.div className="w-1.5 h-1.5 rounded-full bg-primary" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }} />
                  <span className="text-primary/70">{msg}</span>
                </motion.div>
              ))}
              {/* Network mini */}
              <svg className="w-full h-24 mt-2">
                {[
                  { x1: 20, y1: 30, x2: 50, y2: 50 },
                  { x1: 50, y1: 50, x2: 80, y2: 20 },
                  { x1: 50, y1: 50, x2: 80, y2: 80 },
                  { x1: 20, y1: 70, x2: 50, y2: 50 },
                ].map((line, i) => (
                  <motion.line
                    key={i}
                    x1={`${line.x1}%`} y1={`${line.y1}%`}
                    x2={`${line.x2}%`} y2={`${line.y2}%`}
                    stroke="hsl(155, 100%, 50%)"
                    strokeWidth="0.5"
                    strokeOpacity="0.4"
                    strokeDasharray="4 3"
                    animate={{ strokeDashoffset: [14, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                ))}
                {[
                  { cx: 20, cy: 30 }, { cx: 20, cy: 70 }, { cx: 50, cy: 50 }, { cx: 80, cy: 20 }, { cx: 80, cy: 80 },
                ].map((node, i) => (
                  <motion.circle
                    key={i}
                    cx={`${node.cx}%`} cy={`${node.cy}%`} r="4"
                    fill="hsl(155, 100%, 50%)" fillOpacity="0.6"
                    animate={{ r: [3, 5, 3], fillOpacity: [0.4, 0.8, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DifferentiationSection;
