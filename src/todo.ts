// 요소 가져오기 및 타입 지정
const input = document.getElementById('todo-input') as HTMLInputElement;
const todoList = document.getElementById('todo-list') as HTMLUListElement;
const doneList = document.getElementById('done-list') as HTMLUListElement;

// 엔터 키 이벤트 핸들러
input.addEventListener('keydown', (e: KeyboardEvent) => {
    // 한글 입력 중 엔터 중복 방지 (isComposing 체크)
    if (e.isComposing) return; 

    if (e.key === 'Enter' && input.value.trim() !== '') {
        createTodoItem(input.value.trim());
        input.value = ''; 
    }
});

// 할 일 아이템 생성 함수
function createTodoItem(text: string): void {
    const li = document.createElement('li');
    li.className = 'todo-item';

    const span = document.createElement('span');
    span.className = 'todo-item__text';
    span.textContent = text;

    const completeBtn = document.createElement('button');
    completeBtn.className = 'todo-item__button';
    completeBtn.textContent = '완료';

    // 완료 버튼 클릭 이벤트
    completeBtn.addEventListener('click', () => {
        moveToDone(li, text);
    });

    li.appendChild(span);
    li.appendChild(completeBtn);
    todoList.appendChild(li);
}

// 완료 목록으로 이동 함수
function moveToDone(oldLi: HTMLLIElement, text: string): void {
    oldLi.remove(); // 해야 할 일에서 삭제

    const li = document.createElement('li');
    li.className = 'todo-item';

    const span = document.createElement('span');
    span.className = 'todo-item__text';
    span.textContent = text;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'todo-item__button';
    deleteBtn.textContent = '삭제';

    // 삭제 버튼 클릭 이벤트
    deleteBtn.addEventListener('click', () => {
        li.remove();
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    doneList.appendChild(li);
}