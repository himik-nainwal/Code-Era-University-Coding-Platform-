import React, { useState, useEffect } from "react";
import "../styles/Profile.css";
import { FaLinkedin } from "react-icons/fa";
import { SiCodeforces, SiLeetcode, SiCodechef, SiGithub } from "react-icons/si";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Leaderboard from "./Leaderboard";
// import userImage from "../assets/no_image.jpg";
import TableCard from "../components/TableCard";
import RecentQuestion from "../components/RecentQuestion";

function Profile() {
  const [studentId, setStudentId] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [ph_no, setPh_no] = useState(0);
  const [userName, setUserName] = useState("");
  const [totalQ, setTotalQ] = useState(0);
  const [easyQ, setEasyQ] = useState(0);
  const [mediumQ, setMediumQ] = useState(0);
  const [hardQ, setHardQ] = useState(0);
  const [github, setGithub] = useState("");
  const [image, setImage] = useState("");
  const [role, setRole] = useState("");
  const [userdata, setUserdata] = useState("");
  const [codeforces, setCodeforces] = useState("");
  const [codechef, setCodechef] = useState("");
  const [leetcode, setLeetcode] = useState("");
  const [course, setCourse] = useState("");
  const [passing_out_year, setPassing_out_year] = useState(0);
  const [linkedin, setLinkedin] = useState("");
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [university, setUniversity] = useState("");
  const [code, setCode] = useState([]);

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
            setUserdata(data);
            setFname(data.data.fname);
            setRole(data.data.role);
            setCourse(data.data.course);
            setPassing_out_year(data.data.passing_out_year);
            setLinkedin(data.data.linkedin);
            setUniversity(data.data.university);
            setLeetcode(data.data.leetcode);
            setPh_no(data.data.ph_no);
            setTotalQ(data.data.totalQ);
            setUserName(data.data.userName);
            setStudentId(data.data.student_id);
            setLname(data.data.lname);
            setEmail(data.data.email);
            setCodechef(data.data.codechef);
            setCodeforces(data.data.codeforces);
            setEasyQ(data.data.easyQ);
            setMediumQ(data.data.mediumQ);
            setGithub(data.data.github);
            setHardQ(data.data.hardQ);
            setScore(data.data.score);
            setImage(data.data.image);
            // const codeArrayJson = JSON.stringify(data.data.code);
            setCode(data.data.code);
          });
      };
      fn();
    }

    return () => {
      mounted = false;
    };
  }, []);

  console.log("code" + code);

  return (
    <>
      <div className="big-box">
        <div class="container-fluid pt-5" style={{ height: "100%" }}>
          <div class="row no-gutters">
            <div class="col-md-4 col-lg-4">
              <img className="img" src={image} />
            </div>

            <div class="col-md-8 col-lg-8">
              <div class="d-flex flex-column">
                <div style={{ background: "#243b55" }}>
                  <div class="d-flex flex-row justify-content-between align-items-center pt-5 px-5 text-white">
                    <h3 class="display-5">
                      {fname} {lname}
                    </h3>
                    <a href={linkedin}>
                      <FaLinkedin style={{ color: "white" }} />
                    </a>
                    <a href={codeforces}>
                      <SiCodeforces style={{ color: "white" }} />
                    </a>
                    <a href={codechef}>
                      <SiCodechef style={{ color: "white" }} />
                    </a>
                    <a href={leetcode}>
                      <SiLeetcode style={{ color: "white" }} />
                    </a>
                    <a href={github}>
                      <SiGithub style={{ color: "white" }} />
                    </a>
                  </div>
                </div>
                <div style={{ background: "#243b55" }}>
                  <div
                    class="d-flex flex-row justify-content-between align-items-center px-5"
                    style={{ color: "#9EA1A5" }}
                  >
                    Username: {userName}
                  </div>
                  <div
                    class="d-flex flex-row justify-content-between align-items-center px-5"
                    style={{ color: "#9EA1A5" }}
                  >
                    <p class="display-9">
                      University: {university} ({course} {passing_out_year})
                    </p>
                    {/* <p>Batch: {passing_out_year}</p> */}
                  </div>
                </div>
                <div class="px-5 pt-3 pb-3 bg-black text-white">
                  <h3>University Rank: 1</h3>
                  <h6>Score: {score}</h6>
                </div>
                <div class="d-flex flex-row text-white">
                  <div class="p-4 bg-primary text-center skill-block">
                    <h4>{totalQ}</h4>
                    <h6>Problems Solved</h6>
                  </div>
                  <div class="p-3 bg-success text-center skill-block">
                    <h4>{easyQ}</h4>
                    <h6>Easy</h6>
                  </div>
                  <div class="p-3 bg-warning text-center skill-block">
                    <h4>{mediumQ}</h4>
                    <h6>Medium</h6>
                  </div>
                  <div class="p-3 bg-danger text-center skill-block">
                    <h4>{hardQ}</h4>
                    <h6>Hard</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex flex-row justify-content-around">
            <div
              className="col-md-5 float-left mt-5 card"
              style={{ height: "fit-content" }}
            >
              <TableCard />
            </div>
            <div
              className="col-md-5 float-right mt-5 card"
              style={{ height: "fit-content" }}
            >
              <RecentQuestion code={code} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
