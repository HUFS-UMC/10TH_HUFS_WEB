import { Provider } from "react-redux";
import "./App.css";
import CartList from "./components/CartList";
import NavBar from "./components/NavBar";
import store from "./store/store";
import PriceBox from "./components/PriceBox";
import Modal from "./components/Modal";

function App() {
  return (
    <Provider store={store}>
      <NavBar />
      <CartList />
      <PriceBox />
      <Modal />
    </Provider>
  );
}

export default App;
