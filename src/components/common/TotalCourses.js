import React from 'react';
import PropTypes from 'prop-types';

const TotalCourses = ({totalCourses}) => {
debugger;
  return (
    <div>
  TotalCourses: {totalCourses}
</div>
  );
};

TotalCourses.propTypes = {
  totalCourses: PropTypes.bool.number
};

export default TotalCourses;
