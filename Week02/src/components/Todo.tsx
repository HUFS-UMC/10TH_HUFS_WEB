import {useTodo} from "../context/TodoContext"
interface Task {
  id: number;
  text: string;
  isDone: boolean;
}

interface TodoProps {
  task: Task;
}

const Todo = ({ task }: TodoProps) => {
    const {deleteTask} = useTodo();
  return (
    <li className="render-container__item">
      <span className="render-container__item-text">{task.text}</span>
      <button
        className="render-container__item-button"
        onClick={() => deleteTask(task.id)}
      >
        삭제
      </button>
    </li>
  );
};

export default Todo;