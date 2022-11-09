import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/esm/Button";

function Problem() {
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
      source_code: code,
      language_id: selectedLanguage.id,
    };
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
      console.log("here");
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
      <Row>
        <Col>
          <h1>{questionDetails?.question_title}</h1>
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
              height="90vh"
              language={selectedLanguage.lang}
            />
          </Row>
        </Col>
      </Row>
    </>
  );
}
export default Problem;
