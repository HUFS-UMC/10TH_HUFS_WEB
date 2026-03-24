import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";


function App() {
  return (
    <div className="todo-container">
      <h1 className="todo-container__header">KIWI TODO</h1>

      <TodoForm />
      <TodoList />
    </div>
  );
}

export default App;