import type { TodoType } from "../types/todo";

type Props = {
  doneTasks: TodoType[];
  onDelete: (todo: TodoType) => void;
};

const TodoList = ({ doneTasks, onDelete }: Props) => {
  return (
    <div className="render-container__section">
      <h2 className="render-container__title">완료</h2>
      <ul className="render-container__list">
        {doneTasks.map((todo) => (
          <li key={todo.id} className="render-container__item">
            {todo.text}
            <button
              className="render-container__item-button btn-delete"
              onClick={() => onDelete(todo)}
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;