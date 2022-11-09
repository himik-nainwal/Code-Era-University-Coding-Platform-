const mongoose = require("mongoose");

const userDetailsSchema = new mongoose.Schema(
  {
    ques_id: {
      type: Number,
      required: true,
      unique: true,
    },
    question_title: {
      type: String,
      required: true,
    },
    question_title_slug: {
      type: String,
      required: true,
    },
    difficulty_level: {
      type: Number,
      required: true,
    },
    description_html: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
  {
    collection: "questions",
  }
);

module.exports = mongoose.model("Question", userDetailsSchema);
