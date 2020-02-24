//import React from 'react'
import React, { useState } from 'react'

//const Block = ({ blog, toggleImportance }) => {
const Blog = ({ blog, toggleImportance, blogs, setBlogs, blogService, setErrorMessage, updateLikes, deleteBlog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [showAllBlogs, setShowAllBlogs] = useState(false)

  if (showAllBlogs===true){

    return (
      <div style={blogStyle} className='blog'>
        {blog.title}
        <button onClick={() => setShowAllBlogs(!showAllBlogs)}>
          {showAllBlogs ? 'hide' : 'view' }
        </button>
        <br></br>
        {blog.url}<br></br>
        {blog.likes}
        <button onClick={() => updateLikes(blog) }> Like
        </button>
        <br></br>
        {blog.author}<br></br>
        <button onClick={() => deleteBlog(blog) }> Remove
        </button>
      </div>
    )
  }
  else{

    return (
      <div style={blogStyle} className='blog'>
        {blog.title}
        <button onClick={() => setShowAllBlogs(!showAllBlogs)}>
          {showAllBlogs ? 'hide' : 'view' }
        </button>
        <br></br><br></br>
      </div>
    )}
}

export default Blog