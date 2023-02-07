import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/prob.css";
import Leaderboard from "./Leaderboard";
import { BsBoxArrowInRight } from "react-icons/bs";

const Problemset = () => {
  const [problems, setProblems] = useState([]);
  const [questionIds , setQuestionIds] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      fetch(`http://localhost:5000/problems`)
        .then((res) => res.json())
        .then((res) => setProblems(res.data));
        
    };
    fetchData();
  }, []);
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      const fn = () => {
        const url = "http://localhost:5000/userData";
        const data = fetch(url, {
          method: "POST",
          crossDomain: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            token: window.localStorage.getItem("token"),
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            setQuestionIds(data.data.questionIds);
            
          });
      };
      fn();
    }

    return () => {
      mounted = false;
    };
  }, []);

  //sorting questions
  function compare(a, b) {
    if (a.ques_id < b.ques_id) {
      return -1;
    }
    if (a.ques_id > b.ques_id) {
      return 1;
    }
    return 0;
  }

  problems.sort(compare);
  return (
    <>
      {problems.length ? (
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
      ) : (
        <div
          class="text-center big-box"
          style={{ display: "block", width: "100%", height: "100%" }}
        >
          <div class="spinner-border" role="status" style={{ color: "white" }}>
            {/* <span class="sr-only" style={{ color: "white" }}>
              Loading...
            </span> */}
          </div>
        </div>
      )}
    </>
  );
};

export default Problemset;
