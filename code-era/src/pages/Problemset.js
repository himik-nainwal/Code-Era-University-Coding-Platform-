import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/prob.css";
import { BsBoxArrowInRight } from "react-icons/bs";

const Problemset = () => {
  const [problems, setProblems] = useState([]);
  const questionIds = [];
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
    <div class="big-box">
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
                <td
                  className={
                    problem?.difficulty_level === 1
                      ? "Easy"
                      : problem?.difficulty_level === 2
                      ? "Medium"
                      : "Hard"
                  }
                >
                  {problem?.difficulty_level === 1
                    ? "Easy"
                    : problem?.difficulty_level === 2
                    ? "Medium"
                    : "Hard"}
                </td>
                <td
                  className={
                    questionIds.includes(problem?.ques_id)
                      ? "Solved"
                      : "Unsolved"
                  }
                >
                  {questionIds.includes(problem?.ques_id)
                    ? "Solved"
                    : "Unsolved"}
                </td>
                <td>
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    to={`/problem/${problem?.ques_id}`}
                  >
                    View Problem
                    <BsBoxArrowInRight className="ms-2" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Problemset;
