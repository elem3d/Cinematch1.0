import { buscarCatalago, Serie } from "./api.js";
const msgCarregamento = document.querySelector(".loading-msg");

const renderizarCatalogo = (buscaAPI) => {
  buscaAPI.forEach((serie) => {
    const container = document.querySelector(".cards-container");
    const card = document.createElement("li");
    const img = document.createElement("img");
    const titulo = document.createElement("h3");
    const etiquetas = document.createElement("div");
    const tempo = document.createElement("span");
    const status = document.createElement("span");
    const sinopse = document.createElement("p");
    const generos = serie.generos;

    card.classList.add("card");
    titulo.classList.add("titulo");
    etiquetas.classList.add("etiquetas-container");
    tempo.classList.add("etiqueta");
    status.classList.add("etiqueta");
    sinopse.classList.add("sinopse");

    img.src = serie.img;
    img.alt = "cartaz de capa da série";
    titulo.textContent = serie.titulo;
    sinopse.innerHTML = serie.sinopse;
    tempo.textContent = `${serie.duracaoEp}min por Episódio`;

    switch (serie.status) {
      case "Ended":
        status.textContent = "Concluída";
        break;
      case "Running":
        status.textContent = "Em andamento";
        break;
      default:
        break;
    }

    etiquetas.appendChild(status);
    etiquetas.appendChild(tempo);
    generos.forEach((gen) => {
      const element = document.createElement("span");
      element.classList.add("etiqueta");
      element.textContent = gen;
      etiquetas.appendChild(element);
    });

    card.appendChild(img);
    card.appendChild(titulo);
    card.appendChild(etiquetas);
    card.appendChild(sinopse);

    container.appendChild(card);
  });
};

async function carregarCatalogo() {
  try {
    const catalogoCompleto = await buscarCatalago();
    if (catalogoCompleto) {
        msgCarregamento.remove();
      renderizarCatalogo(catalogoCompleto);
    }
  } catch (error) {
    console.error("Erro ao iniciar aplicação:", error);
  }
}

carregarCatalogo();

const filtro = document.getElementById("filter");
const buscaBtn = document.getElementById("busca-btn");

const handleBusca = (filter) => {};

buscaBtn.addEventListener("submit", handleBusca(filtro));
