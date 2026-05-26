import { useDispatch } from '../hooks/useCustomRedux';
import { closeModal } from '../slices/modalSlice';
import { clearCart } from '../slices/cartSlice';

const Modal = () => {
  const dispatch = useDispatch();

  return (
    // 어두운 반투명 오버레이
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg p-8 shadow-xl flex flex-col items-center gap-6'>
        <p className='text-lg font-semibold'>정말 삭제하시겠습니까?</p>
        <div className='flex gap-4'>
          <button
            onClick={() => dispatch(closeModal())}
            className='px-6 py-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer'
          >
            아니요
          </button>
          <button
            onClick={() => {
              dispatch(clearCart());
              dispatch(closeModal());
            }}
            className='px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer'
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;