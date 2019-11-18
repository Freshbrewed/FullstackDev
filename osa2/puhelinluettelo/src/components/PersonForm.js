import React from 'react'

const PersonForm = (props) => {
    return (
      <div>
        <form onSubmit={props.onSubmit}>
          <div>
            Name: <input value={props.value[0]} onChange={props.onChange[0]}/>
          </div>
          <div>
            Number: <input value={props.value[1]} onChange={props.onChange[1]}/>
          </div>
          <div>
            <button type="submit">Add</button>
          </div>
        </form>
      </div>
    )
  }

  export default PersonForm