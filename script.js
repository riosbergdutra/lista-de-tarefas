const URL_BASE = "https://jsonplaceholder.typicode.com/todos";

function buscarTarefas() {
  return fetch(URL_BASE)
    .then(function (response) {
      return response.json();
    })
    .catch(function (erro) {
      console.error("Erro ao buscar tarefas:", erro);
      return [];
    });
}

function adicionarTarefa(textoTarefa) {
  const data = JSON.stringify({ title: textoTarefa, completed: false });

  return fetch(URL_BASE, {
    method: "POST",
    body: data,
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
    .then(function (response) {
      return response.json();
    })
    .catch(function (erro) {
      console.error("Erro ao adicionar tarefa:", erro);
      return null;
    });
}

function carregarTarefas() {
  buscarTarefas().then(function (tarefas) {
    const listaTarefas = document.getElementById("lista-tarefas");

    tarefas.forEach(function (tarefa) {
      const itemTarefa = document.createElement("li");
      itemTarefa.innerHTML = `
        <input type="checkbox" ${tarefa.completed ? "checked" : ""}>
        <span>${tarefa.title}</span>
        <button class="botao-excluir">Excluir</button>
      `;
      listaTarefas.appendChild(itemTarefa);
    });
  });
}

document.getElementById("add-button").addEventListener("click", function () {
  const novaTarefaInput = document.getElementById("nova-tarefa");
  const textoTarefa = novaTarefaInput.value.trim();
  if (textoTarefa !== "") {
    adicionarTarefa(textoTarefa).then(function (novaTarefa) {
      if (novaTarefa) {
        const itemTarefa = document.createElement("li");
        itemTarefa.innerHTML = `
          <input type="checkbox">
          <span>${novaTarefa.title}</span>
          <button class="botao-excluir">Excluir</button>
        `;
        document.getElementById("lista-tarefas").appendChild(itemTarefa);
        novaTarefaInput.value = "";
      }
    });
  }
});

document.getElementById("lista-tarefas").addEventListener("click", function (evento) {
  if (evento.target.classList.contains("botao-excluir")) {
    evento.target.parentNode.remove();
  }
});

carregarTarefas();