import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ParticleBackground from "@/components/ParticleBackground";
import { EmailModalProvider } from "@/components/EmailModalContext";
import EmailCaptureModal from "@/components/EmailCaptureModal";

const Privacy = () => {
  return (
    <EmailModalProvider>
      <div className="min-h-screen gradient-bg relative overflow-x-hidden">
        <ParticleBackground />
        <Header />
        <section className="relative z-10 min-h-[60vh] flex flex-col items-center justify-center px-4 pt-24 pb-16">
          <motion.div
            className="text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Privacy <span className="text-primary text-glow">Policy</span>
            </h1>
            <p className="text-muted-foreground text-sm md:text-base mb-6">
              How BizLense collects, uses, and protects your data.
            </p>
            <div className="glass-panel rounded-xl p-6 md:p-8 text-left">
              <p className="text-sm text-foreground/70 leading-relaxed font-mono">
                Our privacy policy is being drafted. We are committed to transparent data practices
                and will publish the full policy here soon. Questions? Contact us directly.
              </p>
            </div>
          </motion.div>
        </section>
        <Footer />
        <EmailCaptureModal />
      </div>
    </EmailModalProvider>
  );
};

export default Privacy;
