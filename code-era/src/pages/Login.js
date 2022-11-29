import React, { useState } from "react";
import "../styles/login.css";

function Login() {
  const [StudentId, setStudentId] = useState("");
  const [Password, setPassword] = useState("");

  //user Auth start

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/login-user", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        student_id: StudentId,
        password: Password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if (data.status === "ok") {
          window.localStorage.setItem("token", data.data);
          window.location.href = "./profile";
        }
      });
  };

  //user Auth end

  return (
    <div class="login-box">
      <h2>Login</h2>
      <form>
        <div class="user-box">
          <input
            type="text"
            name=""
            required=""
            placeholder="Student Id"
            value={StudentId}
            onChange={(e) => setStudentId(e.target.value)}
          />
        </div>
        <div class="user-box">
          <input
            type="password"
            name=""
            required=""
            placeholder="Password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <a type="submit" onClick={handleSubmit} style={{ color: "white" }}>
            Submit
          </a>
        </div>
        <p style={{ display: "flex", justifyContent: "center" }}>
          <a
            href="/reset"
            style={{
              color: "white",
            }}
          >
            Forgot password?
          </a>
        </p>
      </form>
    </div>
  );
}

export default Login;
