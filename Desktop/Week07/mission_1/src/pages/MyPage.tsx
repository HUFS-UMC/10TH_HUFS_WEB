import { useState, useRef, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../apis/axios";

const MyPage = () => {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: userData } = useQuery({
    queryKey: ["userMe"],
    queryFn: async () => {
      const res = await api.get("/users/me");
      return res.data.data;
    },
  });

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (userData) {
      setName(userData.name || "");
      setBio(userData.bio || "");
      setPreview(userData.avatar || "");
    }
  }, [userData]);

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: { name: string; bio: string }) => {
      return await api.patch("/users", data); 
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userMe"] });
      alert("저장 성공");
    },
    onError: (error: any) => {
      alert(`실패: ${error.response?.data?.message}`);
    }
  });

  const handleSubmit = () => {
    if (!name) return alert("이름을 작성하세요");
  
    mutate({
      name: name,
      bio: bio || "" 
    });
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center font-sans">
      <div className="flex items-center gap-12 bg-[#121212] p-12 rounded-3xl border border-gray-800 shadow-2xl">
        
        <div className="relative cursor-pointer group" onClick={() => fileInputRef.current?.click()}>
          <img 
            src={preview || "https://via.placeholder.com/150"} 
            className="w-44 h-44 rounded-full object-cover border-4 border-[#2c2c2c] transition-all group-hover:brightness-75" 
          />
          <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) { setFile(f); setPreview(URL.createObjectURL(f)); }
          }} />
        </div>

        <div className="flex flex-col gap-5">
          <div className="relative flex items-center">
            <input 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-transparent border border-white p-3 rounded-xl w-72 text-2xl font-bold outline-none focus:border-pink-500 transition-colors"
              placeholder="이름"
            />
            <button 
              onClick={handleSubmit} 
              disabled={isPending}
              className="ml-4 text-3xl text-white hover:text-pink-500 transition-colors"
            >
              {isPending ? "⏳" : "✔"}
            </button>
          </div>

          <input 
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="bg-transparent border border-gray-500 p-3 rounded-xl w-full text-lg text-gray-300 outline-none focus:border-pink-500 transition-colors"
            placeholder="Bio (자기소개)"
          />

          <p className="text-gray-500 text-sm font-light ml-1">{userData?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default MyPage;