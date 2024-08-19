import Button from "react-bootstrap/esm/Button";
import "../index.css";
import { FaTrash } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";

const TodoCart = (props) => {
  // eslint-disable-next-line react/prop-types
  const { children, handleDeleteTodo, handleEditTodo, index } = props;

  return (
    <li className="todoItem">
      <div className="checkbox">{children}</div>
      <div className="actionsContainer">
        <Button
          onClick={() => {
            handleEditTodo(index);
          }}
        >
          <FaRegEdit />
        </Button>

        <Button
          onClick={() => {
            handleDeleteTodo(index);
          }}
        >
          <FaTrash />
        </Button>
      </div>
    </li>
  );
};

export default TodoCart;
