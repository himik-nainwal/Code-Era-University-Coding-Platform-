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
import { useParams } from "react-router-dom";
function Oprofile() {
const [details,setDetails] = useState(null);
  const { studentid } = useParams();
//  console.log(studentid);
//   const [studentId, setStudentId] = useState("");
  
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
  

  useEffect(()=>{
    const fetchData =async ()=>{
        fetch(`http://localhost:5000/oprofile/${studentid}`,{
            method: "GET",
        })
        .then((res) => res.json())
        .then((res) => setDetails(res.data));
        // .then((res)=>console.log(res));
    };
    fetchData();
  },[] );
// console.log(details);
  return (
    <>
      <div className="big-box">
        <div class="container-fluid pt-5" style={{ height: "100vh" }}>
          <div class="row no-gutters">
            <div class="col-md-4 col-lg-4">
              <img className="img" src={details?.image} />
            </div>

            <div class="col-md-8 col-lg-8">
              <div class="d-flex flex-column">
                <div style={{ background: "#243b55" }}>
                  <div class="d-flex flex-row justify-content-between align-items-center pt-5 px-5 text-white">
                    <h3 class="display-5">
                      {details?.fname} {details?.lname}
                    </h3>
                    <a href={details?.linkedin}>
                      <FaLinkedin style={{ color: "white" }} />
                    </a>
                    <a href={details?.codeforces}>
                      <SiCodeforces style={{ color: "white" }} />
                    </a>
                    <a href={details?.codechef}>
                      <SiCodechef style={{ color: "white" }} />
                    </a>
                    <a href={details?.leetcode}>
                      <SiLeetcode style={{ color: "white" }} />
                    </a>
                    <a href={details?.github}>
                      <SiGithub style={{ color: "white" }} />
                    </a>
                  </div>
                </div>
                <div style={{ background: "#243b55" }}>
                  <div
                    class="d-flex flex-row justify-content-between align-items-center px-5"
                    style={{ color: "#9EA1A5" }}
                  >
                    Username: {details?.userName}
                  </div>
                  <div
                    class="d-flex flex-row justify-content-between align-items-center px-5"
                    style={{ color: "#9EA1A5" }}
                  >
                    <p class="display-9">
                      University: {details?.university} ({details?.course} {details?.passing_out_year})
                    </p>
                    {/* <p>Batch: {passing_out_year}</p> */}
                  </div>
                </div>
                <div class="px-5 pt-3 pb-3 bg-black text-white">
                  <h3>University Rank: 1</h3>
                  <h6>Score: {details?.score}</h6>
                </div>
                <div class="d-flex flex-row text-white">
                  <div class="p-4 bg-primary text-center skill-block">
                    <h4>{details?.totalQ}</h4>
                    <h6>Problems Solved</h6>
                  </div>
                  <div class="p-3 bg-success text-center skill-block">
                    <h4>{details?.easyQ}</h4>
                    <h6>Easy</h6>
                  </div>
                  <div class="p-3 bg-warning text-center skill-block">
                    <h4>{details?.mediumQ}</h4>
                    <h6>Medium</h6>
                  </div>
                  <div class="p-3 bg-danger text-center skill-block">
                    <h4>{details?.hardQ}</h4>
                    <h6>Hard</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Oprofile;
