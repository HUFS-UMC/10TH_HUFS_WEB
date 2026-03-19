"use strict";
const input = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const doneList = document.getElementById('done-list');
input.addEventListener('keydown', (e) => {
    if (e.isComposing)
        return;
    if (e.key === 'Enter' && input.value.trim() !== '') {
        createTodoItem(input.value.trim());
        input.value = '';
    }
});
function createTodoItem(text) {
    const li = document.createElement('li');
    li.className = 'todo-item';
    const span = document.createElement('span');
    span.className = 'todo-item__text';
    span.textContent = text;
    const completeBtn = document.createElement('button');
    completeBtn.className = 'todo-item__button';
    completeBtn.textContent = '완료';
    completeBtn.addEventListener('click', () => {
        moveToDone(li, text);
    });
    li.appendChild(span);
    li.appendChild(completeBtn);
    todoList.appendChild(li);
}
function moveToDone(oldLi, text) {
    oldLi.remove();
    const li = document.createElement('li');
    li.className = 'todo-item';
    const span = document.createElement('span');
    span.className = 'todo-item__text';
    span.textContent = text;
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'todo-item__button';
    deleteBtn.textContent = '삭제';
    deleteBtn.addEventListener('click', () => {
        li.remove();
    });
    li.appendChild(span);
    li.appendChild(deleteBtn);
    doneList.appendChild(li);
}
