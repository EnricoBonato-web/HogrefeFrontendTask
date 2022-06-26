import React, { useState } from "react";
import classes from "./QuestionItemForm.module.css";
const QuestionItemForm = (props: any) => {
  const [questionValue, setRadioValue] = useState();
  const radioChange = (event: any) => {
    console.log(event.target.value);
  };
  return (
    <ul className={classes.answer} onChange={props.onChange}>
      <li>
        <input type="radio" name={props.id} value="1" />
        <label>completely untrue </label>
      </li>
      <li>
        <input type="radio" name={props.id} value="2" />
      </li>
      <li>
        <input type="radio" name={props.id} value="3" />
      </li>
      <li>
        <input type="radio" name={props.id} value="4" />
      </li>
      <li>
        <input type="radio" name={props.id} value="5" />
      </li>
      <li>
        <input type="radio" name={props.id} value="6" />
        <label>completely true</label>
      </li>
    </ul>
  );
};
export default QuestionItemForm;
