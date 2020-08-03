import anecdoteService from '../services/anecdotes'

export const voteAnecdote = (id, anecdoteToUpdate) => {
  return async dispatch => {
    const changedAnecdote = {
      ...anecdoteToUpdate,
      votes: anecdoteToUpdate.votes + 1
    }
    const updatedAnecdote = await anecdoteService.updateVote(id, changedAnecdote)
    //console.log('This is servers response:', updatedAnecdote)
    dispatch({
      type: 'NEW_VOTE',
      data: updatedAnecdote
    })
  }
}

export const createAnecdote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => { 
    const anecdotes = await anecdoteService.getAll()
  dispatch({
    type: 'INIT_ANECDOTES',
    data: anecdotes
  })
}
}

const anecdoteReducer = (state = [], action) => {
  //console.log('state now: ', state)
  //console.log('action', action)
  switch (action.type) {
    case 'INIT_ANECDOTES':
      return action.data
    case 'NEW_VOTE': 
      return state.map(anecdote =>
        anecdote.id !== action.data.id ? anecdote : action.data)
      case 'NEW_ANECDOTE':
       // console.log('This is action data:', action.data)
        return state.concat(action.data)
  default:
      return state
 }
}

export default anecdoteReducer