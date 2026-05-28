import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cadastro from "./pages/Cadastro";
import ItemDetalhe from "./pages/ItemDetalhe";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/item/:id" element={<ItemDetalhe />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;