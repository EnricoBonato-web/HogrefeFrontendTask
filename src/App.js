import Header from "./components/Layout/Header";
import React, { Fragment, useState } from "react";
import Questions from "./components/Questions/Questions";
import Cart from "./components/Cart/Cart";
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
      <Header onShowCart={showCartHandler} />
      <main>
        <Questions />
      </main>
    </Fragment>
  );
}

export default App;
