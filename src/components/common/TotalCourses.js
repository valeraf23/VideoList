import React from 'react';
import PropTypes from 'prop-types';

const TotalCourses = ({totalCourses}) => {

  return (
    <div className="bg-primary">
  TotalCourses: {totalCourses}
</div>
  );
};

TotalCourses.propTypes = {
  totalCourses: PropTypes.number.isRequired
};

export default TotalCourses;
