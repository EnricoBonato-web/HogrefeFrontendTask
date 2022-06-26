import React, { useEffect, useState } from "react";
import QuestionItems from "./QuestionItem/QuestionItem";
import Card from "../UI/Card";
import QuestionItem from "../../types/QuestionItem";
import classes from "./AvailableQuestions.module.css";

const AvailableQuestions = () => {
  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchedQuestions = async () => {
      setIsLoading(true);
      const response = await fetch(process.env.REACT_APP_FireBaseQuestions!);
      if (!response.ok) {
        throw new Error("Something went very very wrong");
      }
      const responseData = await response.json();
      const loadedQuestions: QuestionItem[] = [];

      for (const key in responseData) {
        loadedQuestions.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setQuestions(loadedQuestions);
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
      name={question.name}
      description={question.description}
      price={question.price}
      amount={1}
    />
  ));
  return (
    <section className={classes.questions}>
      <Card>
        <ul>{questionList}</ul>
      </Card>
    </section>
  );
};
export default AvailableQuestions;
