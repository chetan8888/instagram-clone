import React, { useState } from 'react'
import {db, storage} from '../firebase'
import firebase from "firebase";
import './ImageUpload.css'
const ImageUpload = (props) => {
    const [caption,setCaption] = useState('')
    const [progress,setProgress] = useState('')
    const [image,setImage] = useState('')

    const handleCaption = (e) => {
        setCaption(e.target.value)
    }

    const handleSelectFile = (e) => {
        if (e.target.files[0]) {        //this points to the first file we select
            setImage(e.target.files[0])
        }
    }

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image)       //this will upload the file to the database

        uploadTask.on("state_changed", (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100)
            setProgress(progress)
        },
        (error) => {
            console.log(error)
            alert(error.message)
        },
        () => {
            storage.ref("images")
            .child(image.name)
            .getDownloadURL()       //this will provide us the link to the image that was just uploaded to the database
            .then(url => {
                // now we need to add a document to the posts collection
                db.collection("posts").add({
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    caption: caption,
                    imageUrl: url,
                    username: props.username
                })
                setProgress(0)
                setCaption("")
                setImage(null)
            })
        }
        )
    }
    
    return ( 
        <div className="imageupload m-auto row">
            <progress value={progress} max="100" className="imageupload__progress col-12 m-1"></progress>
            <input className="col-12 m-1" type="text" placeholder="Enter a Caption" value={caption} onChange={handleCaption}></input>

            <input className="col-12 m-1" type="file" onChange={handleSelectFile}></input>

            <button className="btn btn-primary m-1" onClick={handleUpload}>Upload</button>

        </div>
     );
}
 
export default ImageUpload;