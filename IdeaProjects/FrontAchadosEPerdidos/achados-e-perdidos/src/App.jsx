import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import Home from "./pages/Home"; 
import Cadastro from "./pages/Cadastro"; 
import ItemDetalhe from "./pages/ItemDetalhe"; 
import Login from "./pages/Login"; 
import Registro from "./pages/Registro"; 

function App() { 
  return ( 
    <BrowserRouter> 
      <Routes> 
        <Route path="/" element={<Home />} /> 
        <Route path="/cadastro" element={<Cadastro />} /> 
        <Route path="/item/:id" element={<ItemDetalhe />} /> 
        <Route path="/login" element={<Login />} /> 
        <Route path="/registro" element={<Registro />} /> 
      </Routes> 
    </BrowserRouter> 
  ); 
}
export default App;