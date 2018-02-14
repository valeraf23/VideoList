import React from 'react';

class AboutPage extends React.Component {

  shouldComponentUpdate(nextProps, nextState){
    return false;
  }

  render() {
    return (
      <div>
        <h1>About</h1>
        <p>This application was created for training purposes</p>
      </div>
    );
  }
}

export default AboutPage;
