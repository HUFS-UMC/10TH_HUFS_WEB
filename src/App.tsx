import { Provider } from 'react-redux';
import './App.css';
import CartList from './components/CartList';
import Modal from './components/Modal';
import Navbar from './components/Navbar';
import PriceBox from './components/PriceBox';
import store from './store/store';

function App() {
  return (
    <Provider store={store}>
      <Navbar />
      <CartList />
      <PriceBox />

      {/* 모달 컴포넌트 */}
      {/* modalSlice의 isOpen 값이 true일 때만 화면에 보임 */}
      <Modal />
    </Provider>
  );
}

export default App;