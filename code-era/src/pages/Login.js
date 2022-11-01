import React, { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [passw, setPassw] = useState("");
  return (
    <div>
      <form action="" onSubmit={() => {}}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="passw">Password</label>
          <input
            type="text"
            name="passw"
            id="passw"
            value={passw}
            onChange={(e) => setPassw(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
