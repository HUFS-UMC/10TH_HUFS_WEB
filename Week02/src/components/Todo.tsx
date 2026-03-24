interface Task {
  id: number;
  text: string;
  isDone: boolean;
}

interface TodoProps {
  task: Task;
  onComplete: (id: number) => void;
  onDelete: (id: number) => void;
}

const Todo = ({ task, onComplete, onDelete }: TodoProps) => {
  return (
    <li className="render-container__item">
      <span className="render-container__item-text">{task.text}</span>

      {task.isDone ? (
        <button
          className="render-container__item-button"
          onClick={() => onDelete(task.id)}
        >
          삭제
        </button>
      ) : (
        <button
          className="render-container__item-button"
          onClick={() => onComplete(task.id)}
        >
          완료
        </button>
      )}
    </li>
  );
};

export default Todo;