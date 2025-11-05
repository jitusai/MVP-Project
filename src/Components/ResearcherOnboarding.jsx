import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ResearcherOnboarding() {
  const [name, setName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [interests, setInterests] = useState("");
  const [orcid, setOrcid] = useState("");
  const [researchGate, setResearchGate] = useState("");
  const [available, setAvailable] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!name || !specialty || !interests) {
      alert("Please fill out all required fields");
      return;
    }
    localStorage.setItem(
      "researcherData",
      JSON.stringify({
        name,
        specialty,
        interests,
        orcid,
        researchGate,
        available,
      })
    );
    navigate("/researcher-dashboard");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }} // fade in from below
      animate={{ opacity: 1, y: 0 }} // settle in
      exit={{ opacity: 0, y: -40 }} // fade out on exit
      transition={{ duration: 0.6 }} // smooth transition
      style={{ textAlign: "center", marginTop: "60px" }}
    >
      {/* Header box with pop animation */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        style={{
          display: "inline-block",
          backgroundColor: "#f0f8ff",
          border: "2px solid #A2AD9C",
          borderRadius: "10px",
          padding: "15px 130px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          marginBottom: "15px",
        }}
      >
        <h2 style={{ margin: 0, color: "#007bff" }}>
          🧑‍🔬 Researcher Profile Setup
        </h2>
      </motion.div>

      <p>
        Provide your background and expertise to connect with collaborators.
      </p>

      {/* Fade-in form section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <input
          placeholder="Your Name"
          onChange={(e) => setName(e.target.value)}
          style={{ margin: "8px", padding: "8px" }}
        />
        <br />
        <input
          placeholder="Specialty (e.g., Oncology, Neurology)"
          onChange={(e) => setSpecialty(e.target.value)}
          style={{ margin: "8px", padding: "8px" }}
        />
        <br />
        <input
          placeholder="Research Interests (e.g., Immunotherapy, Gene Therapy)"
          onChange={(e) => setInterests(e.target.value)}
          style={{ margin: "8px", padding: "8px" }}
        />
        <br />

        {/* Optional links */}
        <input
          placeholder="ORCID Profile Link (optional)"
          onChange={(e) => setOrcid(e.target.value)}
          style={{ margin: "8px", padding: "8px" }}
        />
        <br />
        <input
          placeholder="ResearchGate Profile Link (optional)"
          onChange={(e) => setResearchGate(e.target.value)}
          style={{ margin: "8px", padding: "8px" }}
        />
        <br />

        {/* Availability toggle */}
        <label style={{ display: "block", margin: "12px" }}>
          <input
            type="checkbox"
            checked={available}
            onChange={() => setAvailable(!available)}
          />{" "}
          Available for Meetings
        </label>
      </motion.div>

      {/* Buttons with hover & tap animations */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
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
          onClick={handleSubmit}
          style={{
            marginTop: "15px",
            marginLeft: "250px",
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Continue →
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
