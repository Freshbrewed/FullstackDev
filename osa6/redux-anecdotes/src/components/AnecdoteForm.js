import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange, removeNotification } from '../reducers/notificationReducer'


const AnecdoteForm = (props) => {
    const dispatch = useDispatch()  

const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    dispatch(createAnecdote(content))
    dispatch(notificationChange(`New anecdote '${content}' has been created!`))
    setTimeout(() => {
        dispatch(removeNotification())
      }, 5000)
  }
  

return (
    <div>   
        <h2>Create new</h2>
        <form onSubmit={addAnecdote}>
            <input name="anecdote" />
        <button type="submit">Create</button>
        </form>
    </div>
)
}

export default AnecdoteForm
