/* eslint-disable react/prop-types */
import TodoCart from "./TodoCart";

export default function TodoList(props) {
  // eslint-disable-next-line react/prop-types
  const { todo } = props;
  return (
    <ul className="main">
      {todo.map((ele, ind) => {
        return (
          <TodoCart {...props} key={ind} index={ind} done={ele.done}>
            <p>{ele}</p>
          </TodoCart>
        );
      })}
    </ul>
  );
}
