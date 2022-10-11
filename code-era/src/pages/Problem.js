import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
import Card from "react-bootstrap/Card";

function Problem() {
  const [code, setCode] = useState("");

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.ctrlKey || e.metaKey) {
        if (String.fromCharCode(e.which).toLowerCase() === "s") {
          e.preventDefault();
        }
      }
    });
  }, []);

  return (
    <>
      <Row>
        <Col>
          <h1>1. Two Sum</h1>
        </Col>
        <Col>
          <Editor
            value={code}
            onChange={(e) => {
              setCode(e);
            }}
            height="90vh"
            defaultLanguage="javascript"
            language="cpp"
            defaultValue="// some comment"
          />
        </Col>
      </Row>
    </>
  );
}
export default Problem;
