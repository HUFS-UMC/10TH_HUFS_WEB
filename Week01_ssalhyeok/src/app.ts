const input = document.getElementById("todo-input") as HTMLInputElement
const todoList = document.getElementById("todo-list") as HTMLUListElement
const doneList = document.getElementById("done-list") as HTMLUListElement

function createTodoItem(text: string): HTMLLIElement {

const li = document.createElement("li")
li.className = "todo__item"

const span = document.createElement("span")
span.textContent = text

const completeBtn = document.createElement("button")
completeBtn.textContent = "완료"
completeBtn.className = "todo__button todo__button--complete"

const deleteBtn = document.createElement("button")
deleteBtn.textContent = "삭제"
deleteBtn.className = "todo__button todo__button--delete"

completeBtn.addEventListener("click", () => {

doneList.appendChild(li)
completeBtn.remove()

})

deleteBtn.addEventListener("click", () => {

li.remove()

})

li.appendChild(span)
li.appendChild(completeBtn)
li.appendChild(deleteBtn)

return li
}

function addTodo(): void {

const text = input.value.trim()

if (!text) return

const todoItem = createTodoItem(text)

todoList.appendChild(todoItem)

input.value = ""

}

input.addEventListener("keydown", (event: KeyboardEvent) => {

if (event.key === "Enter") {

addTodo()

}

})