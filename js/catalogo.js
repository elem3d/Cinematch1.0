import { buscarCatalago } from "./api.js";
const msgCarregamento = document.querySelector(".loading-msg");
const perfil = JSON.parse(localStorage.getItem("usuario"));

const renderizarCatalogo = (catalogo) => {
  const container = document.querySelector(".cards-container");

  container.innerHTML = "";

  catalogo.forEach((serie) => {
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

async function carregarCatalogo(filtro) {
  try {
    const catalogoCompleto = await buscarCatalago();
    if (catalogoCompleto) {
      const catalogoCompatibilidade = catalogoCompleto.map((serie) => {
        const generosFav = perfil.generos;
        serie.compatibilidade = serie.calcularAfinidade(generosFav);
        console.log(serie.compatibilidade)
        return serie;
      });

      const catalogoRecomendado = catalogoCompatibilidade
        .filter((s) => s.compatibilidade >= 50)
        .sort((a, b) => b.compatibilidade - a.compatibilidade);

        console.log(catalogoRecomendado)

      const catalogoNaoExplorado = catalogoCompatibilidade
        .filter((s) => s.compatibilidade < 50)
        .sort((a, b) => b.compatibilidade - a.compatibilidade);

      if (filtro == "todos") {
        msgCarregamento.remove();
        renderizarCatalogo(catalogoCompleto);
      } else if (filtro == "recomendados") {
        msgCarregamento.remove();
        renderizarCatalogo(catalogoRecomendado);
      } else if (filtro == "nao-explorados") {
        msgCarregamento.remove();
        renderizarCatalogo(catalogoNaoExplorado);
      } else {
        msgCarregamento.textContent = "Série não encontrada";
      }
    } else {
      throw new Error();
    }
  } catch (erro) {
    console.error("Erro ao carregar catálogo:", erro);
  }
}

let filterValue = "todos";

carregarCatalogo(filterValue);

const filtro = document.getElementById("filter");
const buscaInput = document.getElementById("busca");
const busca = document.getElementById("busca-form");

const handleBusca = (filter, input) => {
  const sérieProcurada = input.value;
  console.log(filter);
  return filter;
};

busca.addEventListener("submit", (event) => {
  event.preventDefault();

  console.log(filtro.value);

  carregarCatalogo(handleBusca(filtro.value, buscaInput));
});
