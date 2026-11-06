
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API_URL from "../api";

function Cadastro() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    local: "",
    nomeUsuario: "",
    contato: "",
    tipo: "PERDIDO",
    categoria: "DIVERSOS",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function salvar(e) {
    e.preventDefault();

    if (!token) {
      alert("Você precisa estar logado para cadastrar um item.");
      navigate("/login");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (res.status === 401) {
        alert("Sua sessão expirou. Faça login novamente.");
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      if (!res.ok) {
        alert("Erro ao cadastrar item.");
        return;
      }

      alert("Item cadastrado com sucesso!");
      navigate("/");
    } catch (error) {
      console.error("Erro ao cadastrar item:", error);
      alert("Não foi possível conectar ao servidor.");
    }
  }

  // Impede o acesso ao formulário sem login
  if (!token) {
    return (
      <div className="container">
        <section className="form-card">
          <h2>Login necessário</h2>
          <p>Você precisa estar logado para cadastrar um item.</p>

          <Link to="/login" className="button button-primary">
            Fazer login
          </Link>

          <Link to="/" className="button button-secondary">
            Voltar
          </Link>
        </section>
      </div>
    );
  }

  return (
    <div className="container">
      <header className="topbar">
        <div className="brand">
          <strong>Cadastrar item</strong>
          <span>Adicione ao catálogo um objeto perdido ou encontrado</span>
        </div>

        <Link to="/" className="button button-secondary">
          Voltar
        </Link>
      </header>

      <section className="form-card">
        <form onSubmit={salvar}>
          <div className="form-grid">
            <input
              className="input"
              type="text"
              name="nome"
              placeholder="Nome do objeto"
              value={form.nome}
              onChange={handleChange}
              required
            />

            <input
              className="input"
              type="text"
              name="local"
              placeholder="Local"
              value={form.local}
              onChange={handleChange}
            />

            <input
              className="input"
              type="text"
              name="nomeUsuario"
              placeholder="Seu nome"
              value={form.nomeUsuario}
              onChange={handleChange}
            />

            <input
              className="input"
              type="text"
              name="contato"
              placeholder="Contato"
              value={form.contato}
              onChange={handleChange}
              required
            />

            <textarea
              className="textarea full"
              name="descricao"
              placeholder="Descrição do objeto"
              value={form.descricao}
              onChange={handleChange}
            />

            <select
              className="select"
              name="tipo"
              value={form.tipo}
              onChange={handleChange}
            >
              <option value="PERDIDO">PERDIDO</option>
              <option value="ENCONTRADO">ENCONTRADO</option>
            </select>

            <select
              className="select"
              name="categoria"
              value={form.categoria}
              onChange={handleChange}
            >
              <option value="DOCUMENTOS">DOCUMENTOS</option>
              <option value="ELETRONICOS">ELETRONICOS</option>
              <option value="OBJETOS_PESSOAIS">OBJETOS_PESSOAIS</option>
              <option value="ROUPAS_ACESSORIOS">ROUPAS_ACESSORIOS</option>
              <option value="CARTOES">CARTOES</option>
              <option value="DIVERSOS">DIVERSOS</option>
            </select>
          </div>

          <div className="form-actions">
            <button className="button button-primary" type="submit">
              Salvar item
            </button>

            <Link to="/" className="button button-secondary">
              Cancelar
            </Link>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Cadastro;
