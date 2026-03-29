import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

const SsalhyeokPage = () => <h1>쌀혁 페이지</h1>;
const TaehyeokPage = () => <h1>태혁 페이지</h1>;
const NotFoundPage = () => <h1>404</h1>;

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/ssalhyeok">SSALHYEOK  </Link>
        <Link to="/taehyeok">TAEHYEOK  </Link>
        <Link to='/not-found'>NOT FOUND  </Link>
      </nav>

      <Routes>
        <Route path="/ssalhyeok" element={<SsalhyeokPage />} />
        <Route path="/taehyeok" element={<TaehyeokPage />} />
        <Route path='/not-found' element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;