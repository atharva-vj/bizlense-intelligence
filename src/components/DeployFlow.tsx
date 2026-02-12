import { motion } from "framer-motion";

const steps = [
  { label: "Connect Data", desc: "APIs, databases, SaaS tools" },
  { label: "Activate Agents", desc: "Domain-specific AI fleet" },
  { label: "Insights Flow", desc: "Continuous intelligence" },
];

const DeployFlow = () => {
  return (
    <section className="relative z-10 py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-3xl md:text-5xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Deploy in <span className="text-primary text-glow">three signals</span>
        </motion.h2>

        <div className="flex flex-col md:flex-row items-center justify-center gap-0">
          {steps.map((step, i) => (
            <div key={step.label} className="flex items-center">
              <motion.div
                className="glass-panel rounded-xl p-8 text-center min-w-[200px]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                whileHover={{ y: -5 }}
              >
                <motion.div
                  className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 mx-auto mb-4 flex items-center justify-center"
                  animate={{ boxShadow: ["0 0 10px hsl(155 100% 50% / 0.1)", "0 0 25px hsl(155 100% 50% / 0.3)", "0 0 10px hsl(155 100% 50% / 0.1)"] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                >
                  <span className="text-primary font-bold font-mono">{i + 1}</span>
                </motion.div>
                <div className="font-semibold text-foreground mb-1">{step.label}</div>
                <div className="text-xs text-muted-foreground">{step.desc}</div>
              </motion.div>

              {i < steps.length - 1 && (
                <div className="hidden md:block w-16 h-px relative mx-2">
                  <div className="absolute inset-0 bg-primary/20" />
                  <motion.div
                    className="absolute top-0 left-0 h-full w-4 bg-primary/60 rounded-full"
                    animate={{ x: [0, 48, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DeployFlow;
