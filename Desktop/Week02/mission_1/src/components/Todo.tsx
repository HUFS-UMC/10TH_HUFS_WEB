import TodoList from "./TodoList";
import TodoForm from "./TodoForm";
import { useTodo } from "../context/TodoContext";

const Todo = () => {
  // 이제 여기서 가져오는 값들은 절대 undefined가 아니야!
  const { completeTodo, deleteTodo, todos, doneTodos } = useTodo();

  return (
    <div className="todo-container">
      <h1 className="todo-container__header">SUNA TODO</h1>
      <TodoForm />
      <div className="render-container">
        <TodoList
          title="할 일"
          todos={todos} // ? 없이 바로 전달
          buttonLable="완료"
          buttonColor="#28a745"
          onClick={completeTodo}
        />
        <TodoList
          title="완료"
          todos={doneTodos} // ? 없이 바로 전달
          buttonLable="삭제"
          buttonColor="#dc3545"
          onClick={deleteTodo}
        />
      </div>
    </div>
  );
};

export default Todo;