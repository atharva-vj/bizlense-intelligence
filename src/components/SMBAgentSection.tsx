import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useEmailModal } from "./EmailModalContext";

const orbitAgents = ["Sales", "Finance", "Ops", "Marketing", "HR", "Support"];

const panelLines = [
  "→ Revenue: $2.4M (+12.3% MoM) — healthy",
  "→ Root cause: Spike driven by Enterprise segment close rate improvement",
  "→ Risk: Marketing spend efficiency declining — recommend reallocation",
  "→ Action: Trigger budget review with Finance Agent",
  "→ Confidence: 96% — based on 14-day rolling analysis",
];

const dummyData: Record<string, string> = {
  revenue: "Current MRR is $340K, up 8.2% MoM. Total revenue this quarter: $2.4M with a 12.3% increase driven primarily by improved Enterprise close rates.",
  churn: "Churn rate is 2.1%, down 0.4% from last month. 3 Enterprise accounts flagged as at-risk. Retention protocols triggered for key contacts.",
  pipeline: "Pipeline stands at $1.2M, up 23%. 87 qualified leads/day with Enterprise segment showing strongest conversion improvement at +18%.",
  marketing: "Campaign #47 is outperforming benchmark by 34% with a 4.2% CTR. Cost-per-acquisition trending upward — recommend shifting 15% of budget to high-intent channels.",
  team: "12 open roles across engineering and product. Engineering attrition risk is elevated. Retention alerts sent and compensation review recommended.",
  risk: "3 vendor SLAs are at risk of breach. Mitigation protocols activated. Marketing budget utilization at 94% — approaching limit.",
  forecast: "Based on 14-day rolling analysis (96% confidence): Q4 revenue projected at $2.8M assuming current trajectory holds. Main risk: marketing spend efficiency decline.",
  nps: "Current NPS score is 72, up 5 points. Customer satisfaction trending positively across all segments. 94% of tickets resolved within SLA.",
};

const orbitBullets = [
  "Live telemetry across core business functions",
  "Real-time anomaly detection and performance drift alerts",
  "Root-cause reasoning without manual analysis",
  "Action recommendations that drive execution",
  "Executive-level clarity without dashboard sprawl",
];

function getAgentResponse(question: string): string {
  const q = question.toLowerCase();
  if (q.includes("revenue") || q.includes("mrr") || q.includes("money") || q.includes("sales")) return dummyData.revenue;
  if (q.includes("churn") || q.includes("retention") || q.includes("leaving")) return dummyData.churn;
  if (q.includes("pipeline") || q.includes("leads") || q.includes("deals")) return dummyData.pipeline;
  if (q.includes("marketing") || q.includes("campaign") || q.includes("ctr") || q.includes("ads")) return dummyData.marketing;
  if (q.includes("team") || q.includes("hire") || q.includes("hr") || q.includes("role") || q.includes("people")) return dummyData.team;
  if (q.includes("risk") || q.includes("sla") || q.includes("vendor") || q.includes("alert")) return dummyData.risk;
  if (q.includes("forecast") || q.includes("predict") || q.includes("project") || q.includes("future")) return dummyData.forecast;
  if (q.includes("nps") || q.includes("satisfaction") || q.includes("customer") || q.includes("support")) return dummyData.nps;
  return "I'm monitoring all domains. Try asking about revenue, churn, pipeline, marketing, team, risks, forecast, or NPS — I'll synthesize insights across all agents.";
}

interface ChatMessage {
  role: "user" | "agent";
  text: string;
}

const SMBAgentSection = () => {
  const { open } = useEmailModal();
  const [showPanel, setShowPanel] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [typedLines, setTypedLines] = useState<string[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isTyping]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    const userMsg = inputValue.trim();
    setChatMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const response = getAgentResponse(userMsg);
      setChatMessages((prev) => [...prev, { role: "agent", text: response }]);
      setIsTyping(false);
    }, 800 + Math.random() * 600);
  };

  return (
    <section className="relative z-10 py-16 md:py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-5xl font-bold mb-4">
            <span className="text-primary text-glow">ORBIT</span> — Operational Reasoning & Business Intelligence Terminal
          </h2>
        </motion.div>

        <motion.div
          className="glass-panel rounded-xl p-5 md:p-8 glow-emerald mb-8 text-left"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-sm md:text-base text-foreground/80 leading-relaxed mb-6">
            ORBIT is an autonomous performance agent built for modern SMB founders and operators.
            It continuously monitors revenue, operations, finance, and customer signals, detects
            instability early, explains root causes in plain language, and aligns teams around decisive action.
          </p>

          <div className="space-y-2 mb-6">
            {orbitBullets.map((bullet, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-3"
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

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <motion.button
              onClick={open}
              className="px-6 py-3 md:px-8 md:py-4 bg-primary text-primary-foreground font-semibold rounded-lg glow-emerald-strong text-sm hover:scale-105 transition-transform duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Deploy ORBIT
            </motion.button>
            <p className="text-xs text-primary/70 font-mono">Keep your business in orbit.</p>
          </div>
        </motion.div>

        {/* Interactive Demo */}
        <div className="text-center">
          {/* Central orbit visualization */}
          <div className="relative w-72 h-72 md:w-96 md:h-96 mx-auto mb-8">
            {/* Center node */}
            <motion.div
              className="absolute inset-0 m-auto w-20 h-20 md:w-28 md:h-28 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center cursor-pointer glow-emerald-strong z-10"
              animate={{ boxShadow: ["0 0 30px hsl(155 100% 50% / 0.3)", "0 0 60px hsl(155 100% 50% / 0.5)", "0 0 30px hsl(155 100% 50% / 0.3)"] }}
              transition={{ duration: 3, repeat: Infinity }}
              onClick={() => setShowPanel(!showPanel)}
              whileHover={{ scale: 1.1 }}
            >
              <div className="text-center">
                <div className="text-xs md:text-sm font-bold text-primary">ORBIT</div>
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
                  style={{ left: "50%", top: "50%" }}
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

          <p className="text-sm text-muted-foreground mb-2">Click ORBIT to open the executive panel</p>
          <p className="text-xs text-primary/70 font-mono mb-4">
            💬 Chat with ORBIT in plain language — no dashboards to navigate.
          </p>

          {/* Chat Now Button */}
          <motion.button
            className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm glow-emerald-strong hover:bg-primary/90 transition-colors mb-8"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowChat(!showChat)}
          >
            {showChat ? "Close Chat" : "💬 Chat with ORBIT"}
          </motion.button>

          {/* Chat Interface */}
          <AnimatePresence>
            {showChat && (
              <motion.div
                className="glass-panel rounded-xl max-w-2xl mx-auto glow-emerald overflow-hidden text-left"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
              >
                <div className="px-5 py-3 border-b border-border flex items-center gap-2">
                  <motion.div className="w-2 h-2 rounded-full bg-primary" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1, repeat: Infinity }} />
                  <span className="text-xs text-primary font-mono uppercase tracking-widest">ORBIT Agent — Live</span>
                </div>

                <div className="h-64 overflow-y-auto p-4 space-y-3">
                  {chatMessages.length === 0 && (
                    <div className="text-xs text-muted-foreground font-mono text-center py-8">
                      Ask me anything — revenue, churn, pipeline, risks, forecast...
                    </div>
                  )}
                  {chatMessages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`max-w-[80%] rounded-lg px-3 py-2 text-xs font-mono ${
                        msg.role === "user"
                          ? "bg-primary/20 text-foreground border border-primary/20"
                          : "bg-secondary text-foreground/80 border border-border"
                      }`}>
                        {msg.role === "agent" && <span className="text-primary text-[10px] block mb-1">ORBIT →</span>}
                        {msg.text}
                      </div>
                    </motion.div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-secondary border border-border rounded-lg px-3 py-2 text-xs font-mono">
                        <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity }}>
                          ORBIT is thinking...
                        </motion.span>
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                <div className="p-3 border-t border-border flex gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Ask about revenue, churn, pipeline..."
                    className="flex-1 bg-secondary border border-border rounded-lg px-3 py-2 text-xs font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
                  />
                  <motion.button
                    onClick={handleSend}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-xs font-semibold"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Send
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Executive Panel */}
          <AnimatePresence>
            {showPanel && !showChat && (
              <motion.div
                className="glass-panel rounded-xl p-6 text-left max-w-2xl mx-auto glow-emerald mt-6"
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
      </div>
    </section>
  );
};

export default SMBAgentSection;
