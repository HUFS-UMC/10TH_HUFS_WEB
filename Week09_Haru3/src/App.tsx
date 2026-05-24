import CartList from "./components/CartList";
import { Provider  } from "react-redux";
import store from "./store/store";
import PriceBox from "./components/PriceBox";
import Navbar from "./components/Navbar";
import Modal from "./components/Modal";
import { useModalStore } from "./hooks/useModalStore";

const AppContent = () => {
    const isOpen = useModalStore((state) => state.isOpen);

    return (
        <>
            {isOpen && <Modal />}
            <Navbar />
            <CartList />
            <PriceBox />
        </>
    )
}

function App() {
    return(
        <Provider store={store}>
            <AppContent />
        </Provider>
    )
}

export default App;