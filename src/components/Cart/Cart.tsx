import React, { useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartDisplay from "./CartDisplay";
import CartItem from "../../types/CartItem";
import CartType from "../../types/CartType";
import Checkout from "./Checkout";

const Cart = (props: { onClose: () => {} }) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const cartCtx = useContext<CartType>(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  const cartItemRemoveHandler = (id: string) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item: CartItem) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const orderHandler = () => {
    setIsCheckout(true);
  };
  const submitOrderHandler = async (userData: any) => {
    setIsSubmitting(true);
    await fetch(process.env.REACT_APP_FireBaseOrders!, {
      method: "POST",
      body: JSON.stringify({ user: userData, orderedItems: cartCtx.items }),
    });
    setIsSubmitting(false);
    setIsSubmitted(true);
    cartCtx.clearCart();
  };
  const cartItems = (
    <ul className={classes["cart-item"]}>
      {cartCtx.items.map((item: CartItem) => (
        <CartDisplay
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        ></CartDisplay>
      ))}
    </ul>
  );
  const modalButtons = (
    <div className={classes.actions}>
      <button className={classes["button-alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!isCheckout && modalButtons}
    </React.Fragment>
  );
  const didSubmitModalContend = <p>Successfully send data...</p>;
  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && cartModalContent}
      {isSubmitting && <p>Sending oreder data...</p>}
      {!isSubmitting && isSubmitted && didSubmitModalContend}
    </Modal>
  );
};

export default Cart;
