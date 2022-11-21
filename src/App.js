import './App.css';
import Server from './pages/Server';
import Login from './pages/Login';
import Home from './pages/Home'
import Accessibility from './pages/Accessibility';
import { BrowserRouter,Routes,Route } from 'react-router-dom'

function App() {
  return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/server" element={<Server/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/acc" element={<Accessibility/>}/>
          </Routes>
        </BrowserRouter>
  );
}

export default App;
