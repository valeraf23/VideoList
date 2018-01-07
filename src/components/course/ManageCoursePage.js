import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Redirect,Prompt} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';
import {authorsFormattedForDropdown} from '../../selectors/selectors';
import toastr from 'toastr';

export class ManageCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      course: Object.assign({}, this.props.course),
      errors: {},
      saving: false,
      deleting: false,
      redirect: false,
      dirty: false
    };

    this.saveCourse = this.saveCourse.bind(this);
    this.updateCourseState = this.updateCourseState.bind(this);
    this.deleteCourse = this.deleteCourse.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    debugger;
    if (this.props.course.id !== nextProps.course.id) {
      // Necessary to populate form when existing course is loaded directly.
      this.setState({course: Object.assign({}, nextProps.course)});
    }
  }

  updateCourseState(event) {
    const field = event.target.name;
    let course = this.state.course;
    course[field] = event.target.value;
    return this.setState({course: course, dirty: true});
  }

  courseFormIsValid() {
    let formIsValid = true;
    let errors = {};

    if (this.state.course.title.length < 5) {
      errors.title = 'Title must be at least 5 characters.';
      formIsValid = false;
    }

    this.setState({errors: errors});
    return formIsValid;
  }

  saveCourse(event) {
    event.preventDefault();

    if (!this.courseFormIsValid()) {
      return;
    }

    this.setState({saving: true});
    this.props.actions.saveCourse(this.state.course)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }

  deleteCourse(event) {
    event.preventDefault();
    debugger;

    this.setState({deleting: true});
    this.props.actions.deleteCourse(this.state.course.id)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({deleting: false});
      });
  }

  redirect() {
    let msg;
    debugger;
    if (this.state.saving) {
      msg = 'Video saved.'
    }
    if (this.state.deleting) {
      msg = 'Video deleted.'
    }
    this.setState({saving: false, deleting: false, redirect: true, dirty: false});
    toastr.success(msg);
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/courses"/>;
    }

    return (
      <div>
        <Prompt when={this.state.dirty} message={"You have unsaved changes." + "\n" + "Are you sure?"}/>
        <CourseForm
          course={this.state.course}
          onChange={this.updateCourseState}
          onSave={this.saveCourse}
          errors={this.state.errors}
          allAuthors={this.props.authors}
          saving={this.state.saving}
          onDelete={this.deleteCourse}
          deleting={this.state.deleting}
        />
      </div>
    );
  }
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

function getCourseById(courses, id) {
  const course = courses.filter(course => course.id === id);
  if (course) return course[0]; //since filter returns an array, have to grab the first.
  return null;
}

function mapStateToProps(state, ownProps) {
  const courseId = ownProps.match.params.id; // from the path `/course/:id`
  debugger;
  let course = {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''};

  if (state.courses.findIndex(x => x.id == courseId) > 0) {
    course = getCourseById(state.courses, courseId);
  }

  return {
    course: course,
    authors: authorsFormattedForDropdown(state.authors)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
