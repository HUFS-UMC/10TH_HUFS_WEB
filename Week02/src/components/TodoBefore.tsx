import {useTodo} from "../context/TodoContext"
interface Task {
    id: number;
    text: string;
    isDone: boolean;
}
interface TodoBeforeProps {
  task: Task;
}

const TodoBefore = ({task}: TodoBeforeProps)=>{
    const {completeTask} = useTodo();

return (
    <> 
    <li className="render-container__item">
      <span className="render-container__item-text">{task.text}</span>

            <button
          className="render-container__item-button"
          onClick={() => completeTask(task.id)}
        >
          완료
        </button>
    </li></>
);

}
export default TodoBefore