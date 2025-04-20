import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🔐 Create Your Account</h2>
      <form onSubmit={handleSignup} style={styles.form}>
        <input
          type="email"
          placeholder="Enter your email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Create a secure password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>✨ Sign Up</button>
        {error && <p style={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "420px",
    margin: "4rem auto",
    padding: "3rem",
    background: "rgba(255, 255, 255, 0.06)",
    backdropFilter: "blur(10px)",
    borderRadius: "20px",
    border: "1px solid rgba(255,255,255,0.1)",
    boxShadow: "0 10px 40px rgba(0,0,0,0.25)",
    fontFamily: "'Poppins', sans-serif",
    color: "#fff",
    backgroundImage: "linear-gradient(to bottom right, #667eea, #764ba2)",
  },
  heading: {
    fontSize: "1.8rem",
    fontWeight: "600",
    textAlign: "center",
    marginBottom: "2rem",
    color: "#fff",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1.2rem",
  },
  input: {
    padding: "1rem",
    borderRadius: "12px",
    border: "none",
    background: "rgba(255,255,255,0.1)",
    color: "#fff",
    fontSize: "1rem",
    fontWeight: "500",
    outline: "none",
    boxShadow: "inset 0 0 10px rgba(0,0,0,0.1)",
    transition: "all 0.3s ease",
  },
  button: {
    padding: "1rem",
    borderRadius: "30px",
    backgroundImage: "linear-gradient(to right, #00c6ff, #0072ff)",
    color: "#fff",
    fontSize: "1.1rem",
    fontWeight: "600",
    border: "none",
    cursor: "pointer",
    boxShadow: "0 6px 20px rgba(0, 114, 255, 0.3)",
    transition: "transform 0.2s ease, box-shadow 0.3s ease",
  },
  error: {
    color: "#ffc0cb",
    fontSize: "0.95rem",
    textAlign: "center",
    marginTop: "-0.5rem",
  },
};

export default Signup;
