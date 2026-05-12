import { useEffect, useState } from "react";
import axiosInstance from "../\bapis/axios";
const MyPage = () => {
  const [userInfo, setUserInfo] = useState<any>(null);


  const fetchMyInfo = async () => {
    try {
      const response = await axiosInstance.get("http://localhost:8000/v1/users/me");
      setUserInfo(response.data);
    } catch (error) {
      console.error("정보 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    fetchMyInfo();
  }, []);

  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">마이페이지</h1>
      
      {userInfo ? (
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 inline-block text-left">
          <p className="text-lg"><strong>이메일:</strong> {userInfo.email}</p>
          <p className="text-lg"><strong>닉네임:</strong> {userInfo.name || userInfo.nickname}</p>
          <p className="text-sm text-green-600 mt-2">서버에서 정보를 실시간으로 가져왔어! ✅</p>
        </div>
      ) : (
        <p className="text-slate-600">사용자 정보를 불러오는 중...</p>
      )}

      <div className="mt-8 space-x-4">
        <button 
          onClick={fetchMyInfo}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          데이터 재요청 (인터셉터 테스트)
        </button>

        <button 
          onClick={() => {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            window.location.href = "/login";
          }}
          className="px-4 py-2 bg-red-500 text-white rounded-lg"
        >
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default MyPage;