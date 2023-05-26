import React from "react";
import SIDEBAR from "../components/navbar/Sidebar.js";
import "../styles/Admin.css";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Admin() {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="d-flex flex-row justify-content-between">
        <div className="d-flex flex-column align-items-center justify-content-center option-square bg-white border border-secondary border-4 rounded">
          <a href="/AddProb" className="text-decoration-none">
            <h2 className="text-secondary">Add Problems</h2>
          </a>
        </div>
        <div className="d-flex flex-column align-items-center justify-content-center option-square bg-white border border-secondary border-4 rounded">
          <a href="/ProbDetails" className="text-decoration-none">
            <h2 className="text-secondary">Add Details</h2>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Admin;
