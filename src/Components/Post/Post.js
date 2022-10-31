/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';

const Post = () => {
  const [postData, setPost] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/post', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => setPost(data))
  },[])
  console.log(postData);
  return (
    <div>
      <div className="total_post">
        <div className="">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center justify-between">
            {
                postData.map(p =>{
                <>
                {
                  console.log(p.postStatus)
                }
                <h1>{p.postStatus}</h1>
                </>
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;