/*eslint-disable import/default */
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import './styles/styles.css'; //Webpack can import CSS files too!
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import '../node_modules/toastr/build/toastr.min.css';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import {loadCourses} from './actions/courseActions';
import {loadAuthors} from './actions/authorActions';

const store = configureStore();
store.dispatch(loadCourses());
store.dispatch(loadAuthors());

  ReactDOM.render((
    <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
    </Provider>
  ),  document.getElementById('app'));
