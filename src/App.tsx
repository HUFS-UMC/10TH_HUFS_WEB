import './App.css'
import { BrowserRouter } from 'react-router-dom';
import HomePage2 from './pages/HomePage2';

export default function App() {
    return (
        <BrowserRouter>
            <HomePage2 />
        </BrowserRouter>
    );
}