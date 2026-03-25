import { useState } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import TodoBefore from "./TodoBefore";
import type { TodoType } from "../types/todo";

const Todo = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [doneTasks, setDoneTasks] = useState<TodoType[]>([]);
  const [input, setInput] = useState("");

  // 추가
  const handleAddTodo = () => {
    if (!input.trim()) return;

    const newTodo: TodoType = {
      id: Date.now(),
      text: input,
    };

    setTodos([...todos, newTodo]);
    setInput("");
  };

  // 완료
  const handleComplete = (todo: TodoType) => {
    setTodos(todos.filter((t) => t.id !== todo.id));
    setDoneTasks([...doneTasks, todo]);
  };

  // 삭제
  const handleDelete = (todo: TodoType) => {
    setDoneTasks(doneTasks.filter((t) => t.id !== todo.id));
  };

  return (
    <div className="todo-container">
      <h1 className="todo-container__header">SSAL TODO</h1>

      <TodoForm
        input={input}
        setInput={setInput}
        onAdd={handleAddTodo}
      />

      <div className="render-container">
        <TodoBefore todos={todos} onComplete={handleComplete} />
        <TodoList doneTasks={doneTasks} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default Todo;