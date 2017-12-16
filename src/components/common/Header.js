import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import LoadingDots from './LoadingDots';
import TotalCourses from './TotalCourses';

const Header = ({loading, totalCourses}) => {
  const activeStyle = { color: 'blue' };
  debugger;
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
    {loading && <i className='fa fa-spinner fa-spin '> </i> }
    {!loading && <TotalCourses totalCourses = {totalCourses}/>}

</div>
  );
};

Header.propTypes = {
  loading: PropTypes.bool.isRequired,
  totalCourses: PropTypes.bool.number
};

export default Header;
