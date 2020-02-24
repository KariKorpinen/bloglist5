import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0,
    })
    setNewBlog('')
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div className="formDiv">
      <h2>Create a new blog</h2>

      <form onSubmit={addBlog}>
        <label htmlFor="title">Title</label><br></br>
        <input id="title" className='title'
          value={newTitle}
          onChange={handleTitleChange}
          label='Title'
        /><br></br>
        <label htmlFor="author">Author</label>
        <br></br>
        <input id="author" className='author'
          value={newAuthor}
          onChange={handleAuthorChange}
          label='Author'
        /><br></br>
        <label htmlFor="url">Url</label>
        <br></br>
        <input id="url" className='url'
          value={newUrl}
          onChange={handleUrlChange}
          label='Url'
        /><br></br><br></br>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default BlogForm