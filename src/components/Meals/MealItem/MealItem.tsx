import React from "react";
import { useContext } from "react";
import classes from "./QuestionItem.module.css";
import QuestionItemForm from "./QuestionItemForm";
import CartContext from "../../../store/cart-context";
import CartItem from "../../../types/CartItem";

const QuestionItems = (props: CartItem) => {
  const cartCtx = useContext<any>(CartContext);

  const price = `$${props.price.toFixed(2)}`;
  const addToCartHandler = (amount: string) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };
  return (
    <li className={classes.question}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <QuestionItemForm id={props.id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};
export default QuestionItems;
