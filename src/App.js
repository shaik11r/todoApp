import { useState } from "react";
import "./App.css";
function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [edit, setEdit] = useState(0);

  //handling on submit;

  const handlesubmit = (e) => {
    e.preventDefault();
    if (edit) {
      const editTodo = todos.find((i) => i.id === edit); //finding edit and it returns an entire object
      const updatedTodos = todos.map((t) =>
        t.id === editTodo.id ? (t = { id: t.id, todo }) : { id: t.id, todo: t.todo }
      ); //if t .id is edittodo.id then t equals to where id:t.id and todo  else normal id:t.id and todo:t.todo; fine
      setTodos(updatedTodos);
      setTodo(""); //todo set to empty again;
      setEdit(0); //edit id is zero
      return;
    }
    if (todo !== "") {
      setTodos([{ id: `${todo}-${Date.now()}`, todo }, ...todos]);
      setTodo("");
    }
  };

  //delete
  const handleDelete = (id) => {
    const deleteTodo = todos.filter((to) => to.id !== id);
    setTodos([...deleteTodo]);
  };
  //handleedit

  const handleEdit = (id) => {
    const editTodo = todos.find((i) => i.id === id); //returns a whole object
    setTodo(editTodo.todo);
    setEdit(editTodo.id);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Todo list app</h1>
        <form className="todoForm" onSubmit={handlesubmit}>
          <input
            type="text"
            value={todo}
            onChange={(e) => {
              setTodo(e.target.value);
            }}
          />
          <button type="submit">{edit ? "Edit" : "+"}</button>
        </form>
        <ul className="alltodos">
          {todos.map((t) => (
            <li className="singletodo">
              <span className="todoText" key={t.id}>
                {t.todo}
              </span>
              <button onClick={() => handleEdit(t.id)}>Edit</button>
              <button onClick={() => handleDelete(t.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
