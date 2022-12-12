import React, { useState, useEffect } from "react";
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

  // Lets do some sorting according to score Descending Order .
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
    <div className="board">
      <div class="big-box">
        <div class="box">
          <table class="table table-striped">
            <thead>
              <tr>
                <th class="header">ID</th>
                <th class="header">Name</th>
                <th class="header">Username</th>
                <th class="header">Score</th>
              </tr>
            </thead>
            <tbody>
              {sblog.map((profile, key) => (
                <tr>
                  <td>{key + 1}</td>
                  <td>{profile.fname + " " + profile.lname}</td>
                  <td>{profile.userName}</td>
                  <td>{profile.score}</td>
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
