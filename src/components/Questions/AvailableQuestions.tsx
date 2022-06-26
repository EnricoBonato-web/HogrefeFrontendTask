import React, { useEffect, useState } from "react";
import QuestionItems from "./QuestionItem/QuestionItem";
import Card from "../UI/Card";
import QuestionItem from "../../types/QuestionItem";
import classes from "./AvailableQuestions.module.css";
import HeaderCartButton from "../Layout/HeaderCartButton";

const AvailableQuestions = (props: { onShowCart: () => {} }) => {
  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState();
  const changeHandler = (event: any, questionNumber: number, value: number) => {
    console.log(event.target.value);
    setAnswers((prevState) => {
      const newAnswer = [...prevState];
      newAnswer[questionNumber] = value;
      return newAnswer;
    });
  };
  useEffect(() => {
    const fetchedQuestions = async () => {
      setIsLoading(true);
      const response = await fetch(process.env.REACT_APP_FireBaseQuestions!);
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const responseData = await response.json();
      const loadedQuestions: QuestionItem[] = [];
      const loadedAnswers: number[] = [];

      for (const key in responseData) {
        loadedQuestions.push({
          id: key,
          text: responseData[key],
        });
        loadedAnswers.push(0);
      }
      setQuestions(loadedQuestions);
      setAnswers(loadedAnswers);
      setIsLoading(false);
    };

    fetchedQuestions().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);
  if (httpError) {
    return (
      <section className={classes.QuestionsError}>
        <p>{httpError}</p>
      </section>
    );
  }
  if (isLoading) {
    return (
      <section className={classes.QuestionsLoading}>
        <p>loading...</p>
      </section>
    );
  }
  const questionList = questions.map((question) => (
    <QuestionItems
      key={question.id}
      id={question.id}
      text={question.text}
      onchange={changeHandler}
    />
  ));
  return (
    <Card>
      <ul className="answer">{questionList}</ul>
      <HeaderCartButton onClick={props.onShowCart} />
    </Card>
  );
};
export default AvailableQuestions;
