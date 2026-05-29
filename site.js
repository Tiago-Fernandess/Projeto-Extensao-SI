const site = document.getElementById("site");

let itens = [];

// Criar estrutura principal
site.innerHTML = `
  <style>
    body { font-family: "Arial; margin: 0; background: #f4f8ff; }
    header { background: #0d47a1; color: white; padding: 15px; text-align: center; }
    nav { display: flex; justify-content: center; background: #1976d2; }
    nav button {
      background: none; border: none; color: white;
      padding: 15px; cursor: pointer;
    }
    nav button:hover { background: #1565c0; }
    .container { padding: 20px; }
    .tab { display: none; }
    .active { display: block; }
    .card {
      background: white;
      padding: 10px;
      margin: 10px 0;
      border-left: 5px solid #1976d2;
    }
    input, select, textarea {
      width: 100%;
      margin: 5px 0;
      padding: 10px;
    }
    .btn {
      background: #1976d2;
      color: white;
      border: none;
      padding: 10px;
      cursor: pointer;
    }
  </style>

  <header>
    <h1>Achados e Perdidos</h1>
  </header>

  <nav>
    <button onclick="openTab('perdidos')">Perdidos</button>
    <button onclick="openTab('achados')">Achados</button>
    <button onclick="openTab('incluir')">Incluir</button>
    <button onclick="openTab('todos')">Todos</button>
  </nav>

  <div class="container">
    <div id="perdidos" class="tab active">
      <h2>Itens Perdidos</h2>
      <div id="listaPerdidos"></div>
    </div>

    <div id="achados" class="tab">
      <h2>Itens Achados</h2>
      <div id="listaAchados"></div>
    </div>

    <div id="incluir" class="tab">
      <h2>Adicionar Item</h2>
      <input id="nome" placeholder="Nome do item">
      <select id="tipo">
        <option value="perdido">Perdido</option>
        <option value="achado">Achado</option>
      </select>
      <textarea id="descricao" placeholder="Descrição"></textarea>
      <button class="btn" onclick="adicionarItem()">Salvar</button>
    </div>

    <div id="todos" class="tab">
      <h2>Todos</h2>
      <div id="listaTodos"></div>
    </div>
  </div>
`;

// Funções
function openTab(id) {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    document.getElementById(id).classList.add("active");
    renderizar();
}

function adicionarItem() {
    const nome = document.getElementById("nome").value;
    const tipo = document.getElementById("tipo").value;
    const nomePessoa = document.getElementById("nome da pessoa").value;
    const descricao = document.getElementById("descricao").value;

    itens.push({ nome, tipo, descricao });

    alert("Item adicionado!");
    renderizar();
}

function renderizar() {
    const perdidos = document.getElementById("listaPerdidos");
    const achados = document.getElementById("listaAchados");
    const todos = document.getElementById("listaTodos");

    perdidos.innerHTML = "";
    achados.innerHTML = "";
    todos.innerHTML = "";

    itens.forEach(item => {
        const html = `
      <div class="card">
        <strong>${item.nome}</strong><br>
        ${item.descricao}<br>
        <em>${item.tipo}</em>
      </div>
    `;

        if (item.tipo === "perdido") {
            perdidos.innerHTML += html;
        } else {
            achados.innerHTML += html;
        }

        todos.innerHTML += html;
    });
}