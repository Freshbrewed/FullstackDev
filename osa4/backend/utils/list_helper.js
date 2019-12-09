/* eslint-disable no-unused-vars */

const dummy = (blogs) => {
  return 1
}



const totalLikes = (blogs) => {
  if (blogs.length === 0) return 0
  const likes = blogs.map(element => element.likes)
  const combinedLikes = likes.reduce((sum, element) => {
    return sum + element
  }, 0)
  return combinedLikes
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null
  const blogWithMostLikes = blogs.reduce((previous, current) => {
    return (previous.likes > current.likes) ? previous : current
  }, 0)
  return blogWithMostLikes
}


const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  const authors = blogs.map(blog => blog.author)
  const winningAuthor = authors.sort((a, b) => {
    authors.filter(element => element === a).length
    - authors.filter(element => element ===b).length
  }).pop()
  const authorWithBlogs = blogs.filter(blog => blog.author === winningAuthor)

  let count = 0
  authorWithBlogs.forEach(() => {
    count += 1
  })
  return [
    {
      author: winningAuthor,
      blogs: count
    }
  ]
}



module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
}