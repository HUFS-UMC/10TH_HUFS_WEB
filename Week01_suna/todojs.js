export {};

const input = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const doneList = document.getElementById('done-list');


input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const value = input.value.trim();
        if (value !== "") {
            addTodo(value);
            input.value = "";
        }
    }
});

function addTodo(text) {
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${text}</span>
        <button class="complete-btn">완료</button>
    `;

    
    li.querySelector('.complete-btn').addEventListener('click', function() {
        moveToDone(li, text);
    });

    todoList.appendChild(li);
}

function moveToDone(li, text) {
    li.remove(); 

    const doneLi = document.createElement('li');
    doneLi.innerHTML = `
        <span>${text}</span>
        <button class="delete-btn">삭제</button>
    `;

    
    doneLi.querySelector('.delete-btn').addEventListener('click', function() {
        doneLi.remove();
    });

    doneList.appendChild(doneLi);
}