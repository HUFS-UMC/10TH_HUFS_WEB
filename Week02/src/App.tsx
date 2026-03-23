import {useState} from "react";

interface Task{
  id:number;
  text: string;
  isDone: boolean;
}
function App() {
  const [input, setInput] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]); //제네릭으로 인터페이스와 상태 연결.


  const addTask = ():void =>{
    if(input === ""){
      return;
    }
    const newTask: Task ={
      id: Date.now(),
      text: input,
      isDone: false,
    }
    setTasks([...tasks, newTask]); //이전 tasks 펼치고 뒤에 newTask 추가.
    setInput("");
  }
  const completeTask = (id: number):void =>{
    setTasks(
      tasks.map((task)=>(
        task.id === id ? {...task, isDone:true}: task
      ))
    );
  }
const deleteTask = (id: number): void => {
  setTasks(tasks.filter((task) => task.id !== id));
};

  const todoTasks = tasks.filter((task)=>task.isDone === false);
  const doneTasks = tasks.filter((task)=>task.isDone === true);

  return (
     <>
     <h1>KIWI TODO</h1>
     <form
        onSubmit={(e)=>{
          e.preventDefault();
          addTask();
        }}  
      >
      <input
          onChange={(e)=>setInput(e.target.value)}    
          value={input}
          type="text"
          placeholder="할 일 입력"
          required/>
      <button type="submit">할 일 추가</button>
     </form>
     <h2>할 일</h2>
     <ul>
      {todoTasks.map((task)=>(
        <li key={task.id}>
          {task.text}
          <button onClick={()=>completeTask(task.id)}>완료</button>
        </li>
      ))}
     </ul>
      <h2>끝난 일</h2>
     <ul>
      {doneTasks.map((task)=>(
        <li key={task.id}>
          {task.text}
          <button onClick={()=>deleteTask(task.id)}>삭제</button>
        </li>
      ))}
     </ul>

     </>
  )
}

export default App