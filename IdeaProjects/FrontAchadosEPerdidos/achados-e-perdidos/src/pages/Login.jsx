import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API_URL from "../api";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", senha: "" });
  const [erro, setErro] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function fazerLogin(e) {
    e.preventDefault();
    setErro("");

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("E-mail ou senha inválidos");
      }

      const data = await res.json();
      localStorage.setItem("token", data.token); // Salva o token JWT
      navigate("/"); // Redireciona para a Home
    } catch (error) {
      setErro(error.message);
    }
  }

  return (
    <div className="container">
      <header className="topbar">
        <div className="brand">
          <strong>Acesso ao Sistema</strong>
          <span>Faça login para gerenciar seus itens</span>
        </div>
        <Link to="/" className="button button-secondary">
          Voltar
        </Link>
      </header>

      <section
        className="form-card"
        style={{ maxWidth: "400px", margin: "40px auto" }}
      >
        <form
          onSubmit={fazerLogin}
          style={{ display: "flex", flexDirection: "column", gap: "14px" }}
        >
          {erro && (
            <div style={{ color: "#b91c1c", fontWeight: "bold" }}>{erro}</div>
          )}

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
            placeholder="Sua senha"
            value={form.senha}
            onChange={handleChange}
            required
          />

          <button className="button button-primary" type="submit">
            Entrar
          </button>

          <div style={{ textAlign: "center", marginTop: "10px" }}>
            <span style={{ color: "var(--muted)" }}>Não tem conta? </span>
            <Link
              to="/registro"
              style={{ color: "var(--primary)", fontWeight: "bold" }}
            >
              Cadastre-se
            </Link>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Login;
