import React from 'react'
const Blog = ({ blogs, handleShowBlog, showBlog }) => {

  if(showBlog)
  return (
    <div>
              {blogs.map(blog =>
             <div onClick={handleShowBlog} key={blog.id}> 
                  {blog.title} {blog.author}
            </div>
          )}
  </div>
  )

  if(!showBlog)
  return (
    <div>
              {blogs.map(blog =>
             <div onClick={handleShowBlog} key={blog.id}>
                   {blog.title} {blog.url} {blog.likes} added by {blog.author}
              </div>
          )}
  </div>
  )
}

export default Blog