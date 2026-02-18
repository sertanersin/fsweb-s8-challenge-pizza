import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import OrderForm from '../pages/OrderForm';
import Success from '../pages/Success';

function App() {
  return (
    <>      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/siparis" element={<OrderForm />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </>
  )
}
export default App;