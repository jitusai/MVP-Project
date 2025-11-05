import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        textAlign: "center",
        marginTop: "100px",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <motion.h1
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
      >
        <i>Welcome to CuraLink 🩺</i>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        style={{
          fontSize: "18px",
          color: "#555",
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        CuraLink is an AI-powered platform that connects <b>"Patients"</b> and{" "}
        <b>"Researchers"</b> to discover relevant <b>Clinical Trials</b>,{" "}
        <b>Medical Publications</b>, and <b>Health Experts</b>.
      </motion.p>

      <motion.div
        style={{ marginTop: "40px" }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/patient-onboarding")}
          style={{
            padding: "12px 24px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#007bff",
            color: "white",
            cursor: "pointer",
            marginRight: "20px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          }}
        >
          I am a Patient / Caregiver
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/researcher-onboarding")}
          style={{
            padding: "12px 24px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#28a745",
            color: "white",
            cursor: "pointer",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          }}
        >
          I am a Researcher
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
