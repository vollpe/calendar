/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/admin-lte/dist/js/adminlte';
import './styles/custom.scss';
import store from './store/store';
import registerServiceWorker from './registerServiceWorker';
import Root from './Root';

ReactDOM.render(
  <Root store={store} />, document.getElementById('root'),
);

registerServiceWorker();
