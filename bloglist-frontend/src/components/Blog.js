import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog , onUpdate, user, onRemove }) => {
  const [visible, setVisible] = useState(false)
  const [showremove, setremove] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const allowremove = { display: showremove ? '' : 'none' }


  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const like = () => {
    blog.likes = blog.likes + 1
    blogService.update(blog).then(data => {
      onUpdate(data)
    })
  }

  const remove = () => {
    blogService.dellaus(blog).then(data => {
      onRemove(blog)
    })
  }

  var uname = 'tuntematon'
  if(blog.user){
    console.log(user)
    uname = blog.user.name
    if(user.username===blog.user.username){
      if(!showremove){
        setremove(true)
      }
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}  className='blog'>
      <div style={hideWhenVisible}>
        <div onClick={toggleVisibility} className="notvisible">
          {blog.title} {blog.author}
        </div>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        <div onClick={toggleVisibility} className="visible">
          {blog.title}  {blog.author}  {blog.url}
          <br/>
          {blog.likes} likes
          <button onClick={like}>Like</button>
          <br/>
        added by {uname}
          <br/>
          <div style={allowremove}>
            <button onClick={remove}>Remove</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Blog