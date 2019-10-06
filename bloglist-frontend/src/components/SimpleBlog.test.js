import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, cleanup } from '@testing-library/react'
import Sblog from './SimpleBlog'

afterEach(cleanup)
test('renders content', () => {
  const blogi = {
    title: 'Component testing is done with react-testing-library',
    author: 'Minä',
    likes: 5
  }
  const mockHandler = jest.fn()
  const { getByText } = render(
    <Sblog blog={blogi} onClick={mockHandler}/>
  )


  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)
  expect(mockHandler.mock.calls.length).toBe(2)
})