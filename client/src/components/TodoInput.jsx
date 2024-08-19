import { useContext } from "react";
import UserAuth from "../Context/Auth";
import toast from "react-hot-toast";

export default function TodoInput(props) {
  // eslint-disable-next-line react/prop-types
  const { handleAddTodos, todoValue, setTodoValue } = props;
  const { isAuthenticated } = useContext(UserAuth);
  return (
    <header>
      <input
        value={todoValue}
        onChange={(e) => {
          setTodoValue(e.target.value);
        }}
        placeholder="Enter todo...."
      />
      <button
        onClick={() => {
          if (isAuthenticated) {
            handleAddTodos(todoValue);
            setTodoValue("");
          } else {
            toast.error("You Must Login First !");
          }
        }}
      >
        Add
      </button>
    </header>
  );
}
