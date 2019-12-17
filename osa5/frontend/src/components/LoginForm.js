import React from 'react'

const LoginForm = ({handleLogin, username, password, setUsername, setPassword}) => {
    return (
        <form onSubmit={handleLogin}>
        <div>
            Username
            <input type="text" value={username} name="Username" onChange={({target}) => setUsername(target.value)}/>
        </div>
        <div>
            Password 
            <input type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button type="submit">Login</button>
    </form>
    )
}

export default LoginForm