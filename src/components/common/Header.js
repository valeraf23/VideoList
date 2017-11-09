import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import LoadingDots from './LoadingDots';

const Header = ({loading}) => {
  const activeStyle = { color: 'blue' };
  debugger;
  return (
    <div>
    <nav>
      <NavLink to="/" activeStyle={activeStyle} exact>Home</NavLink>
      {" | "}
      <NavLink to="/courses" activeStyle={activeStyle}>Courses</NavLink>
      {" | "}
      <NavLink to="/about" activeStyle={activeStyle}>About</NavLink>
      {loading && <LoadingDots interval={100} dots={20}/>}
    </nav>
</div>
  );
};

Header.propTypes = {
  loading: PropTypes.bool.isRequired
};

export default Header;
