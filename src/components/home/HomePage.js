import React from 'react';
import { Link } from 'react-router-dom';

class HomePage extends React.Component{

render(){
  return (
    <div className ="jumbotron">
      <h1>VF video courses List</h1>
      <p>React, redux and Router in ES6 for ulta responsive web app.</p>
      <Link to="about" className="btn btn-primary btn-lg">Learn more</Link>
    </div>
   );
 }
}
export default HomePage;
