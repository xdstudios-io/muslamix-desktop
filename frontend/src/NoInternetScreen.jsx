import { motion } from "framer-motion";
import "./NoInternetScreen.css";

const NoInternetScreen = ({ onRetry }) => (
  <div className="no-internet-container offline-dark">
    <motion.img
      src="/Muslamixgray.svg"
      alt="No Internet"
      className="offline-illustration"
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
    />
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.7 }}
      className="offline-message"
    >
      You're offline. Check your connection and try again.
    </motion.h2>
    <motion.button
      className="offline-ok-btn"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      onClick={onRetry}
    >
      Ok
    </motion.button>
  </div>
);

export default NoInternetScreen;
