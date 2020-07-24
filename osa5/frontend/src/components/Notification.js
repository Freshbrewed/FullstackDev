import React from 'react'
import PropType from 'prop-types'

const Notification = ({ message, errorMessage, className }) => {

  Notification.propTypes = {
    className: PropType.array.isRequired
  }

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