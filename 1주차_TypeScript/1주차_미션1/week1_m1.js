var todoForm = document.getElementById("todo-form");
var todoInput = document.getElementById("todo-input");
var todoList = document.getElementById("todo-list");
var doneList = document.getElementById("done-list");
function createTodoItem(text) {
    var li = document.createElement("li");
    li.className = "todo-app__item";
    var span = document.createElement("span");
    span.className = "todo-app__text";
    span.textContent = text;
    var doneButton = document.createElement("button");
    doneButton.type = "button";
    doneButton.className = "todo-app__button todo-app__button--done";
    doneButton.textContent = "완료";
    doneButton.addEventListener("click", function () {
        moveToDone(text);
        li.remove();
    });
    li.appendChild(span);
    li.appendChild(doneButton);
    return li;
}
function moveToDone(text) {
    var li = document.createElement("li");
    li.className = "todo-app__item";
    var span = document.createElement("span");
    span.className = "todo-app__text";
    span.textContent = text;
    var deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "todo-app__button todo-app__button--delete";
    deleteButton.textContent = "삭제";
    deleteButton.addEventListener("click", function () {
        li.remove();
    });
    li.appendChild(span);
    li.appendChild(deleteButton);
    doneList.appendChild(li);
}
todoForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var text = todoInput.value.trim();
    if (!text)
        return;
    var item = createTodoItem(text);
    todoList.appendChild(item);
    todoInput.value = "";
    todoInput.focus();
});
