import React from "react";

const OutputWindow = ({ outputDetails }) => {
  //   console.log("Ooutput");
  const getOutput = () => {
    let statusId = outputDetails?.status?.id;

    if (statusId === 6) {
      // compilation error
      return <div className="">{atob(outputDetails?.compile_output)}</div>;
    } else if (statusId === 3) {
      return (
        <div className="">
          {atob(outputDetails.stdout) !== null
            ? `${atob(outputDetails.stdout)}`
            : null}
        </div>
      );
    } else if (statusId === 5) {
      return <div className="">{`Time Limit Exceeded`}</div>;
    } else {
      return <div className="">{atob(outputDetails?.stderr)}</div>;
    }
  };
  return (
    <>
      <h1 className="">Output</h1>
      <div className="">{outputDetails ? <>{getOutput()}</> : null}</div>
    </>
  );
};

export default OutputWindow;
