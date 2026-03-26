import React, { useState } from 'react';
import { useTodoContext } from '../context/TodoContext';

const TodoForm = () => {
    const [input, setInput] = useState('');
    const { addTodo } = useTodoContext(); // context에서 addTodo 함수 가져오기

    const handleSubmit= (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('동작함');
        const text = input.trim(); // 입력값에서 공백 제거

        if (text) {
            addTodo(text); // context에서 addTodo 함수 호출
            setInput(''); // 입력 필드 초기화
        }
    };

    return (
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
    );
};

export default TodoForm;