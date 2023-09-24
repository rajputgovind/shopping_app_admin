import React, { useState } from "react";
import axios from "axios";
import { StatusCodes } from "http-status-codes";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";

const UserModalChange = () => {
    const { handleSubmit, reset, formState: { errors }, register } = useForm()




    const postUser = async (data) => {
        try {
            console.log(data)
            const resp = await axios.post(`${process.env.REACT_APP_BASE_URL}/sign-up`, data);

            if (resp.status === StatusCodes.CREATED) {
                // alert("User added successfully");
                toast.success('User added successfully', {
                    position: "top-center"
                })
                reset()
            }
        } catch (error) {
            console.log("user post error", error);
            // alert(error.message);
            toast.error(error.message, {
                position: "top-center"
            })
        }
    };

    return (
        <>
            <div class="modal fade" id="addUserModal">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header bg-warning text-white">
                            <h5 class="modal-title">Add User</h5>
                            <button class="close" data-dismiss="modal">
                                <span>&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form onSubmit={handleSubmit(postUser)}>
                                <div class="form-group">
                                    <label for="name">First Name</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="fname"
                                        {...register('fname', { required: true })}
                                    />
                                    {errors.fname && <p style={{color:"red"}}>First Name is required</p>}
                                </div>
                                <div class="form-group">
                                    <label for="name">Last Name</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="lname"
                                        {...register('lname', { required: true })}
                                    />
                                     {errors.lname && <p style={{color:"red"}}>Last name is required</p>}
                                </div>
                                <div class="form-group">
                                    <label for="email">Email</label>
                                    <input
                                        type="email"
                                        class="form-control"
                                        name="email"
                                        {...register('email', { required: true })}
                                    />
                                     {errors.email && <p style={{color:"red"}}>email is required</p>}
                                </div>
                                <div class="form-group">
                                    <label for="email">Phone</label>
                                    <input
                                        type="phone"
                                        class="form-control"
                                        name="phone"
                                        {...register('phone', { required: true })}
                                    />
                                     {errors.phone && <p style={{color:"red"}}>phone is required</p>}
                                </div>
                                <div class="form-group">
                                    <label for="password">Password</label>
                                    <input
                                        type="password"
                                        class="form-control"
                                        name="password"
                                        {...register('password', { required: true })}
                                    />
                                     {errors.password && <p style={{color:"red"}}>password is required</p>}
                                </div>


                                <div class="modal-footer">
                                    <button class="btn btn-warning" type="submit">
                                        Save Changes
                                    </button>
                                    {/* data-dismiss="modal" */}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default UserModalChange;
