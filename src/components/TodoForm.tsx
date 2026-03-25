type Props = {
  input: string;
  setInput: (value: string) => void;
  onAdd: () => void;
};

const TodoForm = ({ input, setInput, onAdd }: Props) => {
  return (
    <form
      className="todo-container__form"
      onSubmit={(e) => {
        e.preventDefault();
        onAdd();
      }}
    >
      <input
        className="todo-container__input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="할 일을 입력해주세요."
      />
      <button className="todo-container__button">할일 추가</button>
    </form>
  );
};

export default TodoForm;