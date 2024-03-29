import React, { useState } from "react";
import "../styles/login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
          window.location.href = "./problemset";
          toast.success("Logged In", {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else
          toast.error("Wrong Credential!", {
            position: toast.POSITION.TOP_RIGHT,
          });
      });
  };

  //user Auth end

  return (
    <section>
      <div className="login-box">
        <h2>Login</h2>
        <form>
          <div className="user-box">
            <input
              type="number"
              name=""
              required=""
              placeholder="Student Id"
              value={StudentId}
              onChange={(e) => setStudentId(e.target.value)}
            />
          </div>
          <div className="user-box">
            <input
              type="password"
              name=""
              required=""
              placeholder="Password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p style={{ display: "flex", justifyContent: "center" }}>
            <a type="submit" onClick={handleSubmit} style={{ color: "white" }}>
              Submit
            </a>
          </p>
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
    </section>
  );
}

export default Login;
