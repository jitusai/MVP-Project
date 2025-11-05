import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function PatientDashboard() {
  const navigate = useNavigate();
  const patient = JSON.parse(localStorage.getItem("patientData")) || {};

  const [search, setSearch] = useState("");
  const [trials, setTrials] = useState([]);
  const [experts, setExperts] = useState([]);
  const [publications, setPublications] = useState([]);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  // Forum state
  const [forumCategory, setForumCategory] = useState("Cancer Research");
  const [newQuestion, setNewQuestion] = useState("");
  const [forums, setForums] = useState([
    {
      category: "Cancer Research",
      posts: [
        {
          question: "How effective is immunotherapy for glioma?",
          replies: [
            { user: "Dr. Rao", text: "Ongoing trials show 60% response rate." },
          ],
        },
      ],
    },
    {
      category: "Clinical Trials Insights",
      posts: [
        {
          question: "How long does Phase II usually last?",
          replies: [
            { user: "Dr. Priya", text: "Usually between 6 – 12 months." },
          ],
        },
      ],
    },
  ]);

  // 🧠 Auto recommendations
  useEffect(() => {
    const cond = (patient.condition || "").toLowerCase();
    if (cond.includes("heart")) {
      setTrials([
        { title: "Heart Disease AI Study", status: "Recruiting" },
        { title: "Cardiology Clinical Trial", status: "Ongoing" },
      ]);
      setExperts([
        { name: "Dr. Meena Patel", specialty: "Cardiology", active: true },
        {
          name: "Dr. Ramesh Iyer",
          specialty: "Cardiovascular Medicine",
          active: false,
        },
      ]);
      setPublications([
        { title: "AI-Powered Heart Disease Detection", year: 2024 },
        { title: "Advances in Cardiac Imaging", year: 2023 },
      ]);
    } else if (cond.includes("cancer") || cond.includes("glioma")) {
      setTrials([
        { title: "Glioma Immunotherapy Study", status: "Recruiting" },
        { title: "Lung Cancer Drug Phase II", status: "Completed" },
      ]);
      setExperts([
        { name: "Dr. Priya Sharma", specialty: "Oncology", active: true },
        { name: "Dr. Arjun Rao", specialty: "Neurology", active: false },
      ]);
      setPublications([
        { title: "AI in Oncology: Next-Gen Cancer Care", year: 2024 },
        { title: "Brain Tumor Research: A Deep Dive", year: 2023 },
      ]);
    } else {
      setTrials([
        { title: "General Wellness Study", status: "Recruiting" },
        { title: "Nutrition and Health Trial", status: "Completed" },
      ]);
      setExperts([
        {
          name: "Dr. Sneha Verma",
          specialty: "General Medicine",
          active: true,
        },
        { name: "Dr. Rahul Sen", specialty: "Internal Medicine", active: true },
      ]);
      setPublications([
        { title: "AI in Preventive Healthcare", year: 2024 },
        { title: "Modern Health Research Overview", year: 2023 },
      ]);
    }
  }, [patient.condition]);

  // ⭐ Save favorite item
  const addFavorite = (item, type) => {
    const newFavs = [...favorites, { ...item, type }];
    setFavorites(newFavs);
    localStorage.setItem("favorites", JSON.stringify(newFavs));
    alert(`${item.title || item.name} added to Favorites!`);
  };

  // 🔍 Filter experts
  const filteredExperts = experts.filter(
    (e) =>
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.specialty.toLowerCase().includes(search.toLowerCase())
  );

  // 🗨️ Forum post submit
  const handleForumPost = () => {
    if (!newQuestion.trim()) return;
    const updated = forums.map((f) =>
      f.category === forumCategory
        ? { ...f, posts: [...f.posts, { question: newQuestion, replies: [] }] }
        : f
    );
    setForums(updated);
    setNewQuestion("");
  };

  // ✅ Add motion.div wrapper here for smooth page fade-in
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6 }}
      style={{ padding: "20px", textAlign: "center" }}
    >
      <h2>Welcome, {patient?.name || "Patient"} 👋</h2>
      <h3>Condition: {patient?.condition || "N/A"}</h3>
      <p style={{ color: "gray" }}>
        Personalized insights, experts, and community discussions.
      </p>

      {/* 🧪 Clinical Trials */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        style={{ marginTop: "40px" }}
      >
        <h3
          style={{
            display: "inline-block",
            backgroundColor: "#f0f8ff",
            border: "2px solid #A9A9A9",
            padding: "5px 170px",
            borderRadius: "5px",
          }}
        >
          🧪 <b>Recommended Clinical Trials</b>
        </h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {trials.map((t, i) => (
            <motion.li
              key={i}
              style={{ margin: "10px 0" }}
              whileHover={{ scale: 1.03 }}
            >
              {t.title} – <b>{t.status}</b>{" "}
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={() => addFavorite(t, "trial")}
              >
                ❤️ Save
              </motion.button>
            </motion.li>
          ))}
        </ul>
      </motion.section>

      {/* 📘 Publications */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        style={{ marginTop: "40px" }}
      >
        <h3
          style={{
            display: "inline-block",
            backgroundColor: "#f0f8ff",
            border: "2px solid #A9A9A9",
            padding: "5px 240px",
            borderRadius: "5px",
          }}
        >
          📘 <b>Publications</b>
        </h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {publications.map((p, i) => (
            <motion.li
              key={i}
              style={{ margin: "10px 0" }}
              whileHover={{ scale: 1.03 }}
            >
              {p.title} ({p.year}){" "}
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={() => addFavorite(p, "publication")}
              >
                ❤️ Save
              </motion.button>
            </motion.li>
          ))}
        </ul>
      </motion.section>

      {/* 👩‍⚕️ Experts */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        style={{ marginTop: "40px" }}
      >
        <h3
          style={{
            display: "inline-block",
            backgroundColor: "#f0f8ff",
            border: "2px solid #A9A9A9",
            padding: "5px 230px",
            borderRadius: "5px",
          }}
        >
          👩‍⚕️ Health Experts
        </h3>
        <div>
          <input
            placeholder="Search experts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "8px",
              width: "20%",
              borderRadius: "8px",
              border: "1px solid gray",
            }}
          />
        </div>
        <ul style={{ listStyle: "none", padding: 0, marginTop: "20px" }}>
          {filteredExperts.map((e, i) => (
            <motion.li
              key={i}
              style={{ marginBottom: "15px" }}
              whileHover={{ scale: 1.02 }}
            >
              <b>{e.name}</b> — {e.specialty}{" "}
              {e.active ? (
                <>
                  <button style={{ margin: "5px" }}>Follow</button>
                  <button style={{ margin: "5px" }}>Request Meeting</button>
                </>
              ) : (
                <button disabled style={{ opacity: 0.6 }}>
                  Inactive Expert
                </button>
              )}
              <button onClick={() => addFavorite(e, "expert")}>❤️ Save</button>
            </motion.li>
          ))}
        </ul>
      </motion.section>

      {/* 💬 Forums */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        style={{ marginTop: "60px" }}
      >
        <h3
          style={{
            display: "inline-block",
            backgroundColor: "#f0f8ff",
            border: "2px solid #A9A9A9",
            padding: "5px 210px",
            borderRadius: "5px",
          }}
        >
          💬 Community Forums
        </h3>
        <div>
          <select
            value={forumCategory}
            onChange={(e) => setForumCategory(e.target.value)}
            style={{
              padding: "8px",
              borderRadius: "8px",
              marginBottom: "10px",
            }}
          >
            <option>Cancer Research</option>
            <option>Clinical Trials Insights</option>
          </select>
        </div>
        <div>
          <input
            placeholder="Ask a question..."
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            style={{
              marginLeft: "5px",
              padding: "8px",
              width: "20%",
              borderRadius: "8px",
              border: "1px solid gray",
            }}
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={handleForumPost}
            style={{ marginLeft: "10px" }}
          >
            Post
          </motion.button>
        </div>

        <div
          style={{
            marginTop: "20px",
            textAlign: "left",
            display: "inline-block",
          }}
        >
          {forums
            .filter((f) => f.category === forumCategory)
            .map((f) =>
              f.posts.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    padding: "10px",
                    marginBottom: "10px",
                    width: "400px",
                  }}
                >
                  <b>Q:</b> {p.question}
                  <ul style={{ listStyle: "none", padding: "5px" }}>
                    {p.replies.map((r, j) => (
                      <li key={j}>
                        <b>{r.user}:</b> {r.text}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))
            )}
        </div>
      </motion.section>

      {/* 💖 Favorites */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        style={{ marginTop: "60px" }}
      >
        <h3
          style={{
            display: "inline-block",
            backgroundColor: "#f0f8ff",
            border: "2px solid #A9A9A9",
            padding: "5px 240px",
            borderRadius: "5px",
          }}
        >
          💖 My Favorites
        </h3>
        {favorites.length === 0 ? (
          <p>No favorites yet.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {favorites.map((f, i) => (
              <motion.li
                key={i}
                style={{ margin: "5px 0" }}
                whileHover={{ scale: 1.03 }}
              >
                {f.title || f.name} — <i>{f.type}</i>
              </motion.li>
            ))}
          </ul>
        )}
      </motion.section>

      {/* 🏠 Back */}
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
    </motion.div>
  );
}
