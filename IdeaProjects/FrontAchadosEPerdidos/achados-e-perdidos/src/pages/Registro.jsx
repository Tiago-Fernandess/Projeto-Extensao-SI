import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API_URL from "../api";

function Registro() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nome: "", email: "", senha: "" });
  const [erro, setErro] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function cadastrar(e) {
    e.preventDefault();
    setErro("");

    try {
      const res = await fetch(`${API_URL}/auth/cadastro`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Erro ao cadastrar");
      }

      alert("Cadastro realizado com sucesso! Faça login.");
      navigate("/login");
    } catch (error) {
      setErro(error.message);
    }
  }

  return (
    <div className="container">
      <header className="topbar">
        <div className="brand">
          <strong>Criar Conta</strong>
          <span>Cadastre-se para registrar itens no seu nome</span>
        </div>
        <Link to="/login" className="button button-secondary">
          Voltar
        </Link>
      </header>

      <section
        className="form-card"
        style={{ maxWidth: "400px", margin: "40px auto" }}
      >
        <form
          onSubmit={cadastrar}
          style={{ display: "flex", flexDirection: "column", gap: "14px" }}
        >
          {erro && (
            <div style={{ color: "#b91c1c", fontWeight: "bold" }}>{erro}</div>
          )}

          <input
            className="input"
            type="text"
            name="nome"
            placeholder="Seu nome"
            value={form.nome}
            onChange={handleChange}
            required
          />
          <input
            className="input"
            type="email"
            name="email"
            placeholder="Seu e-mail"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            className="input"
            type="password"
            name="senha"
            placeholder="Crie uma senha"
            value={form.senha}
            onChange={handleChange}
            required
          />

          <button className="button button-primary" type="submit">
            Cadastrar
          </button>
        </form>
      </section>
    </div>
  );
}

export default Registro;
