import React from 'react';
import Provider from 'react-redux/es/components/Provider';
import PropTypes from 'prop-types';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App/App';

function Root({ store }) {
  return (
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  );
}

Root.propTypes = {
  store: PropTypes.shape({}).isRequired,
};

export default Root;
