const listaTarefas = document.getElementById("lista-tarefas");
const novaLista = document.getElementById("nova-lista");
const addButton = document.getElementById("add-button");

addButton.addEventListener("click", () => {
  const textoTarefa = novaLista.value.trim();
  if (textoTarefa !== "") {
    const itemTarefa = document.createElement("li");
    itemTarefa.innerHTML = `
      <input type="checkbox">
      <span>${textoTarefa}</span>
      <button class="botao-excluir">Excluir</button>
    `;
    listaTarefas.appendChild(itemTarefa);
    novaLista.value = "";
  }
});

listaTarefas.addEventListener("click", (event) => {
  if (event.target.classList.contains("botao-excluir")) {
    event.target.parentNode.remove();
  }
});