import { motion } from "framer-motion";
import "./SplashScreen.css";

const SplashScreen = () => (
  <div className="splash-container">
    <motion.img
      src="/Muslamix.svg"
      alt="Muslamix Splash"
      className="splash-logo"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1, rotate: [0, 10, -10, 0] }}
      transition={{
        duration: 1.2,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse",
      }}
    />
    <motion.h1
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.8 }}
    >
      Muslamix
    </motion.h1>
  </div>
);

export default SplashScreen;
