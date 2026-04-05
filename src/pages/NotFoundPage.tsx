const NotFoundPage = () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <h1 className="text-3xl font-bold text-red-500">
          에러가 발생했습니다.
        </h1>
        <p className="text-gray-600">
          요청하신 페이지를 찾을 수 없습니다. 주소를 다시 확인해 주세요!
        </p>
        <button 
          onClick={() => window.location.href = '/'}
          className="mt-4 px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
        >
          홈으로 돌아가기
        </button>
      </div>
    );
  };
  
  export default NotFoundPage;