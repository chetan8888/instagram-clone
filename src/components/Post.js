import React, { Component } from 'react';
import './Post.css'
import Avatar from "@material-ui/core/Avatar"

const Post = () => {
  return (
    <div className="post">
      {/* header = avatar + username */}
        <div className="post__header d-flex p-2">
            <Avatar 
                className="post__avatar m-2"
                alt='Cristiano'
                src="post__image" src="https://source.unsplash.com/random/560*560"
            />
            <h3>Username</h3>
        </div>

      {/* {image} */}
      <img className="post__image" src="https://source.unsplash.com/random/560*560" alt="image not found"/>

      {/* {username+caption} */}
      <h4 className="post__text p-2"><strong>username:</strong> caption</h4>
    </div>
  );
};

export default Post;
