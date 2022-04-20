import { useEffect, useState } from "react";
import DoneShowDoneRow from "./DoneShowDoneRow";

function DoneShow({ id }) {
  const [{ data: user, error, status }, setUser] = useState({
    data: null,
    error: null,
    status: "pending",
  });
  const [rTodos, setRTodos] = useState([]);

  useEffect(() => {
    fetch(`/api/users/${id}`).then((r) => {
      if (r.ok) {
        r.json().then((user) =>
          setUser({ data: user, error: null, status: "resolved" })
        );
      } else {
        r.json().then((err) =>
          setUser({ data: null, error: err.error, status: "rejected" })
        );
      }
    });
  }, [id]);

  useEffect(() => {
    fetch(`/api/todos`).then((r) => {
      if (r.ok) {
        r.json().then((rTodos) =>
        setRTodos(rTodos)
        );
      }
    });
  }, [id]);

  function handleDeleteTodo(id) {
    fetch(`/api/todos/${id}`, {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        setUser({
          error,
          status,
          data: {
            ...user,
            todos: user.todos.filter((todo) => todo.id !== id)
          },
        });
        setRTodos((ary) => {
          return ary.filter((et) => et.id !== id);
        });
      }
    });
  }

  function handleUpdateTodo(newTodo) {
    fetch("/api/todos/" + newTodo.id, {
      method: "PATCH",
      body: JSON.stringify(newTodo),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then( (r)=> { // PESSISMISTIC RENDERING:
      if (r.ok) {
        setUser({
          error,
          status,
          data: {
            ...user,
            todos: user.todos.map((todo) => {
              if (todo.id === newTodo.id) {
                todo = newTodo;
              }
              return todo;
            })
          },
        });
        setRTodos((ary) => {
          return ary.map((todo) => {
            if (todo.id === newTodo.id) {
              todo = newTodo;
            }
            return todo;
          });
        });
      }
    });
    // // OPTIMISTIC RENDERING:
    // const newTodos = todos.map((g) => {
    //   if (g.id === todo.id) {
    //     g = todo;
    //   }
    //   return g;
    // });
    // setTodos(newTodos);
  }

  if (status === "pending") return <h2>Loading...</h2>;
  if (status === "rejected") return <h2>Error: {error}</h2>;

  return (
    <>
    <hr />

    <div className="container">
      <h2>{user.username}'s Done List</h2>
        {rTodos.map((todo, ix) => (
          todo.is_done && (<DoneShowDoneRow 
            key={"DoneShow_todo" + todo.id + ix}
            todo={todo}
            onDeleteTodo={handleDeleteTodo}
            onUpdateTodo={handleUpdateTodo}
          />)
        ))}
    </div>
    </>
  );
}

export default DoneShow;
