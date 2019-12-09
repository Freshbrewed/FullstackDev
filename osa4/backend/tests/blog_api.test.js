const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')


beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body.length).toBe(helper.initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')

  const titles = response.body.map(element => element.title)

  expect(titles).toContain('Type wars')
})

test('a specific blog can be viewed', async() => {
  const blogsAtStart = await helper.blogsInDb()

  const blogToView = blogsAtStart[0]

  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  //Typeof blogToView.id is an Object
  blogToView.id = blogToView.id.toString()

  expect(resultBlog.body).toEqual(blogToView)
})

test('a valid blog can be added ', async () => {
  const newBlog = {
    title: 'async/await simplifies making async calls',
    author: 'Test user',
    url: 'http://example.com',
    likes: 8,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

  const contents = blogsAtEnd.map(element => element.title)
  expect(contents).toContain(
    'async/await simplifies making async calls'
  )
})

test('if likes are not defined, default value is 0 ', async () => {
  const newBlog = {
    title: 'Like testing',
    author: 'Test user',
    url: 'http://example.com',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

  const contents = blogsAtEnd.map(element => element.title)
  expect(contents).toContain(
    'Like testing'
  )

  expect(blogsAtEnd[3].title).toBe('Like testing')
  expect(blogsAtEnd[3].likes).toBe(0)
})

test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length -1)

  const contents = blogsAtEnd.map(element => element.title)
  expect(contents).not.toContain(blogToDelete.title)
})

test('a blog without a title is not added', async () => {
  const noTitleBlog = {
    title: '',
    author: 'Unknown',
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(noTitleBlog)
    .expect(400)

  const response = await api.get('/api/blogs')

  expect(response.body.length).toBe(helper.initialBlogs.length)
})

test('a blog without an author is not added', async () => {
  const noAuthorBlog = {
    title: 'Where`s author?',
    author: '',
    likes: 2
  }

  await api
    .post('/api/blogs')
    .send(noAuthorBlog)
    .expect(400)

  const response = await api.get('/api/blogs')

  expect(response.body.length).toBe(helper.initialBlogs.length)
})

test('retrieved blogs have an id field which is defined', async () => {
  const blogs = await helper.blogsInDb()

  expect(blogs.length).toBe(3)

  expect(blogs[0].id).toBeDefined()
  expect(blogs[1].id).toBeDefined()
  expect(blogs[2].id).toBeDefined()
})

test('likes can be updated on an already defined blog post', async () => {
  const blogs = await helper.blogsInDb()
  const firstBlog = blogs[0]

  expect(firstBlog.likes).toBe(7)

  firstBlog.likes = 200

  await api
    .put(`/api/blogs/${firstBlog.id}`)
    .send(firstBlog)
    .expect(200)

  const updatedBlogs = await helper.blogsInDb()
  expect(updatedBlogs[0].likes).toBe(200)

})

afterAll(() => {
  mongoose.connection.close()
})