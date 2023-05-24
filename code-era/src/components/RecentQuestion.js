import React, { useEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";

function RecentQuestion({ code }) {
  //   console.log("data" + code);

  const topTenSubmissions = code.slice(0, 5);

  const cardStyle = {
    maxHeight: "500px", // set max height of card
    overflowY: "auto", // enable vertical scrolling when content exceeds max height
    backgroundColor: "rgb(166, 213, 227)",
    boxShadow: "0px 10px 15px 0px rgba(0, 0, 0, 0.56)",
  };

  return (
    <Card style={cardStyle}>
      <Card.Header className="text-center">
        <h5>Most Recent Submissions</h5>
      </Card.Header>
      <Card.Body>
        <Table striped bordered hover className="table-fixed">
          <thead>
            <tr>
              <th class="header">Question</th>
              <th class="header">Status</th>
              <th class="header">Language</th>
              {/* <th class="header">Username</th> */}
            </tr>
          </thead>
          <tbody>
            {code.map((code, key) => (
              <tr key={key}>
                <td>{code.questionId}</td>
                <td>{code.status === true ? "Accepted" : "Wrong Answer"}</td>
                <td>{code.language}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}

export default RecentQuestion;
