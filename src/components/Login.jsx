import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
// import "./Login.css";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading]);

  return (
    <div
      className="app"
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        paddingTop: "3rem",

        height: "900px",
      }}
    >
      <div
        className=""
        style={{ alignContent: "center", justifyContent: "center" }}
      >
        <div
          className=""
          style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <h1>Weather App Login</h1>
        </div>
        <input
          type="text"
          className=""
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className=""
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className=""
          onClick={() => logInWithEmailAndPassword(email, password)}
        >
          Login
        </button>
        {/* <div>
          <Link to="/reset">Forgot Password</Link>
        </div> */}
        {/* <div>
          Don't have an account? <Link to="/register">Register</Link> now.
        </div> */}
      </div>
    </div>
  );
}
export default Login;
