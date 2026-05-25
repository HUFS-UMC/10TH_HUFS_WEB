import './App.css'
import CartList from './components/CartList';
import Navbar from './components/Navbar';
import PriceBox from './components/PriceBox';
import Modal from './components/Modal';
import useCartStore from './store/useCartStore';

function App() {
  const { isOpen } = useCartStore();

  return (
    <>
      <Navbar/>
      <CartList/>
      <PriceBox/>

      {isOpen && <Modal />}
    </>
  )
}

export default App;