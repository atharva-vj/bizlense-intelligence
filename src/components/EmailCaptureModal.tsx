import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useEmailModal } from "./EmailModalContext";

const EmailCaptureModal = () => {
  const { isOpen, close } = useEmailModal();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", role: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`BizLense Inquiry from ${form.name} — ${form.company}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company}\nRole: ${form.role}\n\nMessage:\n${form.message || "(none)"}`
    );
    window.location.href = `mailto:atharva@zenwealth.club?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const handleClose = () => {
    close();
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", email: "", company: "", role: "", message: "" });
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />
          <motion.div
            className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 glass-panel rounded-xl p-6 glow-emerald border border-primary/20"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
          >
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              ✕
            </button>

            {submitted ? (
              <div className="text-center py-12">
                <motion.div
                  className="w-12 h-12 rounded-full bg-primary/20 border border-primary/30 mx-auto mb-4 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  <span className="text-primary text-xl">✓</span>
                </motion.div>
                <h3 className="text-lg font-semibold text-foreground mb-2">We'll be in touch shortly.</h3>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-semibold text-foreground mb-1">Request Access</h3>
                <p className="text-xs text-muted-foreground mb-5 font-mono">Get early access to BizLense systems.</p>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    required
                    type="text"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-secondary border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
                  />
                  <input
                    required
                    type="email"
                    placeholder="Work Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-secondary border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
                  />
                  <input
                    required
                    type="text"
                    placeholder="Company"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className="w-full bg-secondary border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
                  />
                  <input
                    required
                    type="text"
                    placeholder="Role"
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className="w-full bg-secondary border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
                  />
                  <textarea
                    placeholder="Message (optional)"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={3}
                    className="w-full bg-secondary border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 resize-none"
                  />
                  <motion.button
                    type="submit"
                    className="w-full px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg glow-emerald-strong text-sm"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Request Access
                  </motion.button>
                </form>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EmailCaptureModal;
