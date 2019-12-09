const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', async (request, response, next) => {
  try{
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.json(blog.toJSON())
    } else {
      response.status(404).end()
    }
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  if (request.body.title.length === 0 ||
     request.body.author.length === 0) {
    return response.status(400).end()
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    likes: body.likes || 0
  })
  try {
    const savedBlog = await blog.save()
    response.json(savedBlog.toJSON())
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    likes: body.likes
  }
  try {
    const blogToUpdate = await Blog
      .findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(blogToUpdate.toJSON())
  } catch(exception) {
    next(exception)
  }
})

module.exports = blogsRouter