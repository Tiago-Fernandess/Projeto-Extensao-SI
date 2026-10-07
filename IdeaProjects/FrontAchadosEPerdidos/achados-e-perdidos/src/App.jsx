import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cadastro from "./pages/Cadastro";
import ItemDetalhe from "./pages/ItemDetalhe";
import Login from "./pages/Login"; // Novo
import Registro from "./pages/Registro"; // Novo

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/item/:id" element={<ItemDetalhe />} />
        <Route path="/login" element={<Login />} /> {/* Novo */}
        <Route path="/registro" element={<Registro />} /> {/* Novo */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
