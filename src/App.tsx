import './App.css';
import CartList from './components/CartList';
import Modal from './components/Modal';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <CartList />
      <Modal />
    </>
  );
}

export default App;