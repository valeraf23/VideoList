import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import * as courseActions from '../../actions/courseActions';
import CourseList from './CourseList';
import ReactPaginate from 'react-paginate';
import {chunkify} from '../common/commonTools';

class CoursesPage extends React.Component{

  static getPageCount(courses){

    const c=3;
    let count = courses.length;
    let a =  Math.floor(count/c);
    let b  =count%c===0?0:1;
    return a+b;
  }

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
           views:{
              currentPage: 0,
              totalPage:1
           }
       };
    this.sortByKey = this.sortByKey.bind(this);
    this.sortedData = this.sortedData.bind(this);
    this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
    this.handlePageClick=this.handlePageClick.bind(this);
    CoursesPage.getPageCount=CoursesPage.getPageCount.bind(this);
    this.getViewList=this.getViewList.bind(this);
    this.setTotalPages=this.setTotalPages.bind(this);
    this.compare=this.compare.bind(this);
  }
componentWillMount(){

    this.setTotalPages(this.props.courses);
}

componentWillReceiveProps(nextProps){

    this.setTotalPages(nextProps.courses);
}
getViewList(courses){
    let currentPage = this.state.views.currentPage;
    let total = this.state.views.totalPage;
    return chunkify(courses,total)[currentPage];
}

setTotalPages(courses){
  let total = CoursesPage.getPageCount(courses);

    this.setState((prevState) => {
    return {views:{
       currentPage: prevState.views.currentPage,
       totalPage:total
    }
    };
  });
}
redirectToAddCoursePage() {
     this.props.history.push('/course');
  }
  // Comparison function for "asc" sorting.
   compare(a, b) {
     const { key } = this.state.sort;
    if (a[key] < b[key]) return -1;
    if (a[key] > b[key]) return 1;
    return 0;
  }
     sortedData(data) {
            const { key, order } = this.state.sort;

            // Only sort if key is provided & order != 0.
            if (key && order) {
                // Attention! Sort mutates array, clone first.
                return [...data].sort((a, b) => {
                    // Interesting part. Sort in "asc" order. Flip if want "desc" order!
                    return this.compare(a, b) * (order === 1 ? 1 : -1);
                });
            }

            // Return original data (order = 0)
            return data;
        }
     sortByKey(key) {
            return () => {
                const sort = (this.state.sort.key === key)
                    // Key matches, update order
                    ? { key, order: (this.state.sort.order ===1 ? 2: 1)}
                    // Key differs, start with "asc" order
                    : { key, order: 1 };
                this.setState({ sort });
            };
        }

        handlePageClick(data){
        this.setState((prevState) => {
        return {views:{
           currentPage: data.selected,
           totalPage:prevState.views.totalPage
        }
        };
      });
        }

  render(){
    const displauedCourses = this.sortedData(this.getViewList(this.props.courses));
    const {views} = this.state;
    return (
            <div>
         <h1>Videos</h1>
         <input type="submit"
              value="Add Video"
              className="btn btn-primary"
              onClick={this.redirectToAddCoursePage}/>

         <CourseList courses={displauedCourses} sortByKey={this.sortByKey} sort={this.state.sort}/>
         <ReactPaginate previousLabel={"previous"}
                      nextLabel={"next"}
                      breakLabel={<a href="">...</a>}
                      breakClassName={"break-me"}
                      pageCount={views.totalPage}
                      marginPagesDisplayed={1}
                      pageRangeDisplayed={3}
                      onPageChange={this.handlePageClick}
                      containerClassName={(views.totalPage === 1 ? "pagination hidden" : "pagination" )}
                      subContainerClassName={"pages pagination"}
                      forcePage={0}
                      activeClassName={"active"} />
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

return newList;
}


function mapStateToProps(state){

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
