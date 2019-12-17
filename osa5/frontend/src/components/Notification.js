import React from 'react'

const Notification = ({message, errorMessage, className}) => {
    if (message)
    return (
        <div className={className[0]}>{message}</div>
    )
    if (errorMessage)
    return (
        <div className={className[1]}>{errorMessage}</div>
    )
    return null
}

export default Notification