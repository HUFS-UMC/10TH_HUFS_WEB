import { createContext, useContext, useState } from "react";
import type {ReactNode, Dispatch, SetStateAction} from "react";

interface Task {
  id: number;
  text: string;
  isDone: boolean;
}

interface TodoContextType{
    input: string;
    setInput: Dispatch<SetStateAction<string>>;
    tasks: Task[];
    completeTask:(id:number)=>void;
    deleteTask:(id: number) => void;
    addTask: () => void

}
const TodoContext = createContext<TodoContextType|undefined>
    (undefined);


export const TodoProvider = ({children}: {children:ReactNode})=>{

      const [input, setInput] = useState<string>("");
      const [tasks, setTasks] = useState<Task[]>([]);
    
      const addTask = (): void => {
        if (input.trim() === "") {
          return;
        }
    
        const newTask: Task = {
          id: Date.now(),
          text: input.trim(),
          isDone: false,
        };
    
        setTasks((prev)=>[...prev, newTask]);
        setInput("");
      };
    
      const completeTask = (id: number): void => {
        setTasks(
          tasks.map((task) =>
            task.id === id ? { ...task, isDone: true } : task
          )
        );
      };
    
      const deleteTask = (id: number): void => {
        setTasks((prev)=> prev.filter((task) => task.id !== id));
      };
      return (
        <TodoContext.Provider
        value={{
            input, 
            setInput,
            tasks,
            addTask,
            completeTask,
            deleteTask,
        }}>
            {children}
        </TodoContext.Provider>
      );

};
export const useTodo = ()=>{
    const context = useContext(TodoContext);
    if(!context){
        throw new Error("useTodo must be used within a TodoProvider");
    }
    return context;
}
