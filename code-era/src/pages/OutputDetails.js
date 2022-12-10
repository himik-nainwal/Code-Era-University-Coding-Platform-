import React from "react";

const OutputDetails = ({ outputDetails }) => {
  return (
    <div className="">
      <p className="">
        Status: <span className="">{outputDetails?.status?.description}</span>
      </p>
      <p className="">
        Memory: <span className="">{outputDetails?.memory}</span>
      </p>
      <p className="">
        Time: <span className="">{outputDetails?.time}</span>
      </p>
    </div>
  );
};

export default OutputDetails;
