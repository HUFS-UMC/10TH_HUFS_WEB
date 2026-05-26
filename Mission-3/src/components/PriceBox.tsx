import { useCartInfo } from "../stores/cartStore";
import { useModalActions } from "../stores/modalStore";

const PriceBox = () => {
  const { total } = useCartInfo();
  const { openModal } = useModalActions();

  return (
    <div className="p-12 flex justify-between items-center">
      <div>
        <button
          className="border p-4 rounded-md cursor-pointer"
          onClick={openModal}
        >
          장바구니 초기화
        </button>
      </div>
      <div>총 가격: {total} 원</div>
    </div>
  );
};

export default PriceBox;
