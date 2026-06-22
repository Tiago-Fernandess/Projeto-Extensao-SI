import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import API_URL from "../api";

function ItemDetalhe() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);

  useEffect(() => {
    carregarItem();
  }, []);

  async function carregarItem() {
    try {
      const res = await fetch(`${API_URL}/items/${id}`);
      const data = await res.json();
      setForm(data);
    } catch (error) {
      console.error("Erro ao carregar item:", error);
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function atualizar(e) {
    e.preventDefault();

    try {
      await fetch(`${API_URL}/items/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      navigate("/");
    } catch (error) {
      console.error("Erro ao atualizar item:", error);
    }
  }

  if (!form) return <div className="empty">Carregando...</div>;

  return (
    <div className="container">

      <header className="topbar">
        <div className="brand">
          <strong>Editar Item</strong>
          <span>Atualize os dados do item</span>
        </div>

        <Link to="/" className="button button-secondary">
          Voltar
        </Link>
      </header>

      <section className="form-card">
        <form onSubmit={atualizar} className="form-grid">

          <input
            className="input"
            name="nome"
            value={form.nome || ""}
            onChange={handleChange}
            placeholder="Nome"
          />

          <input
            className="input"
            name="local"
            value={form.local || ""}
            onChange={handleChange}
            placeholder="Local"
          />

          <textarea
            className="textarea full"
            name="descricao"
            value={form.descricao || ""}
            onChange={handleChange}
            placeholder="Descrição"
          />

          <select
            className="select"
            name="tipo"
            value={form.tipo || ""}
            onChange={handleChange}
          >
            <option value="PERDIDO">PERDIDO</option>
            <option value="ENCONTRADO">ENCONTRADO</option>
          </select>

          <select
            className="select"
            name="categoria"
            value={form.categoria || ""}
            onChange={handleChange}
          >
            <option value="DOCUMENTOS">DOCUMENTOS</option>
            <option value="ELETRONICOS">ELETRONICOS</option>
            <option value="OBJETOS_PESSOAIS">OBJETOS PESSOAIS</option>
            <option value="ROUPAS_ACESSORIOS">ROUPAS/ACESSORIOS</option>
            <option value="CARTOES">CARTOES</option>
            <option value="DIVERSOS">DIVERSOS</option>
          </select>

          <div className="form-actions full">
            <button className="button button-primary" type="submit">
              Salvar alterações
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

export default ItemDetalhe;