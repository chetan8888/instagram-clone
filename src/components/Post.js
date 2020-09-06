import React, { useEffect, useState } from 'react';
import './Post.css'
import Avatar from "@material-ui/core/Avatar"
import { db } from '../firebase';
import firebase from 'firebase';

const Post = (props) => {
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState('')

  useEffect(() => {
    let unsubscribe
    if (props.postId) {
      unsubscribe = db.collection("posts")
      .doc(props.postId)
      .collection("comments")   //each post doc has its own "comments" collection
      .orderBy('timestamp','desc')
      .onSnapshot((snapshot) => {
        setComments(snapshot.docs.map((doc) => doc.data()))
      })
    }

    return () => {
      unsubscribe()
    }
  },[props.postId]) 

  const postComment = (e) => {
    e.preventDefault()
    db.collection("posts")
    .doc(props.postId)
    .collection("comments")
    .add({
      text: comment,
      username: props.user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setComment("")
  }

  return (
    <div className="post">
      {/* header = avatar + username */}
        <div className="post__header d-flex p-2">
            <Avatar 
                className="post__avatar m-2"
                alt={props.username}
                src="https://source.unsplash.com/random/560*560"
            />
            <h3>{props.username}</h3>
        </div>

      {/* {image} */}
      <img className="post__image" src={props.imageUrl} alt="image not found"/>

      {/* {username+caption} */}
      <h4 className="post__text p-2"><strong>{props.username}:</strong> {props.caption}</h4>

      <div className="post_comments">
        {comments.map((comment) => (
          <p>
            <strong>{comment.username}:</strong> {comment.text}
          </p>
        ))}
      </div>

      {props.user && (
        <form className="row">
        <input type="text" value={comment} placeholder="Add a Comment" className="post__input col-10" onChange={(e) => setComment(e.target.value)}/>  

        <button className="btn post__button btn-success col-2" disabled={!comment} type="submit"
        onClick={postComment}>
          Post
        </button>
      </form> 
      )}
    </div>
  );
};

export default Post;
