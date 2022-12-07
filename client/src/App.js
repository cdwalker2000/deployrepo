import './App.css';
import Server from './pages/Server';
import Login from './pages/Login';
import Home from './pages/Home'
import Accessibility from './pages/Accessibility';
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Customer1 from './pages/Customer1';
import Customer2 from './pages/Customer2';

function App() {
  return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/server" element={<Server/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/acc" element={<Accessibility/>}/>
            <Route path="/customer1" element={<Customer1/>}/>
            <Route path="/customer2" element={<Customer2/>}/>
          </Routes>
        </BrowserRouter>
  );
}

export default App;
