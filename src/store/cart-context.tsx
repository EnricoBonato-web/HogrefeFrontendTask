import React from 'react';
import CartItem from '../types/CartItem';
import CartType from '../types/CartType';
const example: CartItem[] = [];
const CartContext = React.createContext({
  items: example,
  totalAmount: 0,
  addItem: (item: CartItem) => {},
  removeItem: (id: string) => {},
} as CartType);
export default CartContext;
