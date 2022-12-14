import React from "react";
import { Buffer } from 'buffer';

function btoa(str) { return Buffer.from(str).toString('base64') }
function atob(str) { return Buffer.from(str, 'base64').toString() }

const OutputWindow = ({ outputDetails }) => {
  //   console.log("Output");
  const getOutput = () => {
    let statusId = outputDetails?.status?.id;

    if (statusId === 6) {
      // compilation error
      return <pre className="">{atob(outputDetails?.compile_output)}</pre>;
    } else if (statusId === 3) {
      return (<>
        <pre>Input: </pre><pre>{atob(outputDetails?.stdin)}</pre>
        <pre>Output: </pre><pre>{atob(outputDetails?.stdout)}</pre>
      </>);
    } else if (statusId === 4) {
      return (<>
        <pre>Input: </pre><pre>{atob(outputDetails?.stdin)}</pre>
        <pre>Output: </pre><pre>{atob(outputDetails?.stdout)}</pre>
        <pre>Expected Output: </pre><pre>{atob(outputDetails?.expected_output)}</pre>
      </>);
    }
    else if (statusId === 5) {
      return <pre className="">{`Time Limit Exceeded`}</pre>;
    } else {
      return <pre className="">{atob(outputDetails?.stderr)}</pre>;
    }
  };
  return (
    <>
      <h4 className="">Output</h4>
      <pre className="">{outputDetails ? <>{getOutput()}</> : null}</pre>
    </>
  );
};

export default OutputWindow;
