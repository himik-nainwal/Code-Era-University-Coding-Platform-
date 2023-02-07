import React, { useState } from "react";

const AddProb = () => {
  const [quesId, setQuesId] = useState("");
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionTitleSlug, setQuestionTitleSlug] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState("");
  const [descriptionHtml, setDescriptionHtml] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/add_question_details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ques_id: quesId,
          question_title: questionTitle,
          question_title_slug: questionTitleSlug,
          difficulty_level: difficultyLevel,
          description_html: descriptionHtml,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit question");
      }

      // Reset form after successful submission
      setQuesId("");
      setQuestionTitle("");
      setQuestionTitleSlug("");
      setDifficultyLevel("");
      setDescriptionHtml("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="quesId">Question ID:</label>
        <input
          type="number"
          id="quesId"
          value={quesId}
          onChange={(event) => setQuesId(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="questionTitle">Question Title:</label>
        <input
          type="text"
          id="questionTitle"
          value={questionTitle}
          onChange={(event) => setQuestionTitle(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="questionTitleSlug">Question Title Slug:</label>
        <input
          type="text"
          id="questionTitleSlug"
          value={questionTitleSlug}
          onChange={(event) => setQuestionTitleSlug(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="difficultyLevel">Difficulty Level:</label>
        <select
          id="difficultyLevel"
          value={difficultyLevel}
          onChange={(event) => setDifficultyLevel(event.target.value)}
        >
          <option value="">-- Select Difficulty --</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>
      <div>
        <label htmlFor="descriptionHtml">Description HTML:</label>
        <textarea
          id="descriptionHtml"
          value= {descriptionHtml}
          onChange={(event) => setDescriptionHtml(event.target.value)}
        />
      </div>
      <button type="submit">Submit Question</button>
    </form>
  );
};

export default AddProb;

