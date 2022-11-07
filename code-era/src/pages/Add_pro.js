import React, { useState } from "react";
import axios from "../utils/axios";
function Add_pro() {
  const [problem, setProblem] = useState({
    title: "",
    description: "",
    difficulty: "",
    solution: "",
  });

  const handleChange = (e) => {
    setProblem({ ...problem, [e.target.name]: e.target.value });
  };

  const handleAddProblem = (e) => {
    e.preventDefault();
    axios.post("", problem).then((data) => {
      console.log(data);
    });
  };
  return (
    <div className="addproblem">
      <form>
        <div>
          <label for="title ">Add Title</label>
          <input type="text" name="title" id="title" onChange={handleChange} />
        </div>
        <div>
          <label for="description">Add Description</label>
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="20"
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <label for="difficulty">Difficulty</label>
          <select name="difficulty" onChange={handleChange}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div>
          <label for="solution">Solution</label>
          <textarea
            name="solution"
            id="solution"
            cols="30"
            rows="20"
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <input type="submit" onClick={handleAddProblem} />
        </div>
      </form>
    </div>
  );
}

export default Add_pro;
