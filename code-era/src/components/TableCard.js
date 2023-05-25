import React, { useState, useEffect } from "react";
import { Card, Table } from "react-bootstrap";

const TableCard = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      fetch("http://localhost:5000/usermeta")
        .then((res) => res.json())
        .then((res) => setData(res.data));
    };
    fetchData();
  }, []);

  function compare(a, b) {
    if (a.score > b.score) {
      return -1;
    }
    if (a.score < b.score) {
      return 1;
    }
    return 0;
  }
  data.sort(compare);
  console.log(data);

  const firstFiveEntries = data.slice(0, 5);

  const cardStyle = {
    maxHeight: "500px", // set max height of card
    overflowY: "auto", // enable vertical scrolling when content exceeds max height
    backgroundColor: "rgb(166, 213, 227)",
    boxShadow: "0px 10px 15px 0px rgba(0, 0, 0, 0.56)",
  };

  return (
    <Card style={cardStyle}>
      <Card.Header className="text-center">
        <h5>Top Performers</h5>
      </Card.Header>
      <Card.Body>
        <Table striped bordered hover className="table-fixed">
          <thead>
            <tr>
              <th class="header">Rank</th>
              <th class="header">Name</th>
              <th class="header">Score</th>
              {/* <th class="header">Username</th> */}
            </tr>
          </thead>
          <tbody>
            {firstFiveEntries.map((profile, key) => (
              <tr key={key}>
                {/* <td>{key + 1}</td> */}
                <td>{key + 1}</td>
                <td>
                  <a
                    href={`/oprofile/${profile?.student_id}`}
                    className="link-unstyled"
                    target="_blank"
                  >
                    {profile.fname + " " + profile.lname}
                  </a>
                </td>
                <td>{profile.score}</td>
                {/* <td>
                  <a
                    href={`/oprofile/${profile?.student_id}`}
                    className="link-unstyled"
                    target="_blank"
                  >
                    {profile.userName}
                  </a>
                </td> */}
                {/* <td>
                    <Link
                      style={{ textDecoration: "none", color: "black" }}
                      to={`/oprofile/${profile?.student_id}`}
                    >
                      Open Profile
                    </Link>
                  </td> */}
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default TableCard;
