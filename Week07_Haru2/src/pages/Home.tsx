
import { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import LpCard from "../components/LpCard/LpCard";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";
import LpCreateModal from "../components/LpCard/LpCreateModal";
import { useAuth } from "../context/AuthContext";
import { PAGINATIONORDER } from "../types/common";

const Home = () => {
    const { accessToken } = useAuth();
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [order, setOrder] = useState<PAGINATIONORDER>(PAGINATIONORDER.desc);
    const [showModal, setShowModal] = useState(false);
    const { ref, inView } = useInView();
    const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    // 검색어 디바운스
    useEffect(() => {
        if (debounceTimer.current) clearTimeout(debounceTimer.current);
        debounceTimer.current = setTimeout(() => setDebouncedSearch(search), 400);
        return () => { if (debounceTimer.current) clearTimeout(debounceTimer.current); };
    }, [search]);

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isPending,
        isFetchingNextPage,
        isError,
    } = useGetInfiniteLpList(12, debouncedSearch, order);

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

    const allLps = data?.pages.flatMap((page) => page.data.data) ?? [];

    return (
        <div className="max-w-5xl mx-auto px-5 py-8">
            {/* 검색 + 정렬 */}
            <div className="flex items-center gap-3 mb-8">
                <div className="relative flex-1">
                    <svg
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600"
                        width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                    >
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="LP 검색..."
                        className="w-full bg-[#111] border border-[#2a2a2a] rounded-xl pl-9 pr-4 py-2.5 text-sm text-gray-300 placeholder-gray-600 focus:border-pink-500 outline-none transition-colors"
                    />
                </div>

                <div className="flex rounded-xl overflow-hidden border border-[#2a2a2a]">
                    {([PAGINATIONORDER.desc, PAGINATIONORDER.asc] as const).map((o) => (
                        <button
                            key={o}
                            onClick={() => setOrder(o)}
                            className={`px-4 py-2.5 text-xs font-semibold transition-colors cursor-pointer border-none ${
                                order === o
                                    ? "bg-pink-600 text-white"
                                    : "bg-[#111] text-gray-500 hover:text-gray-300"
                            }`}
                        >
                            {o === "desc" ? "최신순" : "오래된순"}
                        </button>
                    ))}
                </div>
            </div>

            {/* 에러 */}
            {isError && (
                <div className="flex justify-center py-20 text-gray-500 text-sm">
                    LP 목록을 불러오지 못했어요.
                </div>
            )}

            {/* 그리드 */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {isPending ? (
                    <LpCardSkeletonList count={12} />
                ) : (
                    allLps.map((lp) => <LpCard key={lp.id} lp={lp} />)
                )}
                {isFetchingNextPage && <LpCardSkeletonList count={4} />}
            </div>

            {/* 검색 결과 없음 */}
            {!isPending && allLps.length === 0 && !isError && (
                <div className="flex flex-col items-center justify-center py-24 text-gray-600 gap-2">
                    <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <p className="text-sm">검색 결과가 없어요</p>
                </div>
            )}

            {/* 무한 스크롤 트리거 */}
            <div ref={ref} className="h-4" />

            {/* LP 추가 버튼 (로그인 시만) */}
            {accessToken && (
                <button
                    onClick={() => setShowModal(true)}
                    className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-pink-600 hover:bg-pink-500 text-white shadow-xl flex items-center justify-center transition-all hover:scale-110 cursor-pointer border-none z-40"
                    title="LP 추가"
                >
                    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                </button>
            )}

            {/* LP 작성 모달 */}
            {showModal && <LpCreateModal onClose={() => setShowModal(false)} />}
        </div>
    );
};

export default Home;