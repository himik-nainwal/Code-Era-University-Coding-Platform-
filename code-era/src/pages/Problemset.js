import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/prob.css";
import Leaderboard from "./Leaderboard";
import { BsBoxArrowInRight } from "react-icons/bs";
import DropdownMenu from "../components/dropdown/DropdownMenu";

function compare(a, b) {
    return a.ques_id - b.ques_id;
  }

const Problemset = () => {
  const [problems, setProblems] = useState([]);
  const [questionIds, setQuestionIds] = useState([]);
  const [startPgNo, setStartPgNo] = useState(1);
  const [endPgNo, setEndPgNo] = useState(15);

  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      fetch(`http://localhost:5000/problems`)
        .then((res) => res.json())
      .then(res => res.data)
      .then(res => res.sort(compare))
        // .then(res=> console.log(res))
        .then((res) => setProblems(res));
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
  // function compare(a, b) {
  //   if (`a.${selectedOption}` < b.difficulty_level) {
  //     return -1;
  //   }
  //   if (`a.${selectedOption}` > b.difficulty_level) {
  //     return 1;
  //   }
  //   return 0;
  // }

  // const handleOptionSelected = (option) => {
  //   setSelectedOption(option);
  //   const sorted = [...problems].sort((a, b) => {
  //     const aLevel = a.difficulty_level;
  //     const bLevel = b.difficulty_level;
  //     if (option === "Easy") {
  //       return aLevel - bLevel;
  //     } else if (option === "Medium") {
  //       return Math.abs(2 - aLevel) - Math.abs(2 - bLevel);
  //     } else if (option === "Hard") {
  //       return bLevel - aLevel;
  //     } else {
  //       return 0;
  //     }
  //   });
  //   setSortedQuestions(sorted);
  // };

  // const getDifficultyLevel = (level) => {
  //   switch (level) {
  //     case 1:
  //       return 1;
  //     case 2:
  //       return 2;
  //     case 3:
  //       return 3;
  //     default:
  //       return 0;
  //   }
  // };

  return (
    <>
      <div
        className="d-flex justify-content-center px-4"
        style={{ background: "#141e30" }}
      >
        {/* <DropdownMenu onOptionSelected={handleOptionSelected} /> */}
        <h1 className="text-white h1 pt-3">All Problems</h1>
      </div>
      <div>
        {problems.length ? (
          <div class="big-box">
            <div class="box">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th class="header">Qusetion</th>
                    <th class="header">Title</th>
                    <th class="header">Difficulty</th>
                    <th class="header">Actions</th>
                    {/* <th class="header">View Problem</th> */}
                    {/* <button class="header">Sort</button> */}
                  </tr>
                </thead>
                <tbody>
                  {problems.slice(startPgNo, endPgNo + 1).map((problem, i) => (
                    <tr key={i}>
                      <td className="text-start">
                        <a
                          href={`/problem/${problem?.ques_id}`}
                          className="link-unstyled"
                          target="_blank"
                        >
                          {i + 1}
                        </a>
                      </td>
                      <td className="text-start">
                        <a
                          href={`/problem/${problem?.ques_id}`}
                          className="link-unstyled"
                          target="_blank"
                        >
                          {problem?.question_title}
                        </a>
                      </td>
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
                        <a
                          href={`/problem/${problem?.ques_id}`}
                          className="link-unstyled"
                          target="_blank"
                        >
                          {questionIds.includes(problem?.ques_id)
                            ? "Solved"
                            : "Unsolved"}
                        </a>
                      </td>
                      {/* <td>
                        <Link
                          style={{ textDecoration: "none", color: "black" }}
                          to={`/problem/${problem?.ques_id}`}
                        >
                          View Problem
                          <BsBoxArrowInRight className="ms-2" />
                        </Link>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="row">
                <div className="col-12 d-flex justify-content-end">
                  <div className="col-2">
                    <button
                      className="btn btn-sm m-2"
                      style={{ backgroundColor: "#141e30", color: "white" }}
                      disabled={startPgNo === 1}
                      onClick={() => {
                        setStartPgNo(startPgNo - 15);
                        setEndPgNo(endPgNo - 15);
                      }}
                    >
                      Prev
                    </button>
                    <button
                      className="btn btn-sm"
                      style={{ backgroundColor: "#141e30", color: "white" }}
                      disabled={startPgNo + 15 > problems.length}
                      onClick={() => {
                        setStartPgNo(startPgNo + 15);
                        setEndPgNo(endPgNo + 15);
                      }}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            class="text-center big-box"
            style={{ display: "block", width: "100%", height: "100%" }}
          >
            <div
              class="spinner-border"
              role="status"
              style={{ color: "white" }}
            >
              {/* <span class="sr-only" style={{ color: "white" }}>
              Loading...
            </span> */}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Problemset;
