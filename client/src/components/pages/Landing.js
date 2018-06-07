// rcc
import React, { Component } from 'react';
import css from '../../styles/components/_home.css';

class Landing extends Component {
  render() {
    return (
      <div>
        <p>Welcome to our Landing Page</p>
        <div className={css.test}>
          <p>Check CSS Module sample is here.{css.test}</p>
        </div>
      </div>
    );
  }
}

export default Landing;
