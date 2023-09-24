import React, { useEffect, useState } from "react";
import axios from "axios";
import { StatusCodes } from "http-status-codes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";

const PostModalChange = () => {
    const { handleSubmit, register, formState: { errors }, reset } = useForm();
    const [getCategory, setCategory] = useState([]);

    const postProduct = async (data) => {
        try {
            console.log(data.pImage[0])
            const userId = localStorage.getItem("_id")
            const formData = new FormData();

            formData.append("pName", data.pName);
            formData.append("pPrice", data.pPrice);
            formData.append("pImage", data.pImage[0]);
            formData.append('categoryId', data.categoryId)
            formData.append("pDescription", data.pDescription);

            const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/products`, formData);
            if (res.status === StatusCodes.CREATED) {

                toast.success("Post Added Successfully", {
                    position: "top-center",
                });
                reset()
            }

            console.log(res);

        } catch (error) {

            console.log("product post error", error)
            toast.error("error in post products", {
                position: "top-center",
            });
        }
    };

    const getCategoryName = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/categorys`);
            // console.log("res=>", res);
            setCategory(res.data);

        } catch (error) {
            console.log("error in find category", error)
         }
    };

    useEffect(() => {
        getCategoryName();
    }, []);

    return (
        <>
            <div class="modal fade" id="addPostModal">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header bg-primary text-white">
                            <h5 class="modal-title">Add Product</h5>
                            <button class="close" data-dismiss="modal">
                                <span>&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form onSubmit={handleSubmit(postProduct)}>
                                <div class="form-group">
                                    <label for="title">Product Name</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="pName"
                                        {...register('pName', { required: true })}
                                    />
                                    {errors.pName && <p style={{color:"red"}}>Product Name is required</p>}
                                </div>
                                <div class="form-group">
                                    <label for="title">Product Price</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="pPrice"
                                       {...register('pPrice', { required: true })}
                                    />
                                    {errors.pPrice && <p style={{color:"red"}}>Product Price is required</p>}
                                </div>
                                <div class="form-group">
                                    <label for="category">Category</label>
                                    <select
                                        className="form-control"
                                       {...register("categoryId", { required: true })}
                                        name="categoryId"
                                    >
                                        <option value=""> Select Category</option>
                                        {getCategory.length &&
                                            getCategory?.map((name) => (
                                                <option key={name._id} value={name._id}>
                                                    {name.category}
                                                </option>
                                            ))}
                                    </select>
                                    {errors.categoryId && <p style={{color:"red"}}>Product category is required</p>}
                                </div>
                                <div class="form-group">
                                    <label for="pImage">Upload Image</label>
                                    <div class="custom-file">
                                        <input
                                            type="file"
                                            class="custom-file-input"
                                            id="pImage"
                                            name="pImage"
                                           {...register('pImage', { required: true })}
                                        />

                                        <label for="image" class="custom-file-label">
                                            Choose File
                                        </label>
                                        {errors.pImage && <p style={{color:"red"}}>Product Image is required</p>}
                                    </div>
                                    <small class="form-text text-muted">Max Size 3mb</small>
                                </div>
                                <div class="form-group">
                                    <label for="body">Description</label>
                                    <textarea
                                        class="form-control"

                                        name="pDescription"

                                        {...register('pDescription', { required: true })}
                                    ></textarea>
                                    {errors.pDescription && <p style={{color:"red"}}>Product Description is required</p>}
                                </div>

                                <div class="modal-footer">
                                    <button type="submit" class="btn btn-primary">
                                        Save Changes
                                    </button>
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

export default PostModalChange;
