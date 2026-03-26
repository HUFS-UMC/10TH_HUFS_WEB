import TodoList from "./TodoList";
import TodoForm from "./TodoForm";
import { useTodo } from "../context/TodoContext";

const TodoSection = ({
  title,
  todos,
  buttonLable,
  buttonColor,
  onClick,
}: any) => {
  return (
    <TodoList
      title={title}
      todos={todos}
      buttonLable={buttonLable}
      buttonColor={buttonColor}
      onClick={onClick}
    />
  );
};

const Todo = () => {
  const { completeTodo, deleteTodo, todos, doneTodos } = useTodo();

  return (
    <section className="todo-container">
      <h1 className="todo-container__header">SUNA TODO</h1>

      <TodoForm />

      <div className="render-container">
        <TodoSection
          title="할 일"
          todos={todos}
          buttonLable="완료"
          buttonColor="#28a745"
          onClick={completeTodo}
        />

        <TodoSection
          title="완료"
          todos={doneTodos}
          buttonLable="삭제"
          buttonColor="#dc3545"
          onClick={deleteTodo}
        />
      </div>
    </section>
  );
};

export default Todo;