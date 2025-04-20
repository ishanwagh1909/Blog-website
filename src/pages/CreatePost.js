import React, { useState } from "react";
import { db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const CreatePost = ({ user }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await addDoc(collection(db, "posts"), {
        title,
        content,
        authorId: user.uid,
        authorEmail: user.email,
        createdAt: serverTimestamp(),
      });
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📝 Create a New Post</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Give it a sweet title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={styles.input}
        />
        <textarea
          placeholder="Write your heart out..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={6}
          style={{ ...styles.input, ...styles.textarea }}
        />
        <button type="submit" style={styles.button}>✨ Publish</button>
        {error && <p style={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "4rem auto",
    padding: "3rem",
    background: "rgba(255, 255, 255, 0.05)",
    borderRadius: "20px",
    backdropFilter: "blur(10px)",
    boxShadow: "0 12px 40px rgba(0,0,0,0.2)",
    fontFamily: "'Poppins', sans-serif",
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.08)",
    backgroundImage: "linear-gradient(135deg, #2c3e50, #4ca1af)",
  },
  heading: {
    fontSize: "2rem",
    fontWeight: "600",
    textAlign: "center",
    marginBottom: "2rem",
    color: "#ffffff",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
  input: {
    padding: "1rem",
    borderRadius: "12px",
    border: "none",
    fontSize: "1.05rem",
    fontWeight: "500",
    background: "rgba(255, 255, 255, 0.1)",
    color: "#fff",
    outline: "none",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  textarea: {
    minHeight: "150px",
    resize: "vertical",
  },
  button: {
    padding: "1rem",
    borderRadius: "30px",
    backgroundImage: "linear-gradient(to right, #ff6a88, #ff99ac)",
    color: "#fff",
    fontSize: "1.1rem",
    fontWeight: "600",
    border: "none",
    cursor: "pointer",
    boxShadow: "0 6px 20px rgba(255,105,135,0.3)",
    transition: "transform 0.2s ease, box-shadow 0.3s ease",
  },
  error: {
    color: "#ffb6b6",
    textAlign: "center",
    marginTop: "-1rem",
    fontSize: "0.95rem",
  },
};

export default CreatePost;
