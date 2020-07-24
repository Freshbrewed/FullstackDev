import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
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