import './App.css';
import Server from './pages/Server';
import Login from './pages/Login';
import Home from './pages/Home'
import Accessibility from './pages/Accessibility';
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Customer1 from './pages/Customer1';
import Customer2 from './pages/Customer2';
import Manager from './pages/Manager';
import BestSellersReportPage from './pages/bestSellerReport';
import RegisterEmployeePage from './pages/registerEmployee';
import ExcessReportPage from './pages/excessReport';
import RestockReportPage from './pages/restockReport';
import SalesReportPage from './pages/salesReport';
import RecordRestockPage from './pages/recordRestock';

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
            <Route path="/Manager" element={<Manager/>}/>
            <Route path="/BestSellersReport" element={<BestSellersReportPage/>}/>
            <Route path="/excessReport" element={<ExcessReportPage/>}/>
            <Route path="/RestockReport" element={<RestockReportPage/>}/>
            <Route path="/SalesReport" element={<SalesReportPage/>}/>
            <Route path="/registerEmployee" element={<RegisterEmployeePage/>}/>
            <Route path="/recordRestock" element={<RecordRestockPage/>}/>
          </Routes>
        </BrowserRouter>
  );
}

export default App;
