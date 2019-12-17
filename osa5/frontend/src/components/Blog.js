import React from 'react'
const Blog = ({ blog, handleShowBlog, showBlog }) => {

  if(showBlog)
  return (
    <div onClick={handleShowBlog}>
    {blog.title} {blog.url} {blog.likes} added by {blog.author}
  </div>
  )

  if(!showBlog)
  return (
    <div onClick={handleShowBlog}>
    {blog.title} {blog.author}
  </div>
  )
}

export default Blog