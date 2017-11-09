import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
import createHistory from 'history';
import CoursesPage from './components/course/CoursesPage';
import ManageCoursePage from './components/course/ManageCoursePage'; //eslint-disable-line import/no-named-as-default

const Routes = () => (
<div>
  <Switch history={createHistory}>
    <Route exact path="/" component={HomePage}/>
    <Route path="/about" component={AboutPage}/>
	  <Route path="/courses" component={CoursesPage}/>
    <Route exact path="/course" component={ManageCoursePage}/>
    <Route path="/course/:id" component={ManageCoursePage} />
  </Switch>
</div>
);

export default Routes;
