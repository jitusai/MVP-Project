import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function ResearcherDashboard() {
  const navigate = useNavigate();
  const researcher = JSON.parse(localStorage.getItem("researcherData"));

  // --------------------- Collaborators ---------------------
  const [search, setSearch] = useState("");
  const [collaborators, setCollaborators] = useState([
    {
      name: "Dr. Kavya Mehta",
      field: "Oncology",
      interests: "Immunotherapy, Cancer Genomics",
      publications: 12,
    },
    {
      name: "Dr. Rahul Menon",
      field: "AI in Medicine",
      interests: "Clinical AI, Predictive Diagnostics",
      publications: 8,
    },
    {
      name: "Dr. Sneha Verma",
      field: "Neurology",
      interests: "Brain Imaging, Neuro AI",
      publications: 5,
    },
  ]);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("researcherFavorites")) || []
  );

  const filteredCollaborators = collaborators.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.field.toLowerCase().includes(search.toLowerCase()) ||
      c.interests.toLowerCase().includes(search.toLowerCase())
  );

  const handleFavorite = (item, type) => {
    const newFavs = [...favorites, { ...item, type }];
    setFavorites(newFavs);
    localStorage.setItem("researcherFavorites", JSON.stringify(newFavs));
  };

  // --------------------- Clinical Trials ---------------------
  const [trials, setTrials] = useState([
    {
      title: "Gene Therapy in Glioma",
      phase: "Phase III",
      status: "Recruiting",
      description: "Exploring gene therapy efficacy for glioma patients.",
      eligibility: "Adults aged 18–65",
    },
    {
      title: "AI-Based Diagnosis Study",
      phase: "Phase I",
      status: "Ongoing",
      description: "Developing AI tools for early disease detection.",
      eligibility: "Open for medical institutions",
    },
  ]);

  const [newTrial, setNewTrial] = useState({
    title: "",
    phase: "",
    status: "",
    description: "",
    eligibility: "",
  });

  const addTrial = () => {
    if (!newTrial.title || !newTrial.phase)
      return alert("Please fill all fields");
    const updated = [...trials, newTrial];
    setTrials(updated);
    setNewTrial({
      title: "",
      phase: "",
      status: "",
      description: "",
      eligibility: "",
    });
  };

  // --------------------- Forums ---------------------
  const [forumPosts, setForumPosts] = useState([
    {
      topic: "AI in Cancer Diagnosis",
      author: "Dr. Kavya Mehta",
      replies: ["Promising results in clinical prediction models!"],
    },
  ]);
  const [newPost, setNewPost] = useState("");
  const [newReply, setNewReply] = useState("");

  const addPost = () => {
    if (!newPost.trim()) return;
    setForumPosts([
      ...forumPosts,
      { topic: newPost, author: researcher.name, replies: [] },
    ]);
    setNewPost("");
  };

  const addReply = (index) => {
    if (!newReply.trim()) return;
    const updated = [...forumPosts];
    updated[index].replies.push(newReply);
    setForumPosts(updated);
    setNewReply("");
  };

  // --------------------- Animations ---------------------
  const sectionVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const itemVariant = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  };

  // --------------------- UI Rendering ---------------------
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={sectionVariant}
      style={{ padding: "20px", fontFamily: "sans-serif" }}
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Welcome, Dr. {researcher?.name || "Researcher"} 👋
      </motion.h2>
      <h3>Specialty: {researcher?.specialty}</h3>
      <h4>Interests: {researcher?.interests}</h4>

      {/* ---------------- Collaborators Section ---------------- */}
      <motion.section
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        style={{ marginTop: "40px" }}
      >
        <h2
          style={{
            display: "inline-block",
            backgroundColor: "#f0f8ff",
            border: "2px solid #A9A9A9",
            padding: "5px",
            borderRadius: "5px",
          }}
        >
          🌍 <b>Collaborators</b>
        </h2>
        <div>
          <textarea
            placeholder="Search collaborators..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "18px",
              width: "60%",
              border: "1px solid gray",
            }}
          />
        </div>
        <ul style={{ listStyle: "none", padding: 0, marginTop: "20px" }}>
          {filteredCollaborators.map((c, i) => (
            <motion.li
              key={i}
              variants={itemVariant}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.02 }}
              style={{
                marginBottom: "15px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "10px",
                backgroundColor: "#fff",
                boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
              }}
            >
              <b>{c.name}</b> — {c.field} <br />
              <small>
                Interests: {c.interests} | Publications: {c.publications}
              </small>
              <br />
              <motion.button
                whileHover={{ scale: 1.1 }}
                style={{ margin: "5px" }}
              >
                Connect
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                style={{ margin: "5px" }}
              >
                Chat
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                style={{ margin: "5px" }}
                onClick={() => handleFavorite(c, "collaborator")}
              >
                ⭐ Favorite
              </motion.button>
            </motion.li>
          ))}
        </ul>
      </motion.section>

      {/* ---------------- Clinical Trials Section ---------------- */}
      <motion.section
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        style={{ marginTop: "40px" }}
      >
        <h2
          style={{
            display: "inline-block",
            backgroundColor: "#f0f8ff",
            border: "2px solid #A9A9A9",
            padding: "5px",
            borderRadius: "5px",
          }}
        >
          🧪 Manage Clinical Trials
        </h2>
        <h4>Add New Trial</h4>
        <input
          placeholder="Title"
          value={newTrial.title}
          onChange={(e) => setNewTrial({ ...newTrial, title: e.target.value })}
        />
        <input
          placeholder="Phase"
          value={newTrial.phase}
          onChange={(e) => setNewTrial({ ...newTrial, phase: e.target.value })}
        />
        <input
          placeholder="Status"
          value={newTrial.status}
          onChange={(e) => setNewTrial({ ...newTrial, status: e.target.value })}
        />
        <input
          placeholder="Eligibility"
          value={newTrial.eligibility}
          onChange={(e) =>
            setNewTrial({ ...newTrial, eligibility: e.target.value })
          }
        />
        <br />
        <textarea
          placeholder="Description"
          value={newTrial.description}
          onChange={(e) =>
            setNewTrial({ ...newTrial, description: e.target.value })
          }
          style={{ width: "60%", height: "60px", marginTop: "10px" }}
        />
        <br />
        <motion.button
          whileHover={{ scale: 1.1 }}
          style={{ marginTop: "10px" }}
          onClick={addTrial}
        >
          ➕ Add Trial
        </motion.button>

        <ul style={{ listStyle: "none", padding: 0, marginTop: "20px" }}>
          {trials.map((t, i) => (
            <motion.li
              key={i}
              variants={itemVariant}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.02 }}
              style={{
                marginBottom: "10px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "10px",
                backgroundColor: "#fff",
                boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
              }}
            >
              <b>{t.title}</b> ({t.phase}) — {t.status}
              <br />
              <small>Eligibility: {t.eligibility}</small>
              <p>{t.description}</p>
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={() => handleFavorite(t, "trial")}
              >
                ⭐ Favorite
              </motion.button>
            </motion.li>
          ))}
        </ul>
      </motion.section>

      {/* ---------------- Forums Section ---------------- */}
      <motion.section
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        style={{ marginTop: "40px" }}
      >
        <h2
          style={{
            display: "inline-block",
            backgroundColor: "#f0f8ff",
            border: "2px solid #A9A9A9",
            padding: "5px",
            borderRadius: "5px",
          }}
        >
          💬 Forums
        </h2>
        <div style={{ marginLeft: "5px" }}>
          <textarea
            placeholder="Start a new discussion..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            style={{ width: "60%", height: "60px" }}
          />
        </div>
        <br />
        <motion.button whileHover={{ scale: 1.1 }} onClick={addPost}>
          Post Discussion
        </motion.button>

        <ul style={{ listStyle: "none", padding: 0, marginTop: "20px" }}>
          {forumPosts.map((post, i) => (
            <motion.li
              key={i}
              variants={itemVariant}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.02 }}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "8px",
                marginBottom: "10px",
                backgroundColor: "#fff",
              }}
            >
              <b>{post.topic}</b> — by {post.author}
              <ul>
                {post.replies.map((r, j) => (
                  <li key={j}>{r}</li>
                ))}
              </ul>
              <input
                placeholder="Add a reply..."
                value={newReply}
                onChange={(e) => setNewReply(e.target.value)}
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={() => addReply(i)}
              >
                Reply
              </motion.button>
            </motion.li>
          ))}
        </ul>
      </motion.section>

      {/* ---------------- Favorites Section ---------------- */}
      <motion.section
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        style={{ marginTop: "40px" }}
      >
        <h2
          style={{
            display: "inline-block",
            backgroundColor: "#f0f8ff",
            border: "2px solid #A9A9A9",
            padding: "5px",
            borderRadius: "5px",
          }}
        >
          ⭐ My Favorites
        </h2>
        {favorites.length === 0 ? (
          <p>No favorites saved yet.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {favorites.map((f, i) => (
              <motion.li
                key={i}
                variants={itemVariant}
                initial="hidden"
                animate="visible"
              >
                {f.type === "trial" ? "🧪" : "👨‍⚕️"} {f.title || f.name}
              </motion.li>
            ))}
          </ul>
        )}
      </motion.section>

      {/* ---------------- Back Button ---------------- */}
      <motion.button
        whileHover={{ scale: 1.1 }}
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
