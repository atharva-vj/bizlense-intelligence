import { motion } from "framer-motion";
import { useEmailModal } from "./EmailModalContext";

const Header = () => {
  const { open } = useEmailModal();

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <span className="text-xl font-bold tracking-tight">
        <span className="text-primary">Biz</span>
        <span className="text-foreground">Lense</span>
      </span>
      <motion.button
        onClick={open}
        className="px-5 py-2 rounded-lg border border-primary/30 text-primary text-sm font-semibold hover:bg-primary/10 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
      >
        Contact Us
      </motion.button>
    </motion.header>
  );
};

export default Header;
