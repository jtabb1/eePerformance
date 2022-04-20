import { useEffect, useState } from "react";

function UserShowTodoAdd({ userId, onAddDisplayTodo }) {
  const [typeId, setTypeId] = useState("");
  const [types, setTypes] = useState([]);
  const [cTodoIx, setCTodoIx] = useState("");
  const [common_todos, setCommonTodos] = useState([]);
  const [todo_name, setTodoName] = useState("");
  const [c_todo_name, setCTodoName] = useState("");
  const [save_to_c_todos, setSaveToCTodos] = useState(false);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    fetch("/api/types")
      .then((r) => r.json())
      .then((j) => {
        setTypes(j);
      });
  }, []);

  useEffect(() => {    
    fetch("/api/common_todos")
      .then((r) => r.json())
      .then((j) => {
        setCommonTodos(j);
      });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = {
      type_id: Number(typeId),
      user_id: userId,
      todo_name: todo_name
    };
    fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((r) => {
      if (r.ok) {
        r.json().then((todo) => {
          if (c_todo_name !== todo_name) setTypeId("");
          setErrors([]);
          onAddDisplayTodo(todo);
        });
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  function handleChangeCommonTodo(e) {
    const cTodo = common_todos.find( ({id}) => {
      return id === Number(e.target.value);
    });

    setCTodoIx(e.target.value);
    if (e.target.value !== "") {
      setCTodoName(cTodo.todo_name);
      setTypeId(cTodo.type_id);
      setTodoName(cTodo.todo_name);
    }
  }

  return (
    <div className="row">
    <form onSubmit={handleSubmit}>
      <h2>Add New To-do</h2>

      <div>
        <label htmlFor="todo_id">Enter one:</label>
        <input
          type="text"
          id="todo_name"
          value={todo_name}
          onChange={(e) => setTodoName(e.target.value)}
        />
        <select
          id="type_id"
          value={typeId}
          onChange={(e) => setTypeId(e.target.value)}
        >
          <option value="">Select type...</option>
          {types.map((type) => (
            <option key={type.id} value={type.id}>
              {type.type_name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <select
          id="common_todo_id"
          value={cTodoIx}
          onChange={(e) => handleChangeCommonTodo(e)}
          onClick={(e) => handleChangeCommonTodo(e)}
        >
          <option value="">Select a previous or common to-do ...</option>
          {common_todos.map((cTodo) => (
            <option key={cTodo.id} value={cTodo.id}>
              {cTodo.to_display}
            </option>
          ))}
        </select>
      </div>

      {errors.map((err) => (
        <p key={err} style={{ color: "red" }}>
          {err}
        </p>
      ))}

    {/* <label for="save">Save to common to-do's:</label>      
    <input type="checkbox" id="save" name="vehicle1" value={} />  */}
    <button todo="submit">Submit</button>
    </form>
    </div>
  );
}

export default UserShowTodoAdd;
