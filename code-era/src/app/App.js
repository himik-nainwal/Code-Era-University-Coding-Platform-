import "../styles/App.css";
import RootNavbar from "../components/navbar/RootNavbar";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Problemset from "../pages/Problemset";
import Profile from "../pages/Profile";
import Admin from "../pages/Admin";
import Problem from "../pages/Problem";
import Login from "../pages/Login"

function App() {
  return (
    <>
      <RootNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/problemset" element={<Problemset />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/problem" element={<Problem />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
