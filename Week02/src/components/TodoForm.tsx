import {useTodo} from "../context/TodoContext"

const TodoForm =()=>{
    const {input, setInput, addTask} = useTodo();
 return (
    <>
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
      </form></>
 );
}
export default TodoForm;