import QuestionsSummary from "./Questionsummary";
import AvailableQuestions from "./AvailableQuestions";
import React, { Fragment } from "react";

const Questions = () => {
  return (
    <Fragment>
      <QuestionsSummary />
      <AvailableQuestions />
    </Fragment>
  );
};
export default Questions;
