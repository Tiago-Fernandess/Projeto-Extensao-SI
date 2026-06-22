import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import API_URL from "../api";

function Home() {
  const [itens, setItens] = useState([]);
  const [busca, setBusca] = useState("");
  const [tipo, setTipo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [loading, setLoading] = useState(true);
  const categoriaLabel = {
  DOCUMENTOS: "Documentos",
  ELETRONICOS: "Eletrônicos",
  OBJETOS_PESSOAIS: "Objetos Pessoais",
  ROUPAS_ACESSORIOS: "Roupas/Acessórios",
  CARTOES: "Cartões",
  DIVERSOS: "Diversos",
};
  useEffect(() => {
    buscarItens();
  }, []);

  async function buscarItens() {
    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/items`);
      const data = await res.json();

      setItens(data);
    } catch (error) {
      console.error("Erro ao buscar itens:", error);
    } finally {
      setLoading(false);
    }
  }

  async function deletarItem(id) {
    const confirm = window.confirm("Tem certeza que quer deletar?");
    if (!confirm) return;

    try {
      await fetch(`${API_URL}/items/${id}`, {
        method: "DELETE",
      });

      setItens((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Erro ao deletar item:", error);
    }
  }

  const filtrados = useMemo(() => {
    return itens.filter((item) => {
      const texto =
        `${item.nome} ${item.descricao ?? ""} ${item.local ?? ""}`.toLowerCase();

      const matchBusca = texto.includes(busca.toLowerCase());
      const matchTipo = tipo ? item.tipo === tipo : true;
      const matchCategoria = categoria ? item.categoria === categoria : true;

      return matchBusca && matchTipo && matchCategoria;
    });
  }, [itens, busca, tipo, categoria]);

  return (
    <div className="container">
      <header className="topbar">
        <div className="brand">
          <strong>Achados e Perdidos</strong>
          <span>Encontre o que sumiu ou cadastre o que achou</span>
        </div>

        <div className="nav-actions">
          <Link to="/cadastro" className="button button-primary">
            + Cadastrar item
          </Link>
        </div>
      </header>

      <section className="hero">
        <h1>Procure, filtre e encontre rápido</h1>
        <p>
          Consulte os itens catalogados, filtre por tipo ou categoria e veja os detalhes
          de cada objeto. Se encontrou algo, cadastre no sistema em poucos segundos.
        </p>

        <div className="hero-row">
          <span className="pill">Busca inteligente</span>
          <span className="pill">Filtro por tipo</span>
          <span className="pill">Filtro por categoria</span>
          <span className="pill">Cadastro rápido</span>
        </div>
      </section>

      <section className="toolbar">
        <div className="search-row">
          <input
            className="input"
            placeholder="Pesquisar por nome, descrição ou local..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />

          <select
            className="select"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          >
            <option value="">Todos os tipos</option>
            <option value="PERDIDO">PERDIDO</option>
            <option value="ENCONTRADO">ENCONTRADO</option>
          </select>

          <select
            className="select"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="">Todas as categorias</option>
            <option value="DOCUMENTOS">DOCUMENTOS</option>
            <option value="ELETRONICOS">ELETRONICOS</option>
            <option value="OBJETOS_PESSOAIS">OBJETOS PESSOAIS</option>
            <option value="ROUPAS_ACESSORIOS">ROUPAS/ACESSORIOS</option>
            <option value="CARTOES">CARTOES</option>
            <option value="DIVERSOS">DIVERSOS</option>
          </select>

          <button
            className="button button-secondary"
            onClick={() => {
              setBusca("");
              setTipo("");
              setCategoria("");
            }}
          >
            Limpar
          </button>
        </div>

        <div className="meta-row">
          <span className="badge primary">
            {filtrados.length} item(ns) visível(is)
          </span>
          <span className="badge">
            Total no sistema: {itens.length}
          </span>
        </div>
      </section>

      <h2 className="section-title">Itens catalogados</h2>

      {loading ? (
        <div className="empty">Carregando itens...</div>
      ) : filtrados.length === 0 ? (
        <div className="empty">Nenhum item encontrado com esses filtros.</div>
      ) : (
        <div className="grid">
          {filtrados.map((item) => (
            <div className="card" key={item.id}>
              
              <div className="card-header">
                <span
                  className={`badge ${
                    item.tipo === "ENCONTRADO" ? "green" : "primary"
                  }`}
                >
                  {item.tipo}
                </span>

                <Link to={`/item/${item.id}`}>
                  <h3 className="card-title">{item.nome}</h3>
                </Link>
              </div>

              <div className="card-body">
                <p>{item.descricao || "Sem descrição informada."}</p>
                <p>
                  <strong>Local:</strong> {item.local || "Não informado"}
                </p>
                <p>
                  <strong>Categoria:</strong> {categoriaLabel[item.categoria] || item.categoria}
                </p>
              </div>

              <div className="card-actions">
                <button
                  className="button button-danger"
                  onClick={() => deletarItem(item.id)}
                >
                  Deletar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;