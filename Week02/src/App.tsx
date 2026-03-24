import { useState } from "react";
import Todo from "./components/Todo";

interface Task {
  id: number;
  text: string;
  isDone: boolean;
}

function App() {
  const [input, setInput] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (): void => {
    if (input.trim() === "") {
      return;
    }

    const newTask: Task = {
      id: Date.now(),
      text: input,
      isDone: false,
    };

    setTasks([...tasks, newTask]);
    setInput("");
  };

  const completeTask = (id: number): void => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isDone: true } : task
      )
    );
  };

  const deleteTask = (id: number): void => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const todoTasks = tasks.filter((task) => task.isDone === false);
  const doneTasks = tasks.filter((task) => task.isDone === true);

  return (
    <div className="todo-container">
      <h1 className="todo-container__header">KIWI TODO</h1>

      <form
        className="todo-container__form"
        onSubmit={(e) => {
          e.preventDefault();
          addTask();
        }}
      >
        <input
          className="todo-container__input"
          type="text"
          placeholder="할 일 입력"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          required
        />
        <button className="todo-container__button" type="submit">
          할 일 추가
        </button>
      </form>

      <div className="render-container">
        <section className="render-container__section">
          <h2 className="render-container__title">할 일</h2>
          <ul className="render-container__list">
            {todoTasks.map((task) => (
              <Todo
                key={task.id}
                task={task}
                onComplete={completeTask}
                onDelete={deleteTask}
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
                onComplete={completeTask}
                onDelete={deleteTask}
              />
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default App;