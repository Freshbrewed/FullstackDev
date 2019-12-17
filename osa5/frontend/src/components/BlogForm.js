import React from 'react'

const BlogForm = (props) => {
    return (
        <form className="blogform" onSubmit={props.addBlog}>
            <h3>Create new blog</h3>
            <div>
                Title:
                <input value={props.newTitle} onChange={({target}) => props.setNewTitle(target.value)} />
            </div>
            <div>
                Author:
                <input value={props.newAuthor} onChange={({target}) => props.setNewAuthor(target.value)} />
            </div>
            <div>
                URL:
                <input value={props.newUrl} onChange={({target}) => props.setNewUrl(target.value)} />
            </div>
            <button type="submit">Create</button>
            <div><button onClick={props.handleShow}>Cancel</button></div>
        </form>
    )
}

export default BlogForm