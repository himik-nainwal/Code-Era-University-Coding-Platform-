import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Leaderboard.css";
const Leaderboard = () => {
  const [sblog, setSblog] = useState([]);
  const logonkiId = [];
  useEffect(() => {
    const fetchData = async () => {
      fetch("http://localhost:5000/usermeta")
        .then((res) => res.json())
        .then((res) => setSblog(res.data));
    };
    fetchData();
  }, []);
  // Lets do some sorting according to score in Descending Order .
  function compare(a, b) {
    if (a.score > b.score) {
      return -1;
    }
    if (a.score < b.score) {
      return 1;
    }
    return 0;
  }

  sblog.sort(compare);
  console.log(sblog);
  return (
    <div className="board bodycolor">
      <div class="">
        <div class="box">
          <table class="table table-striped">
            <thead>
              <tr>
                <th class="header">Rank</th>
                <th class="header">Name</th>
                <th class="header">Score</th>
                <th class="header">Username</th>
                {/* <th class="header">Profile</th> */}
              </tr>
            </thead>
            <tbody>
              {sblog.map((profile, key) => (
                <tr key={key}>
                  {/* <td>{key + 1}</td> */}
                  <td>{key + 1}</td>
                  <td>
                    <a
                      href={`/oprofile/${profile?.student_id}`}
                      className="link-unstyled"
                      target="_blank"
                    >
                      {profile.fname + " " + profile.lname}
                    </a>
                  </td>
                  <td>{profile.score}</td>
                  <td>
                    <a
                      href={`/oprofile/${profile?.student_id}`}
                      className="link-unstyled"
                      target="_blank"
                    >
                      {profile.userName}
                    </a>
                  </td>
                  {/* <td>
                    <Link
                      style={{ textDecoration: "none", color: "black" }}
                      to={`/oprofile/${profile?.student_id}`}
                    >
                      Open Profile
                    </Link>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
