import React from 'react';
import CourseListRow from './CourseListRow';
import PropTypes from 'prop-types';
import ArrowSort from '../common/ArrowSort';

const CourseList = ({courses,sortByKey,sort}) => {

  return (
    <table className="table">
      <thead>
      <tr>
        <th>&nbsp;</th>
        <th>Title</th>
        <th>
          <ArrowSort
            sortByKey={sortByKey}
            keyId={"authorId"}
            sort={sort}
            text={'Author'}
          />
        </th>
        <th>
          <ArrowSort
            sortByKey={sortByKey}
            keyId={"category"}
            sort={sort}
            text={'Category'}
          />
        </th>
        <th>
          <ArrowSort
            sortByKey={sortByKey}
            keyId={"length"}
            sort={sort}
            text={'Length'}
          />
        </th>
      </tr>
      </thead>
      <tbody>
      {courses.map(course =>
        <CourseListRow key={course.id} course={course}/>
      )}
      </tbody>
    </table>
  );
};

CourseList.propTypes = {
  courses: PropTypes.array.isRequired,
  sortByKey: PropTypes.func.isRequired,
  sort: PropTypes.object.isRequired
};

export default CourseList;
