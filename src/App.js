import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Footer from './components/Footer'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [ notification, setNotification ] = useState(null)

  const blogFormRef = React.createRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      blogService
        .getAll()
        .then(blogs => setBlogs( blogs.sort((a, b) => b.likes - a.likes)
        ))

    } catch (exception) {
      //setErrorMessage('wrong credentials')
      notifyWith('User name or password wrong', 'error')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const handleLoginOut = async (event) => {
    console.log('logging out', username, password)
    try {
      window.localStorage.clear()

      blogService.setToken('')
      setUser(null)
      setShowAll(false)
      setBlogs([])
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      notifyWith('Log out problems', 'error')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBLog = (blogObject) => {
    blogFormRef.current.toggleVisibility()

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })
      notifyWith(`title ${blogObject.title} added`)
  }

  const deleteBlog = (blogObject) => {
    const id = blogObject.id
    const blog = blogs.find(n => n.id === id)
      
    if (blog.user)
    {
      if (window.confirm(`delete title ${blog.title}`)) {
        blogService
          .remove(id)
          .catch(() => {
            setErrorMessage(
              `Blog '${blog.title}' was already removed from server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
        setBlogs(blogs.filter(n => n.id !== id))
        notifyWith('Blog deleted')
      }}
  }

  const updateLikes = (blogObject) => {

    console.log('update likes object id ', blogObject.id)
    console.log('update likes object ', blogObject)
    let likes2 = blogObject.likes
    console.log('likes before ', likes2)
    likes2 = likes2 + 1
    console.log('likes after ', likes2)

    const id = blogObject.id
    const blog = blogs.find(n => n.id === id)
    console.log('update likes blog ', blog)
    console.log('update likes user id ', blog.user.id)

    const changedBlog = {
      user: blog.user.id,
      likes: likes2,
      //likes: blogObject.likes+1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    console.log('update likes')

    blogService
      .update(id, changedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      })
      .catch(() => {
        setErrorMessage(
          `Blog '${blog.likes}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
    notifyWith('Likes updated')
  }

  const notifyWith = (message, type='success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const loginForm = () => (
    <Togglable buttonLabel='login'>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBLog}/>
    </Togglable>
  )

  const blogsToShow = showAll
    ? blogs
    : blogs.filter(blog => blog.user)

  return (
    <div>
      <h1>Blogs</h1>
      <Notification notification={notification} />

      {user === null ?
        loginForm() :
        <div>
          {user.name}logged in
          <button onClick={() => setUser(null)}>
             show { window.localStorage.clear()}
          </button>
          <button onClick={() => handleLoginOut()}>
             Log out
          </button>
          {blogForm()}
        </div>
      }
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'user blogs' : 'all blogs' }
        </button>
      </div>
      <ul>

        {blogsToShow.map((blog, i) =>
          <Blog blogs={blogs} setBlogs={setBlogs}
            blogService={blogService} setErrorMessage={setErrorMessage}
            updateLikes={updateLikes}
            deleteBlog={deleteBlog}
            user={user}
            key={i}
            blog={blog}

          />
        )}
      </ul>

      <Footer />
    </div>
  )
}


export default App