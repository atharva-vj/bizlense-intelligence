import { motion } from "framer-motion";

const FinalCTA = () => {
  return (
    <section className="relative z-10 py-32 px-4 overflow-hidden">
      {/* Network mesh background */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        {Array.from({ length: 15 }).map((_, i) => {
          const x = 5 + Math.random() * 90;
          const y = 10 + Math.random() * 80;
          return (
            <motion.circle
              key={i}
              cx={`${x}%`}
              cy={`${y}%`}
              r="3"
              fill="hsl(155, 100%, 50%)"
              fillOpacity="0.3"
              animate={{ r: [2, 4, 2], fillOpacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
            />
          );
        })}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.line
            key={`l-${i}`}
            x1={`${5 + Math.random() * 90}%`}
            y1={`${10 + Math.random() * 80}%`}
            x2={`${5 + Math.random() * 90}%`}
            y2={`${10 + Math.random() * 80}%`}
            stroke="hsl(155, 100%, 50%)"
            strokeWidth="0.3"
            strokeOpacity="0.15"
            strokeDasharray="4 4"
            animate={{ strokeDashoffset: [8, 0] }}
            transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </svg>

      <div className="relative max-w-3xl mx-auto text-center">
        <motion.h2
          className="text-4xl md:text-6xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Deploy your <span className="text-primary text-glow">agents.</span>
        </motion.h2>
        <motion.p
          className="text-muted-foreground mb-10 text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Start with the SMB Agent. Scale to a full fleet.
        </motion.p>
        <motion.button
          className="px-10 py-5 bg-primary text-primary-foreground font-semibold rounded-lg glow-emerald-strong text-lg hover:scale-105 transition-transform duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          Start with the SMB Agent
        </motion.button>
      </div>
    </section>
  );
};

export default FinalCTA;
