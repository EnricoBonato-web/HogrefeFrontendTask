import React from "react";
import { Fragment } from "react";
import classes from "./header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = () => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Hogrefe Frontend task</h1>
      </header>
    </Fragment>
  );
};
export default Header;
