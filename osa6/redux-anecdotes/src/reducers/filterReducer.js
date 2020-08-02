
export const filterChange = (input) => {
    return {
        type: 'NEW_INPUT',
        input
    }
}

const filterReducer = (state = '', action) => {
    switch (action.type) {
        case 'NEW_INPUT':
            return action.input
        default:
            return ''
    }
}

export default filterReducer