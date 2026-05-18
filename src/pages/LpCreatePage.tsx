import { useNavigate } from "react-router-dom";

const LpCreatePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-dvh bg-[#020617] px-4 py-10 text-white">
      <section className="mx-auto max-w-2xl rounded-xl bg-gray-800 p-6 md:p-10">
        <h1 className="text-2xl font-bold">LP 작성 페이지</h1>

        <p className="mt-4 text-gray-400">
          여기서 새 LP를 등록하는 폼을 만들 예정입니다.
        </p>

        <div className="mt-8 flex flex-col gap-4">
          <input
            type="text"
            placeholder="LP 제목"
            className="rounded-md border border-gray-700 bg-gray-900 p-3 text-white placeholder:text-gray-500 focus:border-pink-500 focus:outline-none"
          />

          <textarea
            placeholder="LP 내용"
            rows={5}
            className="resize-none rounded-md border border-gray-700 bg-gray-900 p-3 text-white placeholder:text-gray-500 focus:border-pink-500 focus:outline-none"
          />

          <input
            type="text"
            placeholder="썸네일 이미지 URL"
            className="rounded-md border border-gray-700 bg-gray-900 p-3 text-white placeholder:text-gray-500 focus:border-pink-500 focus:outline-none"
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="rounded-md bg-gray-600 px-4 py-2 hover:bg-gray-700"
            >
              취소
            </button>

            <button
              type="button"
              className="rounded-md bg-pink-500 px-4 py-2 font-semibold hover:bg-pink-600"
            >
              등록
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LpCreatePage;