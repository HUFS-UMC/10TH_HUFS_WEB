type PagenationProps = {
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
}


const Pagenation = ({page, setPage}: PagenationProps) => {
  return (
    <div className='flex justify-center items-center gap-4'>
        <button 
          className="flex justify-center items-center w-10 h-10 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-lg text-white font-semibold transition-all duration-200 cursor-pointer disabled:cursor-not-allowed disabled:from-slate-400 disabled:to-slate-400 disabled:opacity-50"
          disabled={page === 1} 
          onClick={() => setPage((prev) => prev - 1)}
        >
            ◀
        </button>
        
        <div className='px-6 py-2 bg-slate-800 border border-slate-600 rounded-lg'>
          <span className='text-white font-semibold'>{page}</span>
          <span className='text-slate-400 ml-1'>페이지</span>
        </div>
        
        <button 
          className="flex justify-center items-center w-10 h-10 rounded-lg bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 shadow-lg text-white font-semibold transition-all duration-200 cursor-pointer"
          onClick={() => setPage((prev) => prev + 1)}
        >
            ▶
        </button>
    </div>
  )
}

export default Pagenation
