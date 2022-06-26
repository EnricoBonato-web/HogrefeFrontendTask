import React from 'react';
import { Fragment } from 'react';
import classes from './header.module.css';
import HeaderCartButton from './HeaderCartButton';

const Header = (props: { onShowCart: () => {} }) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>ReactQuestions</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={classes['main-image']}>
      </div>
    </Fragment>
  );
};
export default Header;
