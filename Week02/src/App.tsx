import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { useTheme } from "./context/ThemeContext";

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className={`todo-container ${
        theme === "dark" ? "bg-zinc-900 text-white" : "bg-white text-black"
      }`}
    >
      <button onClick={toggleTheme}>
        {theme === "light" ? "다크모드" : "라이트모드"}
      </button>

      <h1 className="todo-container__header">KIWI TODO</h1>
      <TodoForm />
      <TodoList />
    </div>
  );
}

export default App;