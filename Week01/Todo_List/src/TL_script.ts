type Todo = {
  text: string
  completed: boolean
}

const input = document.getElementById("todoInput") as HTMLInputElement
const todoList = document.getElementById("todoList") as HTMLUListElement
const doneList = document.getElementById("doneList") as HTMLUListElement

let todos: Todo[] = []

function createTodoItem(todo: Todo): HTMLLIElement {

  const li = document.createElement("li")

  const span = document.createElement("span")
  span.textContent = todo.text

  const completeBtn = document.createElement("button")
  completeBtn.textContent = "완료"
  completeBtn.className = "complete"

  li.append(span, completeBtn)

  completeBtn.addEventListener("click", () => {

    completeBtn.remove()

    const deleteBtn = document.createElement("button")
    deleteBtn.textContent = "삭제"
    deleteBtn.className = "delete"

    li.append(deleteBtn)
    doneList.append(li)

    deleteBtn.addEventListener("click", () => {
      li.remove()
    })

  })

  return li
}

input.addEventListener("keyup", (e: KeyboardEvent) => {

  if (e.key !== "Enter") return

  const text = input.value.trim()
  if (text === "") return

  const newTodo: Todo = {
    text,
    completed: false
  }

  todos.push(newTodo)

  const todoItem = createTodoItem(newTodo)
  todoList.append(todoItem)

  input.value = ""

})