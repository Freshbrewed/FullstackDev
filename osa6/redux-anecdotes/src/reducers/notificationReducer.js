
export const notificationChange = ( message, duration) => {
    return async dispatch => {
        console.log(duration)
        setTimeout(() => {
            dispatch({
                type: 'REMOVE_MESSAGE',
                message: ''
            })
          }, duration * 1000)
        dispatch({
            type: 'SET_MESSAGE',
            message
        })
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