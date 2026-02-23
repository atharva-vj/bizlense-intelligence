import ParticleBackground from "@/components/ParticleBackground";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ActivityTicker from "@/components/ActivityTicker";
import AgentFleetSection from "@/components/AgentFleetSection";
import NetworkArchitecture from "@/components/NetworkArchitecture";
import SMBAgentSection from "@/components/SMBAgentSection";
import MARSSection from "@/components/MARSSection";
import ExecutiveDashboard from "@/components/ExecutiveDashboard";
import DeployFlow from "@/components/DeployFlow";
import DifferentiationSection from "@/components/DifferentiationSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import EmailCaptureModal from "@/components/EmailCaptureModal";
import { EmailModalProvider } from "@/components/EmailModalContext";

const Index = () => {
  return (
    <EmailModalProvider>
      <div className="min-h-screen gradient-bg relative overflow-x-hidden">
        <ParticleBackground />
        <Header />
        <HeroSection />
        <ActivityTicker />
        <AgentFleetSection />
        <NetworkArchitecture />
        <SMBAgentSection />
        <MARSSection />
        <ExecutiveDashboard />
        <DeployFlow />
        <DifferentiationSection />
        <FinalCTA />
        <Footer />
        <EmailCaptureModal />
      </div>
    </EmailModalProvider>
  );
};

export default Index;
