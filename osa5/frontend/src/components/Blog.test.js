import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    author: 'Johnny Mnemonick',
    title: 'Is this title passing the test?'
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Is this title passing the test?'
  )

  expect(component.container).toHaveTextContent(
    'Johnny Mnemonick'
  )
})

test('after clicking View button, blog url is displayed', async () => {
  const blog = {
    author: 'Johnny Clicktester',
    title: 'The test of View click',
    url: 'www.example.com',
    user: 'ernseppa'
  }

  const loggedUser = {
    user: 'ernseppa'
  }

  const component = render(
    <Blog blog={blog} loggedUser={loggedUser} />
  )

  //component.debug()

  const button = component.getByText('View')
  fireEvent.click(button)

  const div = component.container.querySelector('.owner')
  expect(div).toHaveTextContent('www.example.com')
})

test('after clicking View button, blog likes is displayed with a count', async () => {
  const blog = {
    author: 'Miles Likes',
    title: 'Do I see Like counter?',
    likes: 5,
    user: 'miles123'
  }

  const loggedUser = {
    user: 'miles123'
  }

  const component = render(
    <Blog blog={blog} loggedUser={loggedUser} />
  )
  //component.debug()

  const button = component.getByText('View')
  fireEvent.click(button)

  const div = component.container.querySelector('.likeCount')
  expect(div).toHaveTextContent('Likes 5')
})

test('clicking Like button twice calls event handler twice', async () => {
  const blog = {
    author: 'Double Like',
    title: 'Liking Twice',
    likes: 0,
    user: 'db2'
  }

  const loggedUser = {
    user: 'db2'
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} loggedUser={loggedUser} likedBlog={mockHandler} />
  )

  const button1 = component.getByText('View')
  fireEvent.click(button1)

  const button2 = component.getByText('Like')

  fireEvent.click(button2)
  fireEvent.click(button2)

  expect(mockHandler.mock.calls).toHaveLength(2)
})