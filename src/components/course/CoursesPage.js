import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import * as courseActions from '../../actions/courseActions';
import CourseList from './CourseList';

class CoursesPage extends React.Component{
  constructor(props,context){
    super(props,context);
    this.state = {
           sort: {
               key: undefined,
               // 0 - not ordering
               // 1 - asc
               // 2 - desc
               order: 0
           },
       };
    this.sortByKey = this.sortByKey.bind(this);
    this.sortedData = this.sortedData.bind(this);
    this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
  }

redirectToAddCoursePage() {
  debugger;
     this.props.history.push('/course');
  }

  sortedData() {
         const { key, order } = this.state.sort;

         // Only sort if key is provided & order != 0.
         if (key && order) {
             // Comparison function for "asc" sorting.
             function compare(a, b) {
                 if (a[key] < b[key]) return -1;
                 if (a[key] > b[key]) return 1;
                 return 0;
             }

             // Attention! Sort mutates array, clone first.
             return [...this.props.courses].sort((a, b) => {
                 // Interesting part. Sort in "asc" order. Flip if want "desc" order!
                 return compare(a, b) * (order === 1 ? 1 : -1);
             });
         }

         // Return original data (order = 0)
         return this.props.courses;
     }
     sortByKey(key) {
            return () => {
                const sort = (this.state.sort.key === key)
                    // Key matches, update order
                    ? { key, order: (this.state.sort.order ===1 ? 2: 1)}
                    // Key differs, start with "asc" order
                    : { key, order: 1 };
                this.setState({ sort });
            }
        }

  render(){
    const {courses} = this.props;
    debugger;
    return (
      <div>
         <h1>Videos</h1>
         <input type="submit"
              value="Add Video"
              className="btn btn-primary"
              onClick={this.redirectToAddCoursePage}/>
         <CourseList courses={this.sortedData()} sortByKey={this.sortByKey} sort={this.state.sort}/>
      </div>
    );
  }
}
CoursesPage.propTypes = {
  actions: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired
};

function sortCoursesList(list) {
let newList = Object.assign([],list);
newList.sort((a, b) => a.title.localeCompare(b.title));
debugger;
return newList;
}


function mapStateToProps(state,ownProps){
debugger;
  return {
     courses: sortCoursesList(state.courses)
  };
}

function mapDispatchToProps(dispatch){
  return {
    actions:bindActionCreators(courseActions,dispatch)
  };
}

const connectedStateAndProps = connect(mapStateToProps,mapDispatchToProps);
export default withRouter(connectedStateAndProps(CoursesPage));
