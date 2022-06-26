import React, { useReducer } from "react";
import CartItem from "../types/CartItem";
import CartType from "../types/CartType";
import CartContext from "./cart-context";
const REMOVE_CART_ITEM: string = "REMOVE_CART_ITEM";
const ADD_CART_ITEM: string = "ADD_CART_ITEM";
const CLEAR_CART_ITEM: string = "CLEAR_CART_ITEM";

const defaultCartState: CartType = {
  items: [],
  totalAmount: 0,
  addItem: () => {},
  removeItem: () => {},
  clearCart: () => {},
};
const cartReducer = (state: any, action: any) => {
  let updatedItems: CartItem[];
  if (action.type === ADD_CART_ITEM) {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    const existingCartItemIndex = state.items.findIndex(
      (item: CartItem) => item.id === action.item.id
    );
    const existingCartItem: CartItem = state.items[existingCartItemIndex];
    if (existingCartItem) {
      //existingCartItem.amount+=action.item.amount;
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return { items: updatedItems, totalAmount: updatedTotalAmount };
  }
  if (action.type === REMOVE_CART_ITEM) {
    const existingCartItemIndex: number = state.items.findIndex(
      (item: CartItem) => item.id === action.id
    );
    const existingItem: CartItem = state.items[existingCartItemIndex];
    const updatedTotalAmount: number = state.totalAmount - existingItem.price;

    if (existingItem.amount === 1) {
      updatedItems = state.items.filter(
        (item: CartItem) => item.id !== action.id
      );
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return { items: updatedItems, totalAmount: updatedTotalAmount };
  }
  if (action.type === CLEAR_CART_ITEM) {
    return { items: [], totalAmount: 0 };
  }
  return defaultCartState;
};
const CartProvider = (props: any) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  const addItemToCartHandler = (item: CartItem) => {
    dispatchCartAction({ type: ADD_CART_ITEM, item: item });
  };
  const removeItemToCartHandler = (id: string) => {
    dispatchCartAction({ type: REMOVE_CART_ITEM, id: id });
  };
  const clearCartHandler = () => {
    dispatchCartAction({ type: CLEAR_CART_ITEM });
  };
  const cartContext: CartType = {
    items: cartState!.items,
    totalAmount: cartState!.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemToCartHandler,
    clearCart: clearCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};
export default CartProvider;
