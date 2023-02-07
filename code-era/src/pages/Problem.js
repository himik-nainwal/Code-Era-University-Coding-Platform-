import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
import Dropdown from "react-bootstrap/Dropdown";
// import Button from "react-bootstrap/esm/Button";
import Split from "react-split";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { positions } from "@mui/system";
import OutputWindow from "./OutputWindow";
import OutputDetails from "./OutputDetails";
import { Buffer } from "buffer";

function Problem() {
  function createMarkup(c) {
    return { __html: c };
  }

  const { problemId } = useParams();
  const [questionDetails, setQuestionDetails] = useState(null);
  const [codeDetails, setCodeDetails] = useState(null);
  const [code, setCode] = useState("//your code goes here...");
  const [customInput, setCustomInput] = useState("");
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);

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
  const id_to_lang = {
    54: "cpp_boilerplate",
    71: "py_boilerplate",
  };

  async function getSubmission(options) {
    try {
      let response = await axios.request(options);
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async function createSubmission(options) {
    try {
      let response = await axios.request(options);
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  const createSubmissionOptions = {
    method: "POST",
    url: "https://judge0-ce.p.rapidapi.com/submissions",
    params: { base64_encoded: "true", fields: "*" },
    headers: {
      "content-type": "application/json",
      "Content-Type": "application/json",
      // 'X-RapidAPI-Key': 'e7aba527c2msh4791c3306942553p17f71bjsnd62f0d24477a',
      "X-RapidAPI-Key": "36ca6be9edmsha4366d4621dace3p128c99jsnd780bbec375d",
      "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
    },
    data: {
      language_id: 0,
      source_code: "",
      stdin: "",
      expected_output: "",
    },
  };

  function getSubmissionOptions(token) {
    this.method = "GET";
    this.url = "https://judge0-ce.p.rapidapi.com/submissions/" + token;
    this.params = { base64_encoded: "true", fields: "*" };
    this.headers = {
      // 'X-RapidAPI-Key': 'e7aba527c2msh4791c3306942553p17f71bjsnd62f0d24477a',
      "X-RapidAPI-Key": "36ca6be9edmsha4366d4621dace3p128c99jsnd780bbec375d",
      "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
    };
  }

  function btoa(str) {
    return Buffer.from(str).toString("base64");
  }
  function atob(str) {
    return Buffer.from(str, "base64").toString();
  }

  const handleRunCode = async (e) => {
    setLoading(true);
    e.preventDefault();

    // console.log(codeDetails[0]);

    if (customInput === "") {
      createSubmissionOptions.data.language_id = selectedLanguage.id;
      createSubmissionOptions.data.source_code = btoa(code);
      createSubmissionOptions.data.stdin = btoa(
        codeDetails[0].example_test_case_input
      );
      createSubmissionOptions.data.expected_output = btoa(
        codeDetails[0].example_test_case_output
      );
      const submissionToken = await createSubmission(createSubmissionOptions);
      const result = await getSubmission(
        new getSubmissionOptions(submissionToken.token)
      );
      setOutput(result);
      console.log(result);
    } else {
      createSubmissionOptions.data.language_id =
        codeDetails[0].correct_code_lang_id;
      createSubmissionOptions.data.source_code = btoa(
        codeDetails[0].correct_code
      );
      createSubmissionOptions.data.stdin = btoa(customInput);
      const correctResultToken = await createSubmission(
        createSubmissionOptions
      );
      const correctResult = await getSubmission(
        new getSubmissionOptions(correctResultToken.token)
      );
      createSubmissionOptions.data.expected_output = correctResult.stdout;
      createSubmissionOptions.data.language_id = selectedLanguage.id;
      createSubmissionOptions.data.source_code = btoa(code);
      const submissionToken = await createSubmission(createSubmissionOptions);
      const result = await getSubmission(
        new getSubmissionOptions(submissionToken.token)
      );
      setOutput(result);
      console.log(result);
    }

    setLoading(false);
  };

  const handleSubmitCode = async (e) => {
    setLoading1(true);
    e.preventDefault();
    createSubmissionOptions.data.language_id = selectedLanguage.id;
    createSubmissionOptions.data.source_code = btoa(code);
    createSubmissionOptions.data.stdin = btoa(
      codeDetails[0].all_test_cases_input
    );
    createSubmissionOptions.data.expected_output = btoa(
      codeDetails[0].all_test_cases_output
    );

    const submissionToken = await createSubmission(createSubmissionOptions);
    const result = await getSubmission(
      new getSubmissionOptions(submissionToken.token)
    );

    setOutput(result);
    console.log(result);

    setLoading1(false);
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

  useEffect(() => {
    // window.addEventListener("keydown", (e) => {
    //   if (e.ctrlKey || e.metaKey) {
    //     if (String.fromCharCode(e.which).toLowerCase() === "s") {
    //       e.preventDefault();
    //     }
    //   }
    // });
    const fetchData = async () => {
      // console.log("here");
      fetch(`http://localhost:5000/get_question_code/${problemId}`, {
        method: "GET",
      })
        .then((ans) => ans.json())
        .then((ans) => setCodeDetails(ans.data));
    };

    fetchData();
  }, []);

  // console.log(codeDetails);
  return (
    <>
      <Split
        direction="horizontal"
        className="m-3"
        style={{ height: "calc(100vh-4rem" }}
      >
        <Row>
          <Col>
            <div style={{ overflowY: "auto", height: "90vh" }}>
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
            </div>
          </Col>
          <Col>
            <Row style={{ padding: "0.2rem 0" }}>
              <Col>
                <Dropdown>
                  <Dropdown.Toggle
                    style={{
                      backgroundColor: "white",
                      color: "#60B7E9",
                      border: "1px solid #60B7E9",
                    }}
                    id="dropdown-basic"
                  >
                    {selectedLanguage?.name?.toUpperCase()}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {languages.map((lang, i) => (
                      <Dropdown.Item
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedLanguage(lang);
                          setCode("");
                        }}
                      >
                        {lang?.name}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>
            <Row>
              <Editor
                theme="vs-dark"
                value={codeDetails?.[0]?.[id_to_lang[selectedLanguage.id]]}
                onChange={(e) => {
                  setCode(e);
                }}
                height="70vh"
                language={selectedLanguage.lang}
              />
            </Row>

            <div
              style={{
                display: "flex",
                justifyContent: "end",
                alignItems: "start",
              }}
            >
              <Button
                disabled={loading}
                onClick={handleRunCode}
                className="m-2"
              >
                {loading ? "Compiling..." : "Run Code"}
              </Button>
              <Button
                disabled={loading1}
                onClick={handleSubmitCode}
                className="m-2"
              >
                {loading1 ? "Submitting..." : "Submit Code"}
              </Button>
            </div>
            <Row>
              <Col>
                <center>
                  <h4 style={{ display: "flex", paddingTop: "1%" }}>
                    Custom Input
                  </h4>
                </center>
                <TextField
                  id="custom input"
                  label="Enter your input here"
                  multiline
                  onChange={(e) => setCustomInput(e.target.value)}
                ></TextField>
              </Col>
              <Col>
                <OutputWindow outputDetails={output} />{" "}
                <OutputDetails outputDetails={output} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Split>
    </>
  );
}
export default Problem;
