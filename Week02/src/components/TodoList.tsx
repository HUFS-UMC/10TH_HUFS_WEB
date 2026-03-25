import Todo from "./Todo";
import TodoBefore from "./TodoBefore";
import {useTodo} from "../context/TodoContext"

const TodoList = ()=>{
    const {tasks, completeTask, deleteTask}=useTodo();

  const todoTasks = tasks.filter((task) => task.isDone === false);
  const doneTasks = tasks.filter((task) => task.isDone === true);

return (
     <div className="render-container">
      <section className="render-container__section">
        <h2 className="render-container__title">할 일</h2>
        <ul className="render-container__list">
          {todoTasks.map((task) => (
            <TodoBefore
              key={task.id}
              task={task}
            />
          ))}
        </ul>
      </section>

      <section className="render-container__section">
        <h2 className="render-container__title">끝난 일</h2>
        <ul className="render-container__list">
          {doneTasks.map((task) => (
            <Todo
              key={task.id}
              task={task}
            />
          ))}
        </ul>
      </section>
    </div>
);
}

export default TodoList;