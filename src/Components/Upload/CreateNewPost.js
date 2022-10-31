import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { signOut } from 'firebase/auth';
import auth from '../../firebase.init';

const CreateNewPost = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const onSubmit = data => {
    const imgbbAPIKey = 'fdc74126c7ea26bb2b526c6ce01f943c';
    const image = data.image[0];
    const formData = new FormData();
    formData.append('image', image);
    const url = `https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`;
    fetch(url, {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(result => {
        if (result.success) {
          const img = result.data.url;
          const postData = {
            postStatus: data.postStatus,
            description: data.description,
            img: img
          }
          console.log(postData);
          // send post data to database
          fetch('http://localhost:5000/post', {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify(postData)
          })
            .then(res => res.json())
            .then(inserted => {
              if (inserted.acknowledged) {
                Swal.fire(
                  'post submit success',
                  '',
                  'success'
                )
                // console.log(inserted);
                reset();
              }
            })
        }
      })
  }
  return (
    <div className="md:w-[400px] w-96 bg-[#fff] shadow-2xl p-4 rounded mx-auto ">
      <div className="header text-center pt-6 ">
        <h1 className='text-2xl  font-serif text-slate-700'>Add Product</h1>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" name="remember" defaultValue="true" />
        <div className="rounded-md shadow-sm -space-y-px">
          <div className="">
            <label htmlFor="postStatus" className="text-slate-700 pt-2">
              Post Status
            </label>
            <input
              id="postStatus"
              name="postStatus"
              type="text"
              autoComplete="postStatus"
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm "
              placeholder="Post Status"
              {...register("postStatus", {
                required: {
                  value: true,
                  message: "Please enter your post status",
                },
              })}
            />
            <label className="">
              {errors.postStatus?.type === "required" && (
                <span className="text-red-500 text-sm pt-2">
                  {errors.postStatus.message}
                </span>
              )}
            </label>
          </div>

          <div className="pt-3">
            <label htmlFor="description" className="text-slate-700 pt-2">
              Post Description
            </label>
            <textarea
              style={{ width: "100%" }}
              name="description"
              id="description"
              cols="62" rows="4"
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm "
              placeholder=" post Description"
              {...register("description", {
                required: {
                  value: true,
                  message: "Please enter your post description",
                }
              })}
            ></textarea>
            <label className="">
              {errors.description?.type === "required" && (
                <span className="text-red-500 text-sm pt-2">
                  {errors.description.message}
                </span>
              )}
            </label>
          </div>
        </div>
        <div>
          <div className="pb-3">
            <label htmlFor="image" className="text-slate-700 pt-2">
              image
            </label>
            <input
              id="image"
              name="image"
              type="file"
              autoComplete="image"
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm "
              placeholder=" product image"
              {...register("image", {
                required: {
                  value: true,
                  message: "Choses Photo",
                }
              })}
            />
            <label className="">
              {errors.image?.type === "required" && (
                <span className="text-red-500 text-sm pt-2">
                  {errors.image.message}
                </span>
              )}
            </label>
          </div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm rounded-md text-white bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 font-bold hoverBtnSpacing"
          >
            Add a new product
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNewPost;