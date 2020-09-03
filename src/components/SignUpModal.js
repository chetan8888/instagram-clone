import React, { Component } from 'react';
import './SignUpModal.css'

const SignUpModal = (props) => {
    return ( 
        <div>
            {props.user ? <div className="btn SignUpButton m-1" data-toggle="modal" data-target="#signup">
                Log Out
            </div>:
            <div className="btn SignUpButton m-1" data-toggle="modal" data-target="#signup">
            Sign Up
            </div>
        }


            <div className="modal fade text-center" id="signup">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title w-100 text-center">Create Your Account</h5>
                        </div>

                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <input 
                                        type="text" 
                                        value={props.username}
                                        placeholder="Enter Username" 
                                        className="form-control m-1"
                                        onChange={props.setUsername}
                                    />
                                </div>

                                <div className="form-group">
                                    <input 
                                        type="text" 
                                        value={props.email}
                                        placeholder="Enter Email" 
                                        className="form-control m-1"
                                        onChange={props.setEmail}
                                    />
                                </div>
                                    
                                <div className="form-group">
                                    <input 
                                        type="text" 
                                        value={props.password}
                                        placeholder="Enter Password" 
                                        className="form-control m-1"
                                        onChange={props.setPassword}
                                    />
                                </div>
                                    
                            </form>
                        </div>

                        <div className="modal-header text-center">
                            <button 
                                className="btn-success fluid" 
                                data-dismiss="modal"
                                onClick={props.handleSubmit}>Submit</button>
                            <button className="btn-danger fluid" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default SignUpModal