import React from "react";
import classes from "./QuestionItem.module.css";
import QuestionItemForm from "./QuestionItemForm";

const QuestionItems = (props: {
  id: string;
  text: string;
  onchange: Function;
}) => {
  console.log("test");
  return (
    <div className={classes.error + " " + props.id}>
      <p className="question">{props.text}</p>
      <div>
        <QuestionItemForm id={props.id} onChange={props.onchange} />
      </div>
    </div>
  );
};
export default QuestionItems;
