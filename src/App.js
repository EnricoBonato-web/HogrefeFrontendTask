import Header from "./components/Layout/Header";
import React, { Fragment, useState } from "react";
import Cart from "./components/Cart/Cart";
import AvailableQuestions from "./components/Questions/AvailableQuestions";
function App() {
  console.clear();
  const [cartIsShown, setCartIsShown] = useState(false);
  const showCartHandler = () => {
    setCartIsShown(true);
  };
  const hideCartHandler = () => {
    setCartIsShown(false);
  };
  return (
    <Fragment>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header />

      <AvailableQuestions onShowCart={showCartHandler} />
    </Fragment>
  );
}

export default App;
