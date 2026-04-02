interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
}

const ErrorMessage = ({ 
  message = '문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
  onRetry 
}: ErrorMessageProps) => {
  return (
    <div className='flex flex-col justify-center items-center h-screen bg-gray-50'>
      <div className='text-center'>
        <div className='text-6xl mb-4'>⚠️</div>
        <h2 className='text-2xl font-bold text-gray-800 mb-2'>오류 발생</h2>
        <p className='text-gray-600 text-lg mb-6'>{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className='px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition'
          >
            다시 시도
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
