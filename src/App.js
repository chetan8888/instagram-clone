import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import Post from './components/Post';
import PostData from './constants/PostData';
import { db, auth } from './firebase';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const posts_elements = posts.map(({ id, post }) => (
    <Post
      key={id} //if we don't provide the keys attribute, all the posts will be rerendered every time a post is changed, added. Having the key attribute allows react to identify which particular component needs to be rerendered.
      username={post.username}
      caption={post.caption}
      imageUrl={post.imageUrl}
    />
  ));

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user has logged in
        console.log(authUser);
        setUser(authUser);
      } else {
        // user has logged out
        setUser(null);
      }
    });

    return () => {
      // perform cleanup actions
      unsubscribe();
    };
  }, [user, username]); // this useEffect() method will run only when one of the elements in this array changes

  // anytime the app is rerendered =, useEffect() method runs
  useEffect(() => {
    db.collection('posts').onSnapshot((snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      );
    });
    // every time the databse changes, onSnapshot method will run. It's a realtime listener.
  }, []);

  const handlesetUsername = (e) => {
    setUsername(e.currentTarget.value);
  };

  const handlesetEmail = (e) => {
    setEmail(e.currentTarget.value);
  };

  const handlesetPassword = (e) => {
    setPassword(e.currentTarget.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));
  }

  return (
    <div className="app">
      <div className="app__header p-2">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        />
      </div>
      <div>
        {user ? (
          <div
            className="btn m-1"
            onClick={() => auth.signOut()}
          >
            Log Out
          </div>
        ) : (
          <div
            className="btn m-1"
            data-toggle="modal"
            data-target="#signup"
          >
            Sign Up
          </div>
        )}
        <div className="modal fade text-center" id="signup">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title w-100 text-center">
                  Create Your Account
                </h5>
              </div>

              <div className="modal-body">
                <div className="container">
                  <form>
                    <input
                      type="text"
                      value={username}
                      placeholder="Enter Username"
                      className="form-control m-1"
                      onChange={handlesetUsername}
                    />

                    <input
                      type="text"
                      value={email}
                      placeholder="Enter Email"
                      className="form-control m-1"
                      onChange={handlesetEmail}
                    />

                    <input
                      type="text"
                      value={password}
                      placeholder="Enter Password"
                      className="form-control m-1"
                      onChange={handlesetPassword}
                    />

                    <button type="submit" onClick={handleSubmit}>
                      Submit
                    </button>
                  </form>
                </div>
              </div>

              <div className="modal-header text-center">
                <button className="btn-danger fluid" data-dismiss="modal">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      This is an instagram clone
      {posts_elements}
    </div>
  );
};

export default App;
