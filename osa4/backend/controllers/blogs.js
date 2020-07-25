const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })
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

  let decodedToken = null

  try {
    // eslint-disable-next-line no-undef
    decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) return response.status(401).json({ error: 'token missing or invalid' })
  } catch(exception) {
    next(exception)
  }

  const user = await User.findById(decodedToken.id)
  const blogToDelete = await Blog.findById(request.params.id)

  if (blogToDelete === null ) return response.status(400).json({ error: 'invalid blog ID' })

  if ( blogToDelete.user.toString() === user.id.toString()) {
    try {
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    } catch (exception) {
      next(exception)
    }
  } else {
    return response.status(401).json({ error: ' user can delete only it`s own blogs' })
  }
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  let decodedToken = null

  try {
    // eslint-disable-next-line no-undef
    decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) return response.status(401).json({ error: 'token missing or invalid' })
  } catch(exception) {
    next(exception)
  }

  const user = await User.findById(decodedToken.id)

  if (body.title.length === 0 ||
     body.author.length === 0) {
    return response.status(400).end()
  }

  const blog = new Blog({
    url: body.url,
    title: body.title,
    author: body.author,
    user: user._id,
    likes: body.likes || 0,
  })

  try {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
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