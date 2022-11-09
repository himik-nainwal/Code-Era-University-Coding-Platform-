import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/prob.css";
const Problemset = () => {
  const [problems, setProblems] = useState([]);
  const questionIds = [105];
  useEffect(() => {
    const fetchData = async () => {
      fetch(`http://localhost:5000/problems`)
        .then((res) => res.json())
        .then((res) => setProblems(res.data));
    };
    fetchData();
  }, []);
  return (
    // <app-navbar></app-navbar>
    <div class="box">
      <table class="table table-striped">
        <thead>
          <tr>
            <th class="header">ID</th>
            <th class="header">Title</th>
            <th class="header">Difficulty</th>
            <th class="header">Actions</th>
            <th class="header">View Problem</th>
          </tr>
        </thead>
        <tbody>
          {problems.map((problem, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{problem?.question_title}</td>
              <td>
                {problem?.difficulty_level === 1
                  ? "Easy"
                  : problem?.difficulty_level === 2
                  ? "Medium"
                  : "Hard"}
              </td>
              <td>
                {questionIds.includes(problem?.ques_id) ? "Solved" : "UnSolved"}
              </td>
              <td>
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/problem/${problem?.ques_id}`}
                >
                  View Problem
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Problemset;
