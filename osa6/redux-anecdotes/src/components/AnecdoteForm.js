import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange} from '../reducers/notificationReducer'


const AnecdoteForm = (props) => {
 

const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)
    props.notificationChange(`New anecdote '${content}' has been created!`, 5)
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

const mapDispatchToProps = {
    createAnecdote,
    notificationChange
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm
