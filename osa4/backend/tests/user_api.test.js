const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})
  const user = new User({ username: 'root', password: 'root' })
  await user.save()
})

describe('when there is initially one user at db', () => {
  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'testUser',
      name: 'User Test',
      password: '123',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('new user creation fails with short username field', async() => {
    const usersAtStart = await helper.usersInDb()

    const badUser = {
      username: 'ba',
      name: 'Too Short Username',
      password: '123',
    }

    await api
      .post('/api/users')
      .send(badUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('new user creation fails with short password field', async() => {
    const usersAtStart = await helper.usersInDb()

    const badUser = {
      username: 'bad',
      name: 'Too Short Password',
      password: '12',
    }

    await api
      .post('/api/users')
      .send(badUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('new user creation fails with null username', async() => {
    const usersAtStart = await helper.usersInDb()

    const badUser = {
      username: null,
      name: 'I am null',
      password: '12345',
    }

    await api
      .post('/api/users')
      .send(badUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('new user creation fails with null password', async() => {
    const usersAtStart = await helper.usersInDb()

    const badUser = {
      username: 'nullpassword',
      name: 'I am null',
      password: null,
    }

    await api
      .post('/api/users')
      .send(badUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('new user creation fails with no username field', async() => {
    const usersAtStart = await helper.usersInDb()

    const badUser = {
      name: 'Where´s my username?',
      password: '123456',
    }

    await api
      .post('/api/users')
      .send(badUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('new user creation fails with no password field', async() => {
    const usersAtStart = await helper.usersInDb()

    const badUser = {
      username: 'lostpassword',
      name: 'Where´s my password?',
    }

    await api
      .post('/api/users')
      .send(badUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})