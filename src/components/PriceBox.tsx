import { useDispatch, useSelector } from '../hooks/useCustomRedux';
import { openModal } from '../slices/modalSlice';

const PriceBox = () => {
  const { total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // 장바구니 초기화 버튼을 눌렀을 때 실행되는 함수
  // 여기서는 바로 장바구니를 삭제하지 않는다.
  // 먼저 확인 모달을 열어준다.
  const handleInitializeCart = () => {
    dispatch(openModal());
  };

  return (
    <div className="p-12 flex justify-between">
      <button
        onClick={handleInitializeCart}
        className="border p-4 rounded-md cursor-pointer text-red-500 border-red-400 hover:bg-red-50"
      >
        전체 삭제
      </button>

      <div>총 가격: {total}원</div>
    </div>
  );
};

export default PriceBox;