import { useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getSearchLpList } from "../apis/lp";


interface SearchModalProps {
    open: boolean;
    onClose: ()=> void;
}

export function SearchModal({open, onClose}: SearchModalProps){
    const [query, setQuery] = useState("");
    const debouncedQuery = useDebounce(query, 300);
    const searchKeyword  = debouncedQuery.trim(); //공백 제거.
    const isSearchEnabled = searchKeyword.length >0;

        const {
        data,
        isLoading,
        isError,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        } = useInfiniteQuery({
        queryKey: ["search", searchKeyword],
        queryFn: ({ pageParam }) =>
            getSearchLpList({
            search: searchKeyword,
            cursor: pageParam as number | null,
            limit: 10,
            order: "desc",
        }),
        initialPageParam: null as number | null,
        getNextPageParam: (lastPage) => lastPage.data.nextCursor,
        enabled: open && isSearchEnabled,
        staleTime: 1000 * 60,
        gcTime: 1000 * 60 * 5,
        });
        const searchResults =
  data?.pages.flatMap((page) => page.data.data) ?? [];

    if(!open) return null;

    return (
        <div
        className="fixed inset-0 z-50 flex justify-center bg-black/70 px-4 pt-24"
        onClick={onClose}>
            <div
            className="h-fit w-full max-w-xl rounded-xl border border-zinc-700 bg-zinc-900 p-4"
            onClick={(e)=>e.stopPropagation()} >
                <input
                value={query}
                onChange={(e)=>setQuery(e.target.value)}
                placeholder="검색어를 입력하세요"
                autoFocus
                className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none focus:border-pink-500"
                />
                {isLoading && (
                <p className="mt-4 text-zinc-400">검색 중...</p>
                )}

            {isError && (
            <p className="mt-4 text-red-400">
                {error instanceof Error
                ? error.message
                : "검색 중 오류가 발생했습니다."}
            </p>
            )}

            {!isLoading && isSearchEnabled && searchResults.length === 0 && (
            <p className="mt-4 text-zinc-400">검색 결과가 없습니다.</p>
            )}

            <ul className="mt-4 space-y-2">
            {searchResults.map((lp) => (
                <li key={lp.id} className="rounded-md bg-zinc-800 p-3">
                {lp.title}
                </li>
            ))}
            </ul>

            {hasNextPage && (
            <button
                type="button"
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="mt-4 rounded-md bg-pink-500 px-4 py-2 text-white disabled:opacity-50"
            >
                {isFetchingNextPage ? "불러오는 중..." : "더보기"}
            </button>
            )}
            </div>
             <div className="mt-4 text-sm text-zinc-400">
          <p>
            입력값 query:{" "}
            <span className="text-white">{query || "없음"}</span>
          </p>

          <p>
            debouncedQuery:{" "}
            <span className="text-pink-400">{debouncedQuery || "없음"}</span>
          </p>
        </div>
        </div>
    );
}
