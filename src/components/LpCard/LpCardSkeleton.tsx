const LpCardSkeleton = () => {
  return (
    <div className="relative rounded-lg overflow-hidden shadow-lg animate-pulse">
      <div className="w-full h-48 bg-gray-300" />

      <div className="absolute bottom-0 left-0 right-0 bg-black/75 p-2">
        <div className="h-4 bg-gray-500 rounded w-3/4" />
      </div>
    </div>
  );
};

export default LpCardSkeleton;