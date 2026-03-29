type PagenationProps = {
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
}


const Pagenation = ({page, setPage}: PagenationProps) => {
  return (
    <div className='flex justify-center items-center gap-6 my-5'>
        <button 
        className="flex justify-center items-center w-10 h-10 rounded-lg bg-gray-300 shadow-md
        text-gray-700 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400
        hover:bg-gray-400 transition-all duration-200 cursor-pointer"
        disabled={page === 1} onClick={() => setPage((prev) => prev - 1)}>
            {`<`}
        </button>
        <span>{page} 페이지</span>
        <button 
        className="flex justify-center items-center w-10 h-10 rounded-lg bg-gray-300 shadow-md
        text-gray-700 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400
        hover:bg-gray-400 transition-all duration-200 cursor-pointer"
        onClick={() => setPage((prev) => prev + 1)}>
            {`>`}
        </button>
    </div>
  )
}

export default Pagenation
