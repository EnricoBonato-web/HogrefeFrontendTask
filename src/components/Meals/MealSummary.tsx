import React from 'react';
import classes from './QuestionsSummary.module.css';

const QuestionsSummary = () => {
  return (
    <section className={classes.summary}>
      <h2>Delicious Food, Delivered To You</h2>
      <p>
        Choose your favorite question from our broad selection of available questions
        and enjoy a delicious lunch or dinner at home.
      </p>
      <p>
        All our questions are cooked with high-quality ingredients, just-in-time and
        of course by experienced chefs!
      </p>
    </section>
  );
};

export default QuestionsSummary;
