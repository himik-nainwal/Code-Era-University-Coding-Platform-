import React, { useState } from "react";

const ProbDetails = () => {
  const [ques_id, setQuesId] = useState("");
  const [lang_id, setLangId] = useState("");
  const [cpp_boilerplate, setCppBoilerplate] = useState("");
  const [py_boilerplate, setPyBoilerplate] = useState("");
  const [correct_code, setCorrectCode] = useState("");
  const [custom_judge, setCustomJudge] = useState("");
  const [example_test_case_input, setExampleTestCaseInput] = useState("");
  const [example_test_case_output, setExampleTestCaseOutput] = useState("");
  const [all_test_cases_input, setAllTestCasesInput] = useState("");
  const [all_test_cases_output, setAllTestCasesOutput] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Add logic to post the form data to the database
    try {
      const response = await fetch("http://localhost:5000/add_question_code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ques_id,
          lang_id,
          cpp_boilerplate,
          py_boilerplate,
          correct_code,
          custom_judge,
          example_test_case_input,
          example_test_case_output,
          all_test_cases_input,
          all_test_cases_output,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit question");
      }

      // Reset form after successful submission
      // setQuesId("");
      // setLangId("");
      // setQuestionTitleSlug("");
      // setDifficultyLevel("");
      // setDescriptionHtml("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="ques_id">Question ID:</label>
        <input
          type="text"
          id="ques_id"
          value={ques_id}
          onChange={(event) => setQuesId(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="lang_id">Language ID:</label>
        <input
          type="text"
          id="lang_id"
          value={lang_id}
          onChange={(event) => setLangId(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="cpp_boilerplate">Cpp Boilerplate:</label>
        <input
          type="text"
          id="cpp_boilerplate"
          value={cpp_boilerplate}
          onChange={(event) => setCppBoilerplate(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="py_boilerplate">Py Boilerplate:</label>
        <input
          type="text"
          id="py_boilerplate"
          value={py_boilerplate}
          onChange={(event) => setPyBoilerplate(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="correct_code">Correct Code:</label>
        <input
          type="text"
          id="correct_code"
          value={correct_code}
          onChange={(event) => setCorrectCode(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="custom_judge">Custom Judge:</label>
        <input
          type="text"
          id="custom_judge"
          value={custom_judge}
          onChange={(event) => setCustomJudge(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="example_test_case_input">
          Example Test Case Input:
        </label>
        <input
          type="text"
          id="example_test_case_input"
          value={example_test_case_input}
          onChange={(event) => setExampleTestCaseInput(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="example_test_case_output">
          Example Test Case Output:
        </label>
        <input
          type="text"
          id="example_test_case_output"
          value={example_test_case_output}
          onChange={(event) => setExampleTestCaseOutput(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="all_test_cases_input">All Test Cases Input:</label>
        <input
          type="text"
          id="all_test_cases_input"
          value={all_test_cases_input}
          onChange={(event) => setAllTestCasesInput(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="all_test_cases_output">All Test Cases Output:</label>
        <input
          type="text"
          id="all_test_cases_output"
          value={all_test_cases_output}
          onChange={(event) => setAllTestCasesOutput(event.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ProbDetails;
