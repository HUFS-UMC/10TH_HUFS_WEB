import useCartStore from "../store/useCartStore";

const PriceBox = () => {
    const {
        total,
        openModal,
    } = useCartStore();

    return (
        <div className="p-12 flex justify-between">
            <button
                onClick={openModal}
                className="border p-4 rounded-md"
            >
                장바구니 초기화
            </button>

            <div>
                총 가격 : {total}원
            </div>
        </div>
    );
};

export default PriceBox;