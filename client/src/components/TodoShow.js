import { useEffect, useState } from "react";
import { useParams } from "react-router";

function TodoShow() {  
  const [{ data: todo, error, status }, setTodo] = useState({
    data: null,
    error: null,
    status: "pending",
  });
  const [newTodo, setNewTodo] = useState({ ...todo });
  const [refetch, setRefetch] = useState(1);

  const { id } = useParams(); 
  useEffect(() => {
    fetch(`/api/todos/${id}`).then((r) => {
      if (r.ok) {
        r.json().then((todo) => {
          console.log(todo);
          setTodo({ data: todo, error: null, status: "resolved" });
          setNewTodo(() => ({ ...todo }));
          console.log(newTodo);
          console.log(status);
        }
        );
      } else {
        r.json().then((err) =>
        setTodo({ data: null, error: err.error, status: "rejected" })
        );
      }
    });
  }, [id, refetch]);

    /* 
  function handleAddDisplayTask(newTask) {
    setEmployee({
      error,
      status,
      data: {
        ...employee,
        tasks: [...employee.tasks, newTask],
      },
    });
  }
  /* */
  function handleUpdateTodo(e) {
    e.preventDefault();
    fetch(
      "/todos/" + id, 
      {
        method: "PATCH",
        body: JSON.stringify(newTodo),
        headers: 
        {
          Accept: "application/json",
          "Content-Type": "application/json",
        }
      }
    ).then(() => {  // PESSIMISTIC RENDERING:
      setRefetch(x=>x+1);
    });

    // // OPTIMISTIC RENDERING
    // const newTodos = types.map((g) => {
    //   if (g.id === type.id) {
    //     g = type;
    //   }
    //   return g;
    // });
    // setTypes(newTypes);
  }

  function handleChange(e) {
    const updatedValue = { ...newTodo };
    updatedValue[e.target.name] = e.target.value;
    setNewTodo({ ...updatedValue });
  }
      
  if (status === "pending") return <h2>Loading...</h2>;
  if (status === "rejected") return <h2>Error: {error}</h2>;

  return (
    <div>
      <h2>{todo.todo_name}</h2>
      <form onSubmit={handleUpdateTodo}>
        <p>
          name: <input 
          name="todo_name" 
          value={newTodo.todo_name} 
          onChange={handleChange} 
        /></p>
        <p>
          notes: <input 
          name="todo_notes" 
          value={newTodo.todo_notes} 
          onChange={handleChange} 
        /></p>
        <button type="submit">Update Todo</button>
      </form>
      {/* <h5>Return to To-do's</h5> */}
    </div>
  );
}

export default TodoShow;
