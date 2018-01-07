import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import LoadingDots from './LoadingDots';
import TotalCourses from './TotalCourses';

const Header = ({loading, totalCourses}) => {
  const activeStyle = {color: 'blue'};

  return (
    <div>
      <nav>
        <NavLink to="/" activeStyle={activeStyle} exact>Home</NavLink>
        {" | "}
        <NavLink to="/courses" activeStyle={activeStyle}>Video List</NavLink>
        {" | "}
        <NavLink to="/about" activeStyle={activeStyle}>About</NavLink>
        {loading && <LoadingDots interval={100} dots={20}/>}
      </nav>
      <i className="text-left">
        {loading && <i className="fa fa-spinner fa-spin "/>}
        {!loading && <TotalCourses totalCourses={totalCourses}/>}
      </i>
    </div>
  );
};

Header.propTypes = {
  loading: PropTypes.bool.isRequired,
  totalCourses: PropTypes.number.isRequired
};

export default Header;
