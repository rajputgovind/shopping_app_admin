import React, { useState } from "react";
import axios from "axios";
import {  StatusCodes } from 'http-status-codes'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CategoryModal = () => {
  const [categoryData, setCategoryData] = useState({
    category:""
  });

  const handleChange =(e)=>{
    setCategoryData({...categoryData,[e.target.name]:e.target.value})
  }

  const handleSubmit = async(e) => {
    try {
      e.preventDefault();
      const resp = await axios.post(`${process.env.REACT_APP_BASE_URL}/categorys`,categoryData)
      if(resp.status===StatusCodes.CREATED)
      {
        toast.success("Category Added",{
          position:"top-center"
        })
       
        setCategoryData({title:""})
      }
      

    } catch (error) {
      toast.error("please fill the category fields",{
        position:"top-center"
      })
     
    }
  };
  return (
    <>
      <div class="modal fade" id="addCategoryModal">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header bg-success text-white">
              <h5 class="modal-title">Add Category</h5>
              <button class="close" data-dismiss="modal">
                <span>&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form onSubmit={handleSubmit}>
                <div class="form-group">
                  <label for="title">Title</label>
                  <input type="text" value={categoryData.category} name='category' class="form-control" onChange={handleChange} />
                </div>

                <div class="modal-footer">
                  <button class="btn btn-success" type="submit">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </>
  );
};

export default CategoryModal;
