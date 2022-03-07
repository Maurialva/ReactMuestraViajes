import './App.css';
import Nav from './components/Nav';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Inicio from './Inicio';
import Viajes from './Viajes';
import Choferes from './Choferes';
import Clientes from './Clientes';


function App() {
   
  return (
    <div className="App">
        <BrowserRouter>
            <Nav/>
                <main>
                    <Routes>
                        <Route path="/" element={<Inicio/>} />
                        <Route path="/Viajes" element={<Viajes/>} />
                        <Route path="/Choferes" element={<Choferes/>} />
                        <Route path="/Clientes" element={<Clientes/>} />
                    </Routes>
                </main>
        </BrowserRouter>
    </div>
  );
}

export default App;
