
export const notificationChange = ( message, duration) => {
    let timeOutID = null
    console.log(timeOutID)
    
    return async dispatch => {

        dispatch({
            type: 'SET_MESSAGE',
            message
        })

        timeOutID = setTimeout(() => {
        dispatch({
                type: 'REMOVE_MESSAGE',
                message: ''
            })
          }, duration * 1000)      
    }
}


const notificationReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_MESSAGE':
            return action.message
        case 'REMOVE_MESSAGE':
            return action.message
        default:
            return state
    }
}

export default notificationReducer