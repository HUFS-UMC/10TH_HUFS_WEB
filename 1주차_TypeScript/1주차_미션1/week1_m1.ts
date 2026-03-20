const todoForm = document.getElementById("todo-form") as HTMLFormElement;
const todoInput = document.getElementById("todo-input") as HTMLInputElement;
const todoList = document.getElementById("todo-list") as HTMLUListElement;
const doneList = document.getElementById("done-list") as HTMLUListElement;
if (!todoForm || !todoInput || !todoList || !doneList) {
  throw new Error("필요한 HTML 요소를 찾을 수 없음");
}

function createTodoItem(text: string): void {
  const li = document.createElement("li");
  li.className = "todo-app__item";

  const span = document.createElement("span");
  span.className = "todo-app__text";
  span.textContent = text;

  const doneButton = document.createElement("button");
  doneButton.type = "button";
  doneButton.className = "todo-app__button todo-app__button--done";
  doneButton.textContent = "완료";

  doneButton.addEventListener("click", () => {
    moveToDone(text);
    li.remove();
  });

  li.appendChild(span);
  li.appendChild(doneButton);

  return li;
}

function moveToDone(text: string): void {
  const li = document.createElement("li");
  li.className = "todo-app__item";

  const span = document.createElement("span");
  span.className = "todo-app__text";
  span.textContent = text;

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "todo-app__button todo-app__button--delete";
  deleteButton.textContent = "삭제";

  deleteButton.addEventListener("click", () => {
    li.remove();
  });

  li.appendChild(span);
  li.appendChild(deleteButton);

  doneList.appendChild(li);
}

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = todoInput.value.trim();
  if (!text) return;

  const item = createTodoItem(text);
  todoList.appendChild(item);

  todoInput.value = "";
  todoInput.focus();
});