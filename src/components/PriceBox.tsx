// 커스텀 Redux hook을 가져온다.
// useDispatch는 action을 실행할 때 사용한다.
// useSelector는 Redux store의 값을 가져올 때 사용한다.
import { useDispatch, useSelector } from '../hooks/useCustomRedux';

// modalSlice에서 만든 openModal action을 가져온다.
// 전체 삭제 버튼을 눌렀을 때 바로 삭제하지 않고 모달을 열기 위해 사용한다.
import { openModal } from '../slices/modalSlice';

// PriceBox 컴포넌트를 만든다.
// 이 컴포넌트는 총 가격과 전체 삭제 버튼을 보여준다.
const PriceBox = () => {
  // Redux store의 cart state에서 total 값을 가져온다.
  // total은 장바구니 전체 가격이다.
  const { total } = useSelector((state) => state.cart);

  // dispatch 함수를 가져온다.
  // dispatch를 사용해서 reducer action을 실행할 수 있다.
  const dispatch = useDispatch();

  // 전체 삭제 버튼을 눌렀을 때 실행되는 함수이다.
  const handleInitializeCart = () => {
    // 기존에는 여기서 clearCart를 바로 실행했다.
    // 하지만 미션 2에서는 바로 삭제하지 않고 확인 모달을 먼저 열어야 한다.
    dispatch(openModal());
  };

  // 화면에 보여질 JSX를 반환한다.
  return (
    // 총 가격 영역과 전체 삭제 버튼을 감싸는 박스이다.
    <div className="p-12 flex justify-between">
      {/* 전체 삭제 버튼이다. */}
      {/* 클릭하면 handleInitializeCart 함수가 실행된다. */}
      <button
        // 버튼 클릭 시 모달을 여는 함수가 실행된다.
        onClick={handleInitializeCart}
        // Tailwind CSS로 버튼 스타일을 지정한다.
        className="border p-4 rounded-md cursor-pointer text-red-500 border-red-400 hover:bg-red-50"
      >
        {/* 버튼에 표시되는 글자이다. */}
        전체 삭제
      </button>

      {/* 장바구니 전체 가격을 화면에 보여준다. */}
      <div>총 가격: {total}원</div>
    </div>
  );
};

// 다른 파일에서 PriceBox 컴포넌트를 사용할 수 있도록 export 한다.
export default PriceBox;