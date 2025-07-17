import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [inputValue, setInputValue] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { username, email, password } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:3002/signup",
        { username, email, password },
        { withCredentials: true }
      );

      if (data.success) {
        alert(data.message);
        window.location.href = "http://localhost:5173";
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#f0f2f5",
      fontFamily: "Arial, sans-serif",
    },
    formBox: {
      backgroundColor: "#fff",
      padding: "30px",
      borderRadius: "10px",
      boxShadow: "0 0 15px rgba(0,0,0,0.1)",
      width: "100%",
      maxWidth: "400px",
    },
    title: {
      textAlign: "center",
      marginBottom: "20px",
      color: "#333",
    },
    inputGroup: {
      marginBottom: "15px",
    },
    label: {
      display: "block",
      marginBottom: "5px",
      fontWeight: "bold",
    },
    input: {
      width: "100%",
      padding: "10px",
      borderRadius: "5px",
      border: "1px solid #ccc",
    },
    button: {
      width: "100%",
      padding: "10px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "16px",
    },
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.formBox}>
        <h1 style={styles.title}>Create Account</h1>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleOnChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleOnChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleOnChange}
            style={styles.input}
            required
          />
        </div>

        <button type="submit" style={styles.button}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
