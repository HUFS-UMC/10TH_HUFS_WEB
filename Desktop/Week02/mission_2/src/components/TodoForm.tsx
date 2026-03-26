import { useState } from "react";
import { useTodo } from "../context/TodoContext";

const TodoForm = () => {
  const [input, setInput] = useState<string>('');
  const { addTodo } = useTodo();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const text = input.trim();
    if (!text) return;

    addTodo(text);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} id="todo-form" className="todo-container__form">
      <input
        type="text"
        id="todo-input"
        className="todo-container__input"
        placeholder="할 일 입력"
        value={input}
        onChange={handleChange}
        required
      />

      <button
        type="submit"
        className="todo-container__button"
      >
        할 일 추가
      </button>
    </form>
  );
};

export default TodoForm;