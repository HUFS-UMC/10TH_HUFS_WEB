import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-9xl font-black text-blue-100">404</h1>
      <div className="relative -mt-10 mb-8">
        <h2 className="text-2xl font-bold text-slate-800">길을 잃으셨나요?</h2>
        <p className="text-slate-500 mt-2">요청하신 페이지를 찾을 수 없어요.</p>
      </div>
      <button 
        onClick={() => navigate("/")}
        className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-md hover:bg-blue-700 transition-all"
      >
        홈으로 돌아가기
      </button>
    </div>
  );
};

export default NotFound;