import React, { Component } from 'react';
import './App.css';
import Post from './components/Post';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( 
      <div className="app">
        
        <div className="app__header p-2">
          <img 
            className="app__headerImage"
            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="" 
            />
        </div>

        This is an instagram clone

        <Post/>
        <Post/>
        <Post/>

      </div>
     );
  }
}
 
export default App;