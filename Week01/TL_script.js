var input = document.getElementById("todoInput");
var todoList = document.getElementById("todoList");
var doneList = document.getElementById("doneList");
var todos = [];
function createTodoItem(todo) {
    var li = document.createElement("li");
    var span = document.createElement("span");
    span.textContent = todo.text;
    var completeBtn = document.createElement("button");
    completeBtn.textContent = "완료";
    completeBtn.className = "complete";
    li.append(span, completeBtn);
    completeBtn.addEventListener("click", function () {
        completeBtn.remove();
        var deleteBtn = document.createElement("button");
        deleteBtn.textContent = "삭제";
        deleteBtn.className = "delete";
        li.append(deleteBtn);
        doneList.append(li);
        deleteBtn.addEventListener("click", function () {
            li.remove();
        });
    });
    return li;
}
input.addEventListener("keyup", function (e) {
    if (e.key !== "Enter")
        return;
    var text = input.value.trim();
    if (text === "")
        return;
    var newTodo = {
        text: text,
        completed: false
    };
    todos.push(newTodo);
    var todoItem = createTodoItem(newTodo);
    todoList.append(todoItem);
    input.value = "";
});
