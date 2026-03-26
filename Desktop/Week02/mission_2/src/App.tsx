import './App.css';
import Todo from './components/Todo';
import ThemeToggleButton from "./components/ThemeToggleButton";

function App() {
  return (
    /* 1. 배경색 설정을 여기서 해줘야 다크모드가 전체에 먹혀! */
    <div className="min-h-screen bg-white dark:bg-slate-900 text-black dark:text-white transition-colors duration-500">
      
      {/* 2. 우리가 만든 토글 버튼 심기 */}
      <ThemeToggleButton />

      {/* 3. 정민이의 투두리스트 소환! */}
      <main className="p-10">
        <Todo /> 
      </main>
      
    </div>
  );
}

export default App;