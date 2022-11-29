import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/esm/Button";
import Split from "react-split";
import axios from "axios";

function Problem() {
  function createMarkup(c) {
    return { __html: c };
  }

  const { problemId } = useParams();
  const [questionDetails, setQuestionDetails] = useState(null);
  const [code, setCode] = useState("//your code goes here...");
  const [selectedLanguage, setSelectedLanguage] = useState({
    id: 54,
    name: "C++ (GCC 9.2.0)",
    lang: "cpp",
  });
  const languages = [
    {
      id: 50,
      name: "C (GCC 9.2.0)",
      lang: "c",
    },
    {
      id: 54,
      name: "C++ (GCC 9.2.0)",
      lang: "cpp",
    },
    {
      id: 51,
      name: "C# (Mono 6.6.0.161)",
      lang: "csharp",
    },
    {
      id: 60,
      name: "Go (1.13.5)",
      lang: "go",
    },
    {
      id: 62,
      name: "Java (OpenJDK 13.0.1)",
      lang: "java",
    },
    {
      id: 63,
      name: "JavaScript (Node.js 12.14.0)",
      lang: "javascript",
    },
    {
      id: 71,
      name: "Python (3.8.1)",
      lang: "python",
    },
  ];

  const handleRunCode = async (e) => {
    e.preventDefault();
    const reqData = {
      language_id: selectedLanguage.id,
      source_code: btoa(code),
      stdin: btoa(""),
    };

    console.log(reqData);

    let options = {
      method: 'POST',
      url: 'https://judge0-ce.p.rapidapi.com/submissions',
      params: { base64_encoded: 'true', fields: '*' },
      headers: {
        'content-type': 'application/json',
        'Content-Type': 'application/json',
        // 'X-RapidAPI-Key': 'e7aba527c2msh4791c3306942553p17f71bjsnd62f0d24477a',
        'X-RapidAPI-Key': '36ca6be9edmsha4366d4621dace3p128c99jsnd780bbec375d',
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
      },
      data: reqData,
    };

    async function createSubmission() {
      try {
        let response = await axios.request(options);
        // console.log(response.data);
        return response.data;
      }
      catch (error) {
        console.error(error);
      }
    }

    const submissionToken = await createSubmission();
    console.log(submissionToken);

    options = {
      method: 'GET',
      url: 'https://judge0-ce.p.rapidapi.com/submissions/' + submissionToken.token,
      params: { base64_encoded: 'true', fields: '*' },
      headers: {
        // 'X-RapidAPI-Key': 'e7aba527c2msh4791c3306942553p17f71bjsnd62f0d24477a',
        'X-RapidAPI-Key': '36ca6be9edmsha4366d4621dace3p128c99jsnd780bbec375d',
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
      }
    };

    async function getSubmission() {
      try {
        let response = await axios.request(options);
        // console.log(response.data);
        return response.data;
      }
      catch (error) {
        console.error(error);
      }
    }

    const result = await getSubmission();
    console.log(result);

  };

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.ctrlKey || e.metaKey) {
        if (String.fromCharCode(e.which).toLowerCase() === "s") {
          e.preventDefault();
        }
      }
    });
    const fetchData = async () => {
      // console.log("here");
      fetch(`http://localhost:5000/problem/${problemId}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((res) => setQuestionDetails(res.data));
    };

    fetchData();
  }, []);

  return (
    <>
      <Split direction="horizontal" style={{ height: "calc(100vh-4rem" }}>
        <Row>
          <Col>
            <h1>
              {problemId}. {questionDetails?.question_title}
            </h1>
            <Row>
              {questionDetails && (
                <div
                  dangerouslySetInnerHTML={createMarkup(
                    questionDetails?.description_html
                  )}
                ></div>
              )}
            </Row>
          </Col>
          <Col>
            <Row style={{ padding: "0.2rem 0" }}>
              <Col>
                <Dropdown>
                  <Dropdown.Toggle variant="primary" id="dropdown-basic">
                    {selectedLanguage?.name?.toUpperCase()}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {languages.map((lang, i) => (
                      <Dropdown.Item
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedLanguage(lang);
                        }}
                      >
                        {lang?.name}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col>
                {" "}
                <Button variant="light" onClick={handleRunCode}>
                  Run Code
                </Button>
              </Col>
            </Row>
            <Row>
              <Editor
                width={"100%"}
                theme="light"
                value={code}
                onChange={(e) => {
                  setCode(e);
                }}
                height="50vh"
                language={selectedLanguage.lang}
              />
            </Row>
            <Row>
              <Col>
              <h3><center>Input Custom</center></h3>
              
              </Col>
              <Col>
              <h3><center>Output</center></h3>
              </Col>
            </Row>
            <Row>
              <Col>
              <center>
              <Button>
                Run Code
                </Button>
                </center>
              </Col>
              <Col>
              <center>
              <Button>Submit Code</Button>
              </center>
              </Col>
              </Row>
          </Col>
        </Row>
      </Split>
    </>
  );
}
export default Problem;
