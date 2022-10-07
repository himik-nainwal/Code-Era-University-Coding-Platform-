import React, { useEffect, useState } from "react";
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";

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
      <div class="modal-body row">
        <div class="col-md-6">
          {/* <!-- Your first column here --> */}
          <h1>Question part</h1>
        </div>
        <div class="col-md-6">
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
        </div>
      </div>
    </>
  );
}

export default Problem;
