import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getLpDetail } from "../apis/lp";

const LpDetailPage = () => {
  const { lpId } = useParams();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["lp", lpId],
    queryFn: () => getLpDetail(lpId!),
    enabled: Boolean(lpId),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  if (isLoading) return <div>로딩 중...</div>;

  if (isError) {
    return (
      <div>
        <p>LP 상세 정보를 불러오지 못했습니다.</p>
        <button onClick={() => refetch()}>다시 시도</button>
      </div>
    );
  }

  const lp = data?.data;

  if (!lp) {
    return <div>LP 정보가 없습니다.</div>;
  }
  return (
    <section>
      <h1>{lp.title}</h1>
      <p>{lp.content}</p>

      <img src={lp.thumbnail} alt={lp.title} />

      <p>
        작성자: {lp.author?.name ?? "알 수 없음"}
      </p>

      <p>
        게시일: {new Date(lp.createdAt).toLocaleDateString()}
      </p>

      <p>좋아요 {lp.likes.length}</p>

      <div>
        {lp.tags.map((tag) => (
          <span key={tag.id}>#{tag.name}</span>
        ))}
      </div>
    </section>
  );
};

export default LpDetailPage;