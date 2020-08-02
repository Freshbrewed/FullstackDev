import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange, removeNotification } from '../reducers/notificationReducer'


const AnecdoteList = () => {
  const dispatch = useDispatch()

  const filterSearch = (anecdotes, search) => {
    return anecdotes.filter(anecdote => 
      (anecdote.content.toLocaleLowerCase().includes(search) 
   ))
  }

    const anecdotes = useSelector(state => {
      if ( state.filter === '') return state.anecdotes
      return filterSearch(state.anecdotes, state.filter)
    })


    
const vote = (id) => {
  dispatch(voteAnecdote(id))
  dispatch(notificationChange(`You have voted for '${findAnecdoteContentById(id)}'`))
  setTimeout(() => {
    dispatch(removeNotification())
  }, 5000)
}

const findAnecdoteContentById = (id) => {
  return anecdotes.find(anecdote => anecdote.id === id).content
}

return (
    <div>
        {anecdotes.sort((a, b) => a.votes < b.votes ? 1 : -1)
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
    </div>
 )
}

export default AnecdoteList