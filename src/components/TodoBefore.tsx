import { useState, type FormEvent } from 'react';
import type { TTodo } from '../types/todo';

const TodoBefore = ()  => {
    const [todos, setTodos] = useState<TTodo[]>([]);
    const [doneTodos, setDoneTodos] = useState<TTodo[]>([]);
    const [input, setInput] = useState<string>('');

    console.log('input', input);

    const handleSubmit= (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('동작함');
        const text = input.trim(); // 입력값에서 공백 제거
        if (text) {
            const newTodo: TTodo = {
                id: Date.now(), // 고유한 ID 생성
                text,
            };
            setTodos((prevTodos) => [...prevTodos, newTodo]);
            setInput(''); // 입력 필드 초기화
        }
    };

    const completeTodo = (todo: TTodo) => {
        setTodos((prevTodos) => prevTodos.filter((t) => t.id !== todo.id));// 완료하는 목록 제외 보이기
        setDoneTodos((prevDoneTodos) => [...prevDoneTodos, todo]);
    };

    const deleteTodo = (todo: TTodo) => {
        setDoneTodos((prevDoneTodos) => prevDoneTodos.filter((t) => t.id !== todo.id));
    };// 삭제하는 목록 제외 보이기

    return (
        <div className="todo-container">
            <h1 className="todo-container__header">KITE TODO</h1>
            {/* <TodoForm />으로 전환될 예정 */}
            <form onSubmit={handleSubmit} className="todo-container__form">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="todo-container__input"
                    type="text"
                    placeholder="할 일을 입력해주세요."
                    required
                />
                <button className="todo-container__button" type="submit">
                    할 일 추가 (enter)
                </button>  
            </form>

            <div className="render-container"> 
                <div className="render-container__section">
                    <h2 className="render-container__title">할 일</h2>
                    <ul id="todo-list" className="render-container__list">
                        {todos.map((todo) => (
                            <li key={todo.id} className="render-container__item">
                                <span className="render-container__item-text">{todo.text}</span>
                                <button
                                    onClick={() => completeTodo(todo)}
                                    style={{
                                        backgroundColor: '#28a745',
                                    }}
                                    className="render-container__item-button"
                                >
                                    완료
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

            <div className="render-container__section">
                <h2 className="render-container__title">완료</h2>
                <ul id="done-list" className="render-container__list">
                    {doneTodos.map((todo) => (
                        <li key={todo.id} className="render-container__item">
                            <span className="render-container__item-text">{todo.text}</span>
                            <button
                                onClick={() => deleteTodo(todo)}
                                style={{
                                    backgroundColor: '#dc3545',
                                }}
                                className="render-container__item-button"
                            >
                                삭제
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
    );
};

export default TodoBefore;