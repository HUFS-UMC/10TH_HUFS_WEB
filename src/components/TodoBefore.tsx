import type { TodoType } from "../types/todo";

type Props = {
  todos: TodoType[];
  onComplete: (todo: TodoType) => void;
};

const TodoBefore = ({ todos, onComplete }: Props) => {
  return (
    <div className="render-container__section">
      <h2 className="render-container__title">할 일</h2>
      <ul className="render-container__list">
        {todos.map((todo) => (
          <li key={todo.id} className="render-container__item">
            {todo.text}
            <button
              className="render-container__item-button btn-complete"
              onClick={() => onComplete(todo)}
            >
              완료
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoBefore;