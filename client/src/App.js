import './App.css';
import Server from './pages/Server';
import Login from './pages/Login';
import Home from './pages/Home'
import Accessibility from './pages/Accessibility';
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Customer1 from './pages/Customer1';
import Customer2 from './pages/Customer2';
import Maps from './pages/Maps';
import Manager from './pages/Manager';
import ExcessReport from './pages/ExcessReport';
import RestockReport from './pages/RestockReport';
import ComboReport from './pages/ComboReport';
import SalesReport from './pages/SalesReport';

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
            <Route path ="/maps" element = {<Maps/>}/>
            <Route path ="/manager" element = {<Manager/>}/>
            <Route path ="/excessReport" element = {<ExcessReport/>}/>
            <Route path ="/restockReport" element = {<RestockReport/>}/>
            <Route path ="/comboReport" element = {<ComboReport/>}/>
            <Route path ="/salesReport" element = {<SalesReport/>}/>
          </Routes>
        </BrowserRouter>
  );
}

export default App;
