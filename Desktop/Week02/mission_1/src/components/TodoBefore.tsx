import { type TTodo } from '../types/todo';

interface TodoBeforeProps {
  todo: TTodo;
  isDone: boolean;
  onComplete: (todo: TTodo) => void;
  onDelete: (id: number) => void;
}

const TodoBefore = ({ todo, isDone, onComplete, onDelete }: TodoBeforeProps) => {
  return (
    <li className="render-container__item">
      <span className="render-container__item-text">{todo.text}</span>
      <button
        className={isDone ? "render-container__item-button" : "todo-container__button"}
        style={!isDone ? { backgroundColor: '#28a745' } : {}}
        onClick={() => (isDone ? onDelete(todo.id) : onComplete(todo))}
      >
        {isDone ? '삭제' : '완료'}
      </button>
    </li>
  );
};

export default TodoBefore;