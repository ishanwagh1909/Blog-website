import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currUser) => {
      setUser(currUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <Router>
      <div style={styles.container}>
        <nav style={styles.nav}>
          <h1 style={styles.headerText}>📝 Firebase Blog</h1>
          <div>
            {user ? (
              <button onClick={handleLogout} style={styles.button}>Logout</button>
            ) : (
              <>
                <a href="/login" style={styles.link}>Login</a>
                <a href="/signup" style={styles.link}>Signup</a>
              </>
            )}
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/create" element={user ? <CreatePost user={user} /> : <Navigate to="/login" />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

const styles = {
  container: {
    fontFamily: "'Poppins', sans-serif",
    maxWidth: "900px",
    margin: "0 auto",
    padding: "2rem",
    background: "linear-gradient(to bottom right, #1e3c72, #2a5298, #9b4d96)", // Black, Blue, Pink gradient
    minHeight: "100vh",
    color: "#fff",
  },
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "3rem",
    padding: "1.5rem",
    background: "linear-gradient(to right, #1e3c72, #2a5298)", // Black to Blue gradient
    borderRadius: "15px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
    animation: "slideIn 1s ease",
  },
  headerText: {
    fontSize: "2.5rem",
    fontWeight: "800",
    color: "#fff",
    textTransform: "uppercase",
    letterSpacing: "2px",
    textShadow: "0 5px 15px rgba(0,0,0,0.3)",
    animation: "fadeIn 2s ease-in-out",
  },
  link: {
    marginLeft: "1rem",
    textDecoration: "none",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "1.1rem",
    transition: "color 0.3s ease",
  },
  button: {
    padding: "0.8rem 1.5rem",
    border: "none",
    borderRadius: "50px",
    backgroundColor: "#ff4d4f",
    color: "#fff",
    cursor: "pointer",
    fontSize: "1.1rem",
    boxShadow: "0 5px 15px rgba(255, 79, 79, 0.3)",
    transition: "transform 0.3s ease, background-color 0.3s ease",
    animation: "pulse 2s infinite",
  },
  buttonHover: {
    backgroundColor: "#ff1a1f",
    transform: "scale(1.05)",
  },
  '@keyframes fadeIn': {
    '0%': {
      opacity: '0',
      transform: 'translateY(20px)',
    },
    '100%': {
      opacity: '1',
      transform: 'translateY(0)',
    }
  },
  '@keyframes slideIn': {
    '0%': {
      opacity: '0',
      transform: 'translateX(-20px)',
    },
    '100%': {
      opacity: '1',
      transform: 'translateX(0)',
    }
  },
  '@keyframes pulse': {
    '0%': {
      transform: 'scale(1)',
    },
    '50%': {
      transform: 'scale(1.1)',
    },
    '100%': {
      transform: 'scale(1)',
    }
  }
};

export default App;
