const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
  Blog.find({}).then(blogs => {
    response.json(blogs)
  })
})

blogsRouter.post('/', (request, response, next) => {
  console.log(request.body)
  const blog = new Blog(request.body)

  blog.save().then(savedBlog => {
    response.status(201).json(savedBlog.toJSON())
  })
    .catch(error => next(error))
})

module.exports = blogsRouter