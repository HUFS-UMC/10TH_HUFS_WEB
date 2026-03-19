const form = document.querySelector('.todo-app__form') as HTMLFormElement;
const todoInput = document.getElementById('todo-input') as HTMLInputElement;
const todoList = document.getElementById('todo-list') as HTMLUListElement;
const doneList = document.getElementById('done-list') as HTMLUListElement;

const addTodo = (): void => {
    const text = todoInput.value.trim();
    if (!text) return;

    const li = document.createElement('li');
    li.className = 'todo-item';

    li.innerHTML = `
        <span class="todo-item__text">${text}</span>
        <button class="todo-item__button todo-item__button--complete">완료</button>
    `;

    const completeBtn = li.querySelector('.todo-item__button--complete') as HTMLButtonElement;

    completeBtn.addEventListener('click', () => {
        moveToDone(li, text);
    });

    todoList.appendChild(li);
    todoInput.value = '';
};

const moveToDone = (item: HTMLLIElement, text: string): void => {
    item.remove();

    const li = document.createElement('li');
    li.className = 'todo-item';

    li.innerHTML = `
        <span class="todo-item__text">${text}</span>
        <button class="todo-item__button todo-item__button--delete">삭제</button>
    `;

    const deleteBtn = li.querySelector('.todo-item__button--delete') as HTMLButtonElement;

    deleteBtn.addEventListener('click', () => {
        li.remove();
    });

    doneList.appendChild(li);
};

form.addEventListener('submit', (e: Event) => {
    e.preventDefault();
    addTodo();
});