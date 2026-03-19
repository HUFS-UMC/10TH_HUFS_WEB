"use strict";
const input = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const doneList = document.getElementById("doneList");
let todos = [];
function createTodoItem(todo) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = todo.text;
    const completeBtn = document.createElement("button");
    completeBtn.textContent = "완료";
    completeBtn.className = "complete";
    li.append(span, completeBtn);
    completeBtn.addEventListener("click", () => {
        completeBtn.remove();
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "삭제";
        deleteBtn.className = "delete";
        li.append(deleteBtn);
        doneList.append(li);
        deleteBtn.addEventListener("click", () => {
            li.remove();
        });
    });
    return li;
}
input.addEventListener("keyup", (e) => {
    if (e.key !== "Enter")
        return;
    const text = input.value.trim();
    if (text === "")
        return;
    const newTodo = {
        text,
        completed: false
    };
    todos.push(newTodo);
    const todoItem = createTodoItem(newTodo);
    todoList.append(todoItem);
    input.value = "";
});
