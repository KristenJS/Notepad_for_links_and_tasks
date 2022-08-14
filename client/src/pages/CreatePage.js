import React, { useContext, useEffect, useState, useCallback } from 'react';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './CreatePage.css'

const CreatePage = () => {
  const auth = useContext(AuthContext)
  const navigate = useNavigate();
  const { request } = useHttp()
  const [link, setLink] = useState('')

  const [text, setText] = useState('')
  const [todos, setTodos] = useState([])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const getTodos = useCallback(async () => {
    try {
      const data = await request('/api/todo', 'GET', null, {
        Authorization: `Bearer ${auth.token}`
      })
      setTodos(data)
    } catch (e) { }
  }, [auth.token, request])

  useEffect(() => {
    getTodos()
  }, [getTodos])

  const createTodo = useCallback(async () => {
    if (!text) return null
    try {
      const todo = await request('/api/todo/add', 'POST', { text, userId: auth.userId }, {
        Authorization: `Bearer ${auth.token}`
      })
      setTodos([...todos], todo)
      setText('')
      getTodos()
    } catch (e) { }
  }, [text, auth.userId, auth.token, request, todos, getTodos])


  const removeTodo = useCallback(async (id) => {
    try {
      await request(`/api/todo/delete/${id}`, 'DELETE', { id }, {
        Authorization: `Bearer ${auth.token}`
      })
      getTodos()
    } catch (e) { }
  }, [auth.token, request, getTodos])

  const completedTodo = useCallback(async (id) => {
    try {
      const todo = await request(`/api/todo/completed/${id}`, 'PUT', { id }, {
        Authorization: `Bearer ${auth.token}`
      })
      setTodos([...todos], todo)
      getTodos()
    } catch (e) { }
  }, [auth.token, request, todos, getTodos])

  const importantTodo = useCallback(async (id) => {
    try {
      const todo = await request(`/api/todo/important/${id}`, 'PUT', { id }, {
        Authorization: `Bearer ${auth.token}`
      })
      setTodos([...todos], todo)
      getTodos()
    } catch (e) { }
  }, [auth.token, request, todos, getTodos])


  const pressHandler = async (event) => {
    if (event.key === 'Enter') {
      try {
        const data = await request('/api/link/generate', 'POST', { from: link }, {
          Authorization: `Bearer ${auth.token}`
        })
        console.log(data)
        navigate(`/detail/${data.link._id}`)
      } catch (e) { }
    }
  }

  return (
    <div className='main'>
      <h5>Links</h5>
      <input
        placeholder="Enter link and press Enter"
        id="link"
        type="text"
        value={link}
        onChange={e => setLink(e.target.value)}
        onKeyPress={pressHandler}
      />

      <form onSubmit={e => e.preventDefault()}>
        <h5>Add task</h5>
        <div className="input-field" style={{ marginTop: '0px' }}>
          <input
            id='text'
            type='text'
            name='input'
            value={text}
            onChange={e => setText(e.target.value)}
          />
          <label htmlFor="link">Task</label>
        </div>
        <button
          className='waves-effect waves-light btn indigo lighten-1'
          onClick={createTodo}
        >
          Add
        </button>

        <div style={{ paddingTop: '2rem' }}>
          <h5>Active tasks</h5>
          <div className='todos'>
            {
              todos.map((todo, index) => {
                let cls = ['todos-item']

                if (todo.completed) {
                  cls.push('completed')
                }

                if (todo.important) {
                  cls.push('important')
                }

                return (
                  <div className={cls.join(' ')} key={index}>
                    <div className='col todos-num'>{index + 1 + '.'}</div>
                    <div className='col todos-text'>{todo.text}</div>
                    <div className='col todos-buttons'>
                      <i className="material-icons blue-text" onClick={() => completedTodo(todo._id)}>check</i>
                      <i className="material-icons orange-text " onClick={() => importantTodo(todo._id)}>warning</i>
                      <i className="material-icons red-text" onClick={() => removeTodo(todo._id)}>delete</i>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </form>

    </div>
  )
};

export default CreatePage;