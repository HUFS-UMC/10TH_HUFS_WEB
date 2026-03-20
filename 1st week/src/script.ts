const todoInput = document.getElementById("todo-input") as HTMLInputElement;
const addButton = document.getElementById("add-button") as HTMLButtonElement;
const todoList = document.getElementById("todo-list") as HTMLUListElement;
const doneList = document.getElementById("done-list") as HTMLUListElement;

function createTodoItem(text:string){

  const li=document.createElement("li");

  const span=document.createElement("span");
  span.textContent=text;

  const completeBtn=document.createElement("button");
  completeBtn.textContent="완료";
  completeBtn.className="complete";

  completeBtn.onclick=()=>{
    moveToDone(text);
    li.remove();
  };

  li.appendChild(span);
  li.appendChild(completeBtn);

  return li;
}

function createDoneItem(text:string){

  const li=document.createElement("li");

  const span=document.createElement("span");
  span.textContent=text;

  const deleteBtn=document.createElement("button");
  deleteBtn.textContent="삭제";
  deleteBtn.className="delete";

  deleteBtn.onclick=()=>{
    li.remove();
  };

  li.appendChild(span);
  li.appendChild(deleteBtn);

  return li;
}

function addTodo(){

  const text=todoInput.value.trim();

  if(text==="") return;

  const item=createTodoItem(text);

  todoList.appendChild(item);

  todoInput.value="";
}

function moveToDone(text:string){

  const item=createDoneItem(text);

  doneList.appendChild(item);
}

addButton.onclick=addTodo;

todoInput.addEventListener("keydown",(e)=>{
  if(e.key==="Enter"){
    addTodo();
  }
});