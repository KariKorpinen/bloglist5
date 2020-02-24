import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import Blog from './Blog'

test('after <BlogForm /> have add new blog, it shows title ans author afteronSubmit', () => {
  
  const createBlog = {
    title: 'testing of forms could be easier',
    author: 'Blogger1',
    url: 'www.url1',
    likes: 1
  } 
 
  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const input = component.container.querySelector('.title')
  const form = component.container.querySelector('form')

  fireEvent.change(input, { 
    target: { value: 'testing of forms could be easier' } 
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls.length).toBe(1)
  expect(createBlog.mock.calls[0][0].content).toBe('testing of forms could be easier' )
})