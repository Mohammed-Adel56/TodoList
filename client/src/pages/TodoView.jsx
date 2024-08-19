import TodoInput from "../components/TodoInput";
import TodoList from "../components/TodoList";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import UserAuth from "../Context/Auth";
function TodoView() {
  const [todo, setTodo] = useState([]);
  const [todoValue, setTodoValue] = useState("");
  const { isAuthenticated } = useContext(UserAuth);
  useEffect(() => {
    if (isAuthenticated) {
      axios
        .get("/get")
        .then((res) => {
          setTodo(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [isAuthenticated]);
  function handleAddTodos(newTodo) {
    axios
      .post("/add", { todo: newTodo })
      .then(() =>
        axios
          .get("/get")
          .then((res) => {
            setTodo(res.data);
          })
          .catch((err) => console.log(err))
      )
      .catch((error) => console.log(error));
  }
  function handleDeleteTodo(index) {
    axios
      .delete("/delete/" + index)
      .then(() =>
        axios.get("/get").then((res) => {
          setTodo(res.data);
        })
      )
      .catch((error) => console.log(error));

    const newTodoList = todo.filter((ele) => {
      return ele._id != index;
    });

    setTodo(newTodoList);
  }
  function handleEditTodo(index) {
    let valueToBeEdited;
    todo.forEach((ele, ind) => {
      if (ind == index) {
        valueToBeEdited = ele;
      }
    });
    setTodoValue(valueToBeEdited);
    axios
      .delete("/delete/" + index)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  }

  return (
    <>
      <TodoInput
        todoValue={todoValue}
        setTodoValue={setTodoValue}
        handleAddTodos={handleAddTodos}
      />
      <TodoList
        handleDeleteTodo={handleDeleteTodo}
        handleEditTodo={handleEditTodo}
        todo={todo}
      />
    </>
  );
}

export default TodoView;
