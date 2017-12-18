import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const courses = [
  {
    id: "memtrix-all-you-are",
    title: "Memtrix - All You Are",
    watchHref: "https://www.youtube.com/watch?v=LSxzzDE38t8",
    authorId: "MrSuicideSheep",
    length: "5:26",
    category: "Music"
  },
  {
    id: "needed-you",
    title: "Illenium - Needed You (feat. Dia Frampton)",
    watchHref: "https://www.youtube.com/watch?v=96lCUfORlOo",
    authorId: "MrSuicideSheep",
    length: "5:05",
    category: "Music"
  },
  {
    id: "illenium-lost",
    title: "Illenium - Lost (ft. Emilie Brandt)",
    watchHref: "https://www.youtube.com/watch?v=S_5IMBT5Elw",
    authorId: "MrSuicideSheep",
    length: "3:20",
    category: "Music"
  },
  {
    id: "the-way",
    title: "Zack Hemsey - `The Way`",
    watchHref: "https://www.youtube.com/watch?v=Nco7qfrPG7I",
    authorId: "ZackHemsey",
    length: "7:05",
    category: "Music"
  },
  {
    id: "web-components-shadow-dom",
    title: "Web Component Fundamentals",
    watchHref: "http://www.pluralsight.com/courses/web-components-shadow-dom",
    authorId: "cory-house",
    length: "5:10",
    category: "HTML5"
  },
  {
    id: "end-of-an-era",
    title: "Zack Hemsey - `End Of An Era (Our Humanity)`",
    watchHref: "https://www.youtube.com/watch?v=ayOJAH2ej5I",
    authorId: "ZackHemsey",
    length: "1:40",
    category: "Music"
  }
];

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (course) => {
  return replaceAll(course.title, ' ', '-');
};

class CourseApi {
  static getAllCourses() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], courses));
      }, delay);
    });
  }

  static saveCourse(course) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minCourseTitleLength = 1;
        if (course.title.length < minCourseTitleLength) {
          reject(`Title must be at least ${minCourseTitleLength} characters.`);
        }

        if (course.id) {
          const existingCourseIndex = courses.findIndex(a => a.id == course.id);
          courses.splice(existingCourseIndex, 1, course);
        } else {
          //Just simulating creation here.
          //The server would generate ids and watchHref's for new courses in a real app.
          //Cloning so copy returned is passed by value rather than by reference.
          course.id = generateId(course);
          //course.watchHref = `http://www.pluralsight.com/courses/${course.id}`;
          courses.push(course);
        }

        resolve(Object.assign({}, course));
      }, delay);
    });
  }

  static deleteCourse(courseId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const indexOfCourseToDelete = courses.findIndex(course => {
          course.courseId == courseId;
        });
        courses.splice(indexOfCourseToDelete, 1);
        resolve();
      }, delay);
    });
  }
}

export default CourseApi;
