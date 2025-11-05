import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PatientOnboarding() {
  const [name, setName] = useState("");
  const [condition, setCondition] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!name || !condition) {
      alert("Please fill out all required fields");
      return;
    }

    localStorage.setItem(
      "patientData",
      JSON.stringify({ name, condition, location })
    );
    navigate("/patient-dashboard");
  };

  const commonConditions = [
    "Brain Cancer",
    "Glioma",
    "Lung Cancer",
    "Diabetes",
    "Heart Disease",
  ];

  // ✅ Add motion.div here
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }} // animation start
      animate={{ opacity: 1, y: 0 }} // animation end
      exit={{ opacity: 0, y: -40 }} // animation on page exit
      transition={{ duration: 0.6 }} // smoothness
      style={{ textAlign: "center", marginTop: "80px" }}
    >
      <div
        style={{
          display: "inline-block",
          backgroundColor: "#f0f8ff",
          border: "2px solid #90EE90",
          borderRadius: "10px",
          padding: "15px 130px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          marginBottom: "15px",
        }}
      >
        <h2 style={{ margin: 0, color: "#007bff" }}>
          🩺 Patient Profile Setup
        </h2>
      </div>

      <p style={{ color: "#555" }}>
        Tell us a little about your condition so we can personalize your
        experience.
      </p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <input
          style={{ padding: "10px", width: "250px", marginTop: "20px" }}
          placeholder="Your Full Name"
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <br />

        <input
          style={{ padding: "10px", width: "250px" }}
          placeholder='Describe your condition (e.g., "I have Brain Cancer")'
          onChange={(e) => setCondition(e.target.value)}
        />
        <br />
        <br />

        <select
          style={{ padding: "10px", width: "270px" }}
          onChange={(e) => setCondition(e.target.value)}
        >
          <option value="">or choose a common condition</option>
          {commonConditions.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <br />
        <br />
        <input
          style={{ padding: "10px", width: "250px" }}
          placeholder="Your City / Country"
          onChange={(e) => setLocation(e.target.value)}
        />
        <br />
        <br />

        {/* Buttons with hover animation */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            marginTop: "40px",
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          ← Back to Home
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            marginLeft: "20px",
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
          onClick={handleSubmit}
        >
          Continue →
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
