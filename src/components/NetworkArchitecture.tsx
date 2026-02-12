import { motion } from "framer-motion";

// Flowchart columns (left to right)
const columns = [
  { // Col 0: Data Sources
    nodes: [
      { id: "bs", label: "Business Systems", y: 10 },
      { id: "crm", label: "CRM", y: 28 },
      { id: "fin", label: "Financial Systems", y: 46 },
      { id: "risk", label: "Risk Systems", y: 64 },
      { id: "ops", label: "Operational Platforms", y: 82 },
    ],
    x: 3,
  },
  { // Col 1: Integration Layer
    nodes: [{ id: "integ", label: "Integration Layer / APIs / Event Streams", y: 46 }],
    x: 18,
  },
  { // Col 2: Data stores
    nodes: [
      { id: "mock", label: "Mock / Synthetic Data Generator", y: 15 },
      { id: "lake", label: "Enterprise Data Lake", y: 46 },
      { id: "meta", label: "Metadata & KPI Knowledge Store", y: 77 },
    ],
    x: 33,
  },
  { // Col 3: Analytical
    nodes: [{ id: "analytics", label: "Analytical Data Store", y: 46 }],
    x: 46,
  },
  { // Col 4: Agent Orchestration
    nodes: [{ id: "orch", label: "Agent Orchestration Layer", y: 46 }],
    x: 56,
  },
  { // Col 5: LLM
    nodes: [{ id: "llm", label: "LLM + Reasoning Engine", y: 46 }],
    x: 66,
  },
  { // Col 6: Insight Gen
    nodes: [{ id: "insight", label: "Insight Generation Engine", y: 46 }],
    x: 76,
  },
  { // Col 7: Repository
    nodes: [{ id: "repo", label: "Insight Repository / Memory", y: 46 }],
    x: 86,
  },
  { // Col 8: CXO Interfaces
    nodes: [
      { id: "dash", label: "Executive Dashboard", y: 10 },
      { id: "convo", label: "Conversational Agent", y: 30 },
      { id: "alert", label: "Alerting / Notifications", y: 50 },
      { id: "cxo", label: "CXO Interfaces", y: 70 },
      { id: "feedback", label: "User Feedback", y: 90 },
    ],
    x: 97,
  },
];

// Build flat node map
const nodeMap: Record<string, { x: number; y: number; label: string }> = {};
columns.forEach((col) => {
  col.nodes.forEach((n) => {
    nodeMap[n.id] = { x: col.x, y: n.y, label: n.label };
  });
});

const connections: [string, string][] = [
  // Sources → Integration
  ["bs", "integ"], ["crm", "integ"], ["fin", "integ"], ["risk", "integ"], ["ops", "integ"],
  // Integration → Data stores
  ["integ", "mock"], ["integ", "lake"], ["integ", "meta"],
  // Data stores → Analytical
  ["mock", "analytics"], ["lake", "analytics"], ["meta", "analytics"],
  // Pipeline
  ["analytics", "orch"], ["orch", "llm"], ["llm", "insight"], ["insight", "repo"],
  // Repo → Outputs
  ["repo", "dash"], ["repo", "convo"], ["repo", "alert"], ["repo", "cxo"], ["repo", "feedback"],
];

const NetworkArchitecture = () => {
  return (
    <section className="relative z-10 py-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-3xl md:text-5xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Intelligence <span className="text-primary text-glow">Architecture</span>
        </motion.h2>

        {/* Scrollable container for mobile */}
        <div className="overflow-x-auto pb-4">
          <div className="relative min-w-[900px] w-full aspect-[4/1.2]">
            {/* Connection Lines */}
            <svg className="absolute inset-0 w-full h-full">
              {connections.map(([from, to], i) => {
                const f = nodeMap[from];
                const t = nodeMap[to];
                return (
                  <motion.line
                    key={i}
                    x1={`${f.x}%`}
                    y1={`${f.y}%`}
                    x2={`${t.x}%`}
                    y2={`${t.y}%`}
                    stroke="hsl(155, 100%, 50%)"
                    strokeWidth="0.7"
                    strokeOpacity="0.25"
                    strokeDasharray="6 4"
                    animate={{ strokeDashoffset: [20, 0] }}
                    transition={{ duration: 2 + i * 0.15, repeat: Infinity, ease: "linear" }}
                  />
                );
              })}
            </svg>

            {/* Nodes */}
            {Object.entries(nodeMap).map(([id, node], i) => {
              const isOutput = ["dash", "convo", "alert", "cxo", "feedback"].includes(id);
              const isPipeline = ["orch", "llm", "insight", "repo"].includes(id);
              return (
                <motion.div
                  key={id}
                  className="absolute flex flex-col items-center gap-1.5"
                  style={{ left: `${node.x}%`, top: `${node.y}%`, transform: "translate(-50%, -50%)" }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                >
                  <motion.div
                    className={`rounded-md ${
                      isPipeline
                        ? "w-4 h-4 bg-primary/60 border border-primary/50"
                        : isOutput
                        ? "w-3.5 h-3.5 bg-primary/30 border border-primary/20 rounded-sm"
                        : "w-3 h-3 bg-primary/40 border border-primary/30"
                    }`}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2 + Math.random(), repeat: Infinity }}
                  />
                  <span className={`text-[8px] md:text-[10px] font-mono whitespace-nowrap max-w-[90px] md:max-w-[120px] text-center leading-tight ${
                    isPipeline ? "text-primary font-semibold" : "text-muted-foreground"
                  }`}>
                    {node.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NetworkArchitecture;
