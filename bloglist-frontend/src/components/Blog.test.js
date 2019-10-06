import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, cleanup } from '@testing-library/react'
import Sblog from './Blog'

//afterEach(cleanup)
describe('<Togglable />', () => {
  let component

  const blogi = {
    title: 'Component testing is done with react-testing-library',
    author: 'Minä',
    url: 'foo@foo.org',
    likes: 5
  }
  const mockHandler = jest.fn()
  beforeEach(() => {
    component = render(<Sblog blog={blogi} onClick={mockHandler}><div className="testDiv"></div></Sblog>)
  })

  test('renders its children', () => {
    component.container.querySelector('.testDiv')
  })

  test('at start the children are not displayed', () => {
    const div = component.container.querySelector('.togglableContent')
    component.debug()
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, children are displayed', () => {
    const button2 = component.container.querySelector('.notvisible')
    fireEvent.click(button2)
    component.debug()
    const div = component.container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: block')
    expect(div).not.toHaveStyle('display: none')
  })

  test('hide again', () => {
    const button3 = component.container.querySelector('.visible')
    fireEvent.click(button3)
    component.debug()
    const div = component.container.querySelector('.togglableContent')
    expect(div).toHaveStyle('')
  })
})