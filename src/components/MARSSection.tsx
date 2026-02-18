import { motion } from "framer-motion";
import { useEmailModal } from "./EmailModalContext";

const bullets = [
  "Increase early cure and settlement rates",
  "Reduce manual collector effort",
  "Standardize negotiation logic across portfolios",
  "Enforce regulatory-safe communication",
  "Conversational intelligence for borrowers and recovery teams",
  "Full audit trail and compliance guardrails",
];

const MARSSection = () => {
  const { open } = useEmailModal();

  return (
    <section className="relative z-10 py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-primary text-glow">MARS</span> — Multi-Agent Recovery System
          </h2>
        </motion.div>

        <motion.div
          className="glass-panel rounded-xl p-8 glow-emerald mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-sm md:text-base text-foreground/80 leading-relaxed mb-8">
            MARS is a compliance-safe, agentic AI recovery platform for unsecured lending.
            It increases early cure and settlement rates, reduces manual collector workload,
            standardizes negotiation outcomes, and minimizes regulatory exposure through
            policy-bound, audit-ready AI agents.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
            {bullets.map((bullet, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-3 glass-panel rounded-lg p-3"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <motion.div
                  className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                />
                <span className="text-xs text-foreground/70 font-mono">{bullet}</span>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <motion.button
              onClick={open}
              className="px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg glow-emerald-strong text-sm hover:scale-105 transition-transform duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Deploy MARS
            </motion.button>
            <p className="text-xs text-primary/70 font-mono mt-4">Recovery, intelligently controlled.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MARSSection;
