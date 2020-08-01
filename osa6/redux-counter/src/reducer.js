const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      const updatedGood = {...state, good: state.good + 1}
      return updatedGood
    case 'NEUTRAL':
      const updatedNeutral = {...state, ok: state.ok + 1}
      return updatedNeutral
    case 'BAD': 
    const updatedBad = {...state, bad: state.bad + 1}
      return updatedBad 
    case 'RESET':
      const resetArray = {good: 0, bad: 0, ok: 0}
      return resetArray
    default: return state
  }
  
}

export default counterReducer