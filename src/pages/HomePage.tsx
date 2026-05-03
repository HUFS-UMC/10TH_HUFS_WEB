const HomePage = () => {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
        <div className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-sm font-bold mb-6">
          Welcome Back!
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 leading-tight">
          선아의 홈페이지에 <br /> 오신 것을 환영해요!
        </h2>
        <p className="text-slate-500 mb-10 max-w-md">
          이곳은 선아의 홈페이지입니다
        </p>
        <div className="flex gap-4">
          <button className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg hover:bg-blue-700 transition-all active:scale-95">
            시작하기
          </button>
          <button className="px-8 py-3 border border-slate-200 rounded-xl font-bold hover:bg-slate-50 transition-all text-slate-600">
            둘러보기
          </button>
        </div>
      </div>
    );
  };
  
  export default HomePage;