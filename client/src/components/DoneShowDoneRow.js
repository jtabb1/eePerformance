import React, { useState } from "react";
import '../styles/UserShowTodoRow.css'

function DoneShowDoneRow({ todo, onDeleteTodo, onUpdateTodo }) {
  const [newTodo, setNewTodo] = useState({ ...todo });
  const [editMode, setEditMode] = useState(false);
  const [isComplete, setIsComplete] = useState(todo.is_done);

  function handleChange(e) {
    const updatedValue = { ...newTodo };
    updatedValue[e.target.name] = e.target.value;
    setNewTodo({ ...updatedValue });
  }

  function toggleEdit() {
    setEditMode(!editMode);
  }

  function makeIncomplete() {
    let updatedValue = { ...newTodo };
    let name = "is_done";
    let value = false;
    updatedValue[name] = value;
    name = "is_shown_in_todos";
    value = true;
    updatedValue[name] = value;
    onUpdateTodo(updatedValue);
    setNewTodo({ ...updatedValue });
    setIsComplete(false);
  }

  // function handleRemove() {
  //   const name = "is_shown_in_todos";
  //   const value = false;
  //   const updatedValue = { ...newTodo };
  //   updatedValue[name] = value;
  //   onUpdateTodo(updatedValue);
  //   setNewTodo({ ...updatedValue });
  // }

  function handleUpdate(e) {
    e.preventDefault();
    onUpdateTodo(newTodo);
    setEditMode(false);
  }

  return (
    <>
      <div className="row">
        {/* <li> */}
        <div className="col">
          <ul>
            <li>
              {`${todo.todo_name} (${todo.type.type_name})`} &nbsp;
            </li>
          </ul>
        </div>
        <div className="col">
          {editMode ? 
          <button onClick={toggleEdit}>See Less</button>
          : <button onClick={toggleEdit}>&nbsp; Details</button>}
          {isComplete &&
          <>
          <button className=""> &nbsp; Did It: &nbsp;✅  &nbsp; </button>
          </>}
        </div>
        {/* </li> */}
      </div>
      {editMode && (
      <div className="row">
        <form onSubmit={handleUpdate}>
          {/* <li className="no_bullet"> */}
            <input 
              name="todo_name" 
              value={newTodo.todo_name} 
              onChange={handleChange} 
            />
            <button type="submit">Update To-do</button>
          {/* </li> */}
        </form>
        <div>
          <button className="" onClick={makeIncomplete}>❌ Actually, did not do it</button>
        </div>
        <div>
          <button className="btn btn-danger" onClick={()=>onDeleteTodo(todo.id)}>Delete permanently</button>
        </div>
      </div>
    )}
    </>
  );
}

export default DoneShowDoneRow;
