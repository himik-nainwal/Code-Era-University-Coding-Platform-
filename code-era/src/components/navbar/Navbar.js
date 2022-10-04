import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { BsPerson } from "react-icons/bs";

function navbar() {
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            Code Era
          </a>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link class="nav-link" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/problemset">
                  Problemset
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/admin">
                  Admin
                </Link>
              </li>
            </ul>
            <div class="dropdown">
              <button
                class="btn btn-success dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <BsPerson />
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li class="nav-item">
                  <Link class="nav-link" to="/profile">
                    Profile
                  </Link>
                </li>
                <li class="nav-item">Logout</li>
              </ul>
            </div>
          </div>
          {/* <h5 style={{ color: "white", paddingRight: "20px" }}>
            <BsPerson />
          </h5> */}
        </div>
      </nav>
    </>
  );
}

export default navbar;
