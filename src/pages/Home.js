import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, onSnapshot, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { Link } from "react-router-dom";

const Home = ({ user }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      await deleteDoc(doc(db, "posts", id));
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        {user ? (
          <h2 style={styles.welcome}>Welcome, <span style={styles.highlight}>{user.email}</span></h2>
        ) : (
          <h2 style={styles.welcome}>Welcome to <span style={styles.highlight}>Firebase Blog</span> ✨ Please log in to create or manage posts.</h2>
        )}
      </div>

      <div style={{ marginBottom: "2.5rem", textAlign: "center" }}>
        {user && (
          <Link to="/create" style={styles.createButton}>
            ➕ Write Something Beautiful
          </Link>
        )}
      </div>

      <div>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} style={styles.card}>
              <h3 style={styles.title}>{post.title}</h3>
              <p style={styles.content}>{post.content}</p>
              <p style={styles.meta}>✍️ {post.authorEmail}</p>
              {auth.currentUser?.uid === post.authorId && (
                <button onClick={() => handleDelete(post.id)} style={styles.deleteButton}>
                  🗑️ Delete
                </button>
              )}
            </div>
          ))
        ) : (
          <p style={styles.noPosts}>Nothing here yet... 💭</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "880px",
    margin: "0 auto",
    padding: "3rem 2rem",
    fontFamily: "'Poppins', sans-serif",
    color: "#fefefe",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #1c1c1c, #2e2e2e)",
    backdropFilter: "blur(8px)",
  },
  header: {
    textAlign: "center",
    marginBottom: "2.5rem",
  },
  welcome: {
    fontSize: "1.8rem",
    fontWeight: "500",
    lineHeight: "1.4",
  },
  highlight: {
    color: "#ffb6c1",
    fontWeight: "700",
  },
  card: {
    background: "rgba(255, 255, 255, 0.06)",
    borderRadius: "20px",
    padding: "2rem",
    marginBottom: "2rem",
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.3)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.08)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  title: {
    fontSize: "1.6rem",
    fontWeight: "600",
    marginBottom: "1rem",
    color: "#ffffff",
  },
  content: {
    fontSize: "1.1rem",
    color: "#e0e0e0",
    lineHeight: "1.7",
    marginBottom: "1rem",
  },
  meta: {
    fontSize: "0.9rem",
    color: "#aaa",
    textTransform: "uppercase",
    letterSpacing: "1px",
    marginTop: "1rem",
  },
  deleteButton: {
    marginTop: "1.5rem",
    backgroundColor: "#ff5e7e",
    border: "none",
    color: "#fff",
    padding: "0.7rem 1.4rem",
    borderRadius: "30px",
    fontSize: "0.95rem",
    fontWeight: "500",
    cursor: "pointer",
    boxShadow: "0 6px 18px rgba(255, 94, 126, 0.4)",
    transition: "all 0.25s ease-in-out",
  },
  createButton: {
    backgroundColor: "#6dd5ed",
    backgroundImage: "linear-gradient(to right, #2193b0, #6dd5ed)",
    color: "#fff",
    padding: "1rem 2.5rem",
    borderRadius: "50px",
    fontSize: "1.1rem",
    fontWeight: "600",
    textDecoration: "none",
    boxShadow: "0 10px 30px rgba(109, 213, 237, 0.4)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  noPosts: {
    textAlign: "center",
    fontSize: "1.2rem",
    color: "#ccc",
    marginTop: "3rem",
  },
};

export default Home;
