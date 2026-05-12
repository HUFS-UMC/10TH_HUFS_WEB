const MyPage = () => {
    return (
      <div className="p-10 text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">마이페이지</h1>
        <p className="text-slate-600">축하해! 로그인을 했기 때문에 이 페이지를 볼 수 있어. 🔓</p>
        
        <button 
          onClick={() => {
            localStorage.removeItem("accessToken");
            window.location.reload();
          }}
          className="mt-6 px-4 py-2 bg-red-500 text-white rounded-lg"
        >
          로그아웃 테스트
        </button>
      </div>
    );
  };
  
  export default MyPage;