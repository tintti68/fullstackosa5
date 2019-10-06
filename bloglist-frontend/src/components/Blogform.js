
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'
import { useField } from '../hooks'

const BlogForm = ({ onUpdate }) => {

  const { bind:title, reset:resettitle } = useField('text')
  const { bind:author, reset:resetauthor } = useField('text')
  const { bind:url, reset:reseturl } = useField('text')
  const [newblogvisible, setvisible] = useState('')
  const hideWhenVisible = { display: newblogvisible ? 'none' : '' }
  const showWhenVisible = { display: newblogvisible ? '' : 'none' }

  const onSubmit = event => {

    event.preventDefault()
    const BlogObject = {
      title: title.value,
      author: author.value,
      url: url.value,
    }
    blogService.create(BlogObject).then(data => {
      onUpdate(data)
      resetauthor()
      resettitle()
      reseturl()
    })
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={() => setvisible(true)}>New blog</button>
      </div>
      <div style={showWhenVisible}>
        <h2>Create new</h2>

        <form onSubmit={onSubmit}>
          <div>
            Title
            <input {...title}
            />
          </div>
          <div>
          Author
            <input {...author}
            />
          </div>
          <div>
          Url
            <input {...url}
            />
          </div>
          <button type="submit">create</button>
          <button onClick={() => setvisible(false)}>cancel</button>
        </form>
      </div>
    </div>
  )
}

BlogForm.propTypes = {
  onUpdate: PropTypes.func.isRequired
}

export default BlogForm