import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('renders content', async () => {

  const mockHandler = jest.fn()

  const component = render(
    <BlogForm createBlog={mockHandler} />
  )

  component.debug()

  const button1 = component.getByText('New blog')
  fireEvent.click(button1)

  expect(component.container).toHaveTextContent(
    'Title:'
  )

  expect(component.container).toHaveTextContent(
    'Cancel'
  )
})

test('<BlogForm /> updates parent state and calls onSubmit', async () => {

  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )
  component.debug()

  const button1 = component.getByText('New blog')
  fireEvent.click(button1)

  const title = component.container.querySelector('#title')
  const inputAuthor = component.container.querySelector('#author')
  const inputURL = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'Testing could definitely be easier' }
  })
  fireEvent.change(inputAuthor, {
    target: { value: 'Testing Slave' }
  })
  fireEvent.change(inputURL, {
    target: { value: 'www.testingformdotcom.com' }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Testing could definitely be easier')
  expect(createBlog.mock.calls[0][0].author).toBe('Testing Slave')
  expect(createBlog.mock.calls[0][0].url).toBe('www.testingformdotcom.com')
})