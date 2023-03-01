// Armazena a lista de itens
const lista = document.querySelector(".lista");

// Armazena o formulário de adição de novos itens
const form = document.querySelector("#novoItem");

// Armazena o input de quantidade
const quantidadeInput = document.querySelector("#quantidade");

// Define o valor mínimo do input de quantidade como zero
quantidadeInput.setAttribute("min", "0");

// Função para salvar a lista de itens no localStorage
function salvarLista() {
  const itens = [];
  lista.querySelectorAll(".item").forEach((item) => {
    const nome = item.querySelector("span").innerText;
    const quantidade = item.querySelector("strong").innerText;
    itens.push({ nome, quantidade });
  });
  localStorage.setItem("listaItens", JSON.stringify(itens));
}

// Função para carregar a lista de itens do localStorage
function carregarLista() {
  const itens = JSON.parse(localStorage.getItem("listaItens")) || [];
  itens.forEach((item) => {
    const novoItem = document.createElement("li");
    novoItem.classList.add("item");
    novoItem.innerHTML = `<strong>${item.quantidade}</strong><span>${item.nome}</span>`;
    novoItem.addEventListener("dblclick", () => {
      novoItem.classList.add("fadeOut");
      setTimeout(() => {
        novoItem.remove();
        salvarLista();
      }, 400);
    });
    lista.appendChild(novoItem);
  });
}

// Carrega a lista de itens ao carregar a página
carregarLista();

// Adiciona um ouvinte de eventos ao formulário
form.addEventListener("submit", (event) => {
  // Impede o envio do formulário
  event.preventDefault();

  // Obtém os valores dos inputs
  const nome = document.querySelector("#nome").value;
  const quantidade = document.querySelector("#quantidade").value;

  // Cria um novo elemento li para o novo item
  const novoItem = document.createElement("li");
  novoItem.classList.add("item");

  // Adiciona a quantidade e o nome do item ao elemento li
  novoItem.innerHTML = `<strong>${quantidade}</strong><span>${nome}</span>`;

  // Adiciona um ouvinte de eventos de clique duplo e toque duplo ao novo item
  novoItem.addEventListener("dblclick", () => {
    novoItem.classList.add("fadeOut");
    setTimeout(() => {
      novoItem.remove();
      salvarLista();
    }, 400);
  });

  // Adiciona o novo item à lista
  lista.appendChild(novoItem);

  // Salva a lista de itens no localStorage
  salvarLista();

  // Limpa os valores dos inputs
  document.querySelector("#nome").value = "";
  document.querySelector("#quantidade").value = "";
});
try {
  localStorage.setItem("test", "test");
  localStorage.removeItem("test");
} catch (e) {
  localStorage.clear();
}
// Adiciona um ouvinte de eventos de clique duplo e toque duplo a cada item existente
lista.querySelectorAll(".item").forEach((item) => {
  item.addEventListener("dblclick", () => {
    item.classList.add("fadeOut");
    setTimeout(() => {
      item.remove();
      salvarLista();
    }, 400);
  });
});

lista.addEventListener("touchend", (event) => {
  const now = new Date().getTime();
  const doubleTapDelay = 300; // tempo em milissegundos entre dois toques
  let tappedTwice = false;
  let lastTapTime = 0;
  if (lastTapTime !== 0 && now - lastTapTime < doubleTapDelay) {
    // detectou um duplo toque
    tappedTwice = true;

    // verifique se o elemento tocado é uma linha da tabela
    const item = event.target.closest("li");
    if (item) {
      item.classList.add("fadeOut");
      setTimeout(() => {
        item.remove();
        salvarLista();
      }, 400);
    }
  }

  lastTapTime = now;

  setTimeout(() => {
    // se o usuário não tocou duas vezes, remove a classe de animação
    if (!tappedTwice) {
      const item = event.target.closest("tr");
      if (item) {
        item.remove.classList.remove("fadeOut");
      }
    }

    tappedTwice = false;
  }, doubleTapDelay);
});

lista.addEventListener("touchstart", (event) => {
  // não faça nada aqui, o toque duplo é detectado no touchend
});

const checkbox = document.querySelector('input[type="checkbox"]');
const html = document.querySelector("html");
const card = document.querySelector(".card");
const ul = document.querySelector("ul");

checkbox.addEventListener("change", function () {
  if (this.checked) {
    html.classList.add("dark-mode");
    card.style.backgroundColor = "#171717";
    ul.querySelectorAll("li").forEach((li) => {
      li.style.backgroundColor = "#DA0037";
      li.style.color = "white";
    });
  } else {
    html.classList.remove("dark-mode");
    card.style.backgroundColor = "";
    ul.querySelectorAll("li").forEach((li) => {
      li.style.backgroundColor = "";
      li.style.color = "";
    });
  }
});
