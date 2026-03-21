"use strict";
const planForm = document.getElementById("plan__form");
const planInput = document.getElementById("plan__input");
const todoList = document.getElementById("todolist");
const doneList = document.getElementById("donelist");
planForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputValue = planInput.value.trim();
    if (inputValue === "")
        return;
    addTodoItem(inputValue);
    planInput.value = "";
});
function addTodoItem(text) {
    const list = document.createElement("li");
    list.className = "plan__item";
    const span = document.createElement("span");
    span.className = "plan__text";
    span.textContent = text;
    const doneButton = document.createElement("button");
    doneButton.className = "plan__button";
    doneButton.textContent = "완료";
    doneButton.addEventListener("click", () => {
        list.remove();
        addDoneItem(text);
    });
    list.appendChild(span);
    list.appendChild(doneButton);
    todoList.appendChild(list);
}
function addDoneItem(text) {
    const list = document.createElement("li");
    list.className = "plan__item";
    const span = document.createElement("span");
    span.className = "plan__text";
    span.textContent = text;
    const deleteButton = document.createElement("button");
    deleteButton.className = "plan__button";
    deleteButton.textContent = "삭제";
    deleteButton.addEventListener("click", () => {
        list.remove();
    });
    list.appendChild(span);
    list.appendChild(deleteButton);
    doneList.appendChild(list);
}
