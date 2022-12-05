import './App.css';
import Server from './pages/Server';
import Login from './pages/Login';
import Home from './pages/Home';
import Accessibility from './pages/Accessibility';
import Customer1 from './pages/Customer1';
import Customer2 from './pages/Customer2';
import { BrowserRouter,Routes,Route } from 'react-router-dom'

function App() {
  return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Customer1/>}/>
            <Route path="/server" element={<Server/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/acc" element={<Accessibility/>}/>
            <Route path="/cus1" element={<Customer1/>}/>
            <Route path="/cus2" element={<Customer2/>}/>

          </Routes>
        </BrowserRouter>
  );
}

export default App;
