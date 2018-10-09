/* eslint-disable react/prefer-stateless-function, import/prefer-default-export */

import React, { Component } from 'react';
import Header from './blocks/Header';
import Sidebar from './blocks/Sidebar';
import ContentWrapper from './ContentWrapper/ContentWrapper';
import Footer from './blocks/Footer';

class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <Header />
        <Sidebar />
        <ContentWrapper />
        <Footer />
      </div>
    );
  }
}

export default App;
