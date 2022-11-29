import "../styles/App.css";
import RootNavbar from "../components/navbar/RootNavbar";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Problemset from "../pages/Problemset";
import Profile from "../pages/Profile";
import Admin from "../pages/Admin";
import Problem from "../pages/Problem";
import Login from "../pages/Login";
import Reset from "../pages/Reset";
import AddPro from "../components/admin/AddProb";
import { useState, useEffect } from "react";
function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      const token = window.localStorage.getItem("token");
      const fn = () => {
        const url = "http://localhost:5000/userData";
        fetch(url, {
          method: "POST",
          crossDomain: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            token,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            setUser(data.data);
          });
      };
      if (token) fn();
      else if (
        window.location.pathname !== "/login" &&
        window.location.pathname !== "/reset"
      )
        window.location.href = "/login";
    }

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      {localStorage.getItem("token") && <RootNavbar user={user} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/problemset" element={<Problemset />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/addprob" element={<AddPro/>}/>
        <Route path="/problem/:problemId" element={<Problem />} />
        {!localStorage.getItem("token") && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/reset" element={<Reset />} />
          </>
        )}
        <Route path="*" element={<h1>404</h1>} />
        {/* <Route path="/login" element={<Login />}/> */}
      </Routes>
    </>
  );
}

export default App;
