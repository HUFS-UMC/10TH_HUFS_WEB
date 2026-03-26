import type { TTodo } from "../types/todo";

interface TodoListProps {
  title: string;
  todos: TTodo[];
  buttonLable: string;
  buttonColor: string;
  onClick: (todo: TTodo) => void;
}

const TodoList = ({
  title,
  todos,
  buttonLable,
  buttonColor,
  onClick,
}: TodoListProps) => {

  const handleClick = (todo: TTodo) => {
    onClick(todo);
  };

  const renderTodo = (todo: TTodo) => (
    <li key={todo.id} className="render-container__item">
      <span className="render-container__item-text">
        {todo.text}
      </span>
      <button
        className="render-container__item-button"
        onClick={() => handleClick(todo)}
        style={{ backgroundColor: buttonColor }}
      >
        {buttonLable}
      </button>
    </li>
  );

  return (
    <section className="render-container__section">
      <h2 className="render-container__title">{title}</h2>

      <ul className="render-container__list">
        {todos?.map(renderTodo)}
      </ul>

      <style>
        {`
          .render-container__item-button {
            background-color: ${buttonColor};
          }
        `}
      </style>
    </section>
  );
};

export default TodoList;