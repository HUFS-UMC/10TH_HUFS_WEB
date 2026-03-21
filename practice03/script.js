const planForm = document.getElementById("plan__form");
const planInput = document.getElementById("plan__input");
const todoList = document.getElementById("todolist");
const doneList = document.getElementById("donelist");

planForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = planInput.value.trim();
  if (inputValue === "") return;

  addTodoItem(inputValue);
  planInput.value = "";
});
function createPlanItem(text, buttonText, buttonHandler) {
  const list = document.createElement("li");
  list.className = "plan__item";

  const span = document.createElement("span");
  span.className = "plan__text";
  span.textContent = text;

  const button = document.createElement("button");
  button.className = "plan__button";
  button.textContent = buttonText;

  button.addEventListener("click", () => {
    buttonHandler(list, text);
  });

  list.appendChild(span);
  list.appendChild(button);

  return list;
}

function addTodoItem(text) {
  const list = createPlanItem(text, "완료", (list, text) => {
    list.remove();
    addDoneItem(text);
  });

  todoList.appendChild(list);
}

function addDoneItem(text) {
  const list = createPlanItem(text, "삭제", (list) => {
    list.remove();
  });

  doneList.appendChild(list);
}