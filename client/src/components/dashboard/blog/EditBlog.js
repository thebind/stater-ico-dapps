import React from 'react';

const EditBlog = (props) => {
    console.log(props);
    // http://localhost:3000/dashboard/blog/edit/99
    return (
        <div>Editing the Expense with id of {props.match.params.id}</div>
    );
}

export default EditBlog;
