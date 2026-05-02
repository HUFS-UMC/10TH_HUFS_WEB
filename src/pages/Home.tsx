
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { PAGINATIONORDER } from "../types/common";
import LpCard from "../components/LpCard/LpCard";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";
 
const Home = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState<PAGINATIONORDER>(PAGINATIONORDER.desc);
 
  const {
    data: lps,
    isFetching,
    hasNextPage,
    isPending,
    fetchNextPage,
    isError,
  } = useGetInfiniteLpList(20, search, order);
 
  const { ref, inView } = useInView({ threshold: 0 });
 
  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);
 
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f0f0f",
        paddingTop: "56px", // header height
        paddingLeft: "0",
      }}
    >
      {/* ── TOOLBAR ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: "14px 20px 10px",
          gap: "8px",
        }}
      >
        <button
          onClick={() => setOrder(PAGINATIONORDER.asc)}
          style={{
            fontSize: "12px",
            padding: "5px 12px",
            borderRadius: "6px",
            border: "1px solid",
            cursor: "pointer",
            fontFamily: "inherit",
            transition: "all 0.15s",
            background: order === PAGINATIONORDER.asc ? "#242424" : "transparent",
            color: order === PAGINATIONORDER.asc ? "#f0f0f0" : "#888",
            borderColor: order === PAGINATIONORDER.asc ? "#444" : "#2a2a2a",
          }}
        >
          오래된순
        </button>
        <button
          onClick={() => setOrder(PAGINATIONORDER.desc)}
          style={{
            fontSize: "12px",
            padding: "5px 12px",
            borderRadius: "6px",
            border: "1px solid",
            cursor: "pointer",
            fontFamily: "inherit",
            transition: "all 0.15s",
            background: order === PAGINATIONORDER.desc ? "#242424" : "transparent",
            color: order === PAGINATIONORDER.desc ? "#f0f0f0" : "#888",
            borderColor: order === PAGINATIONORDER.desc ? "#444" : "#2a2a2a",
          }}
        >
          최신순
        </button>
      </div>
 
      {/* ── ERROR ── */}
      {isError && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            padding: "80px 20px",
            color: "#888",
          }}
        >
          <svg width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <p style={{ fontSize: "14px" }}>데이터를 불러오지 못했어요.</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              fontSize: "13px",
              padding: "8px 20px",
              borderRadius: "6px",
              border: "1px solid #333",
              background: "transparent",
              color: "#aaa",
              cursor: "pointer",
            }}
          >
            다시 시도
          </button>
        </div>
      )}
 
      {/* ── GRID ── */}
      {!isError && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
            gap: "4px",
            padding: "0 4px 120px",
          }}
        >
          {isPending ? (
            <LpCardSkeletonList count={20} />
          ) : (
            lps?.pages
              ?.map((page) => page.data.data)
              ?.flat()
              ?.map((lp) => <LpCard key={lp.id} lp={lp} />)
          )}
          {isFetching && !isPending && <LpCardSkeletonList count={8} />}
        </div>
      )}
 
      {/* Infinite scroll sentinel */}
      <div ref={ref} style={{ height: "1px" }} />
 
      {/* ── FAB ── */}
      <button
        onClick={() => navigate("/lp/new")}
        aria-label="새 LP 추가"
        style={{
          position: "fixed",
          bottom: "28px",
          right: "28px",
          width: "52px",
          height: "52px",
          borderRadius: "50%",
          border: "none",
          background: "#ff2d78",
          color: "#fff",
          fontSize: "28px",
          lineHeight: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 4px 20px rgba(255,45,120,0.45)",
          transition: "transform 0.15s, background 0.2s",
          zIndex: 200,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        +
      </button>
    </div>
  );
};
 
export default Home;