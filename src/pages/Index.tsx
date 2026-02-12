import ParticleBackground from "@/components/ParticleBackground";
import HeroSection from "@/components/HeroSection";
import ActivityTicker from "@/components/ActivityTicker";
import AgentFleetSection from "@/components/AgentFleetSection";
import NetworkArchitecture from "@/components/NetworkArchitecture";
import SMBAgentSection from "@/components/SMBAgentSection";
import ExecutiveDashboard from "@/components/ExecutiveDashboard";
import DeployFlow from "@/components/DeployFlow";
import DifferentiationSection from "@/components/DifferentiationSection";
import FinalCTA from "@/components/FinalCTA";

const Index = () => {
  return (
    <div className="min-h-screen gradient-bg relative overflow-x-hidden">
      <ParticleBackground />
      <HeroSection />
      <ActivityTicker />
      <AgentFleetSection />
      <NetworkArchitecture />
      <SMBAgentSection />
      <ExecutiveDashboard />
      <DeployFlow />
      <DifferentiationSection />
      <FinalCTA />
    </div>
  );
};

export default Index;
