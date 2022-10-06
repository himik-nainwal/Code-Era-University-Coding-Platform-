import "../styles/App.css";
import Navbar from "./../components/navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Problemset from "./Problemset";
import Profile from "./Profile";
import Admin from "./Admin";
import Problem from "./Problem";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/problemset" element={<Problemset />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/problem" element={<Problem />} />
      </Routes>
    </>
  );
}

export default App;
