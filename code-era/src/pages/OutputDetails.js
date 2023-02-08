import React from "react";

const OutputDetails = ({ outputDetails }) => {
  return (
    
    <div className="">
      { outputDetails && 
      <pre className="">
        Status: <span className="">{outputDetails?.status?.description}</span>
      </pre>}
      { outputDetails && <pre className="">
        Memory: <span className="">{outputDetails?.memory} kB</span>
      </pre>}
      { outputDetails && <pre className="">
        Time: <span className="">{outputDetails?.time} sec</span>
      </pre>}
    </div>
  );
};

export default OutputDetails;
