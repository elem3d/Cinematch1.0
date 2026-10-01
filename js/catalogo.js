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

const buscarNoCatalogo = (catalogo, busca) => {
  //Primeiro if verifica se o valor da busca existe
  if (busca) {
    //Se existe vai buscar no catálogo e retornar um novo array de catálogo filtrado
    const buscaFormatada = busca.toLowerCase();
    return catalogo.filter((serie) => {
      return serie.titulo.toLowerCase().includes(buscaFormatada);
    });
  } else {
    //Se não houve busca, retorna o próprio catálogo da entrada
    return catalogo;
  }
};

async function carregarCatalogo(filtro, busca) {
  try {
    const catalogoCompleto = await buscarCatalago();
    if (catalogoCompleto) {
      const catalogoCompatibilidade = catalogoCompleto.map((serie) => {
        const generosFav = perfil.generos;
        serie.compatibilidade = serie.calcularAfinidade(generosFav);
        return serie;
      });

      const catalogoRecomendado = catalogoCompatibilidade
        .filter((s) => s.compatibilidade >= 50)
        .toSorted((a, b) => b.compatibilidade - a.compatibilidade);

      const catalogoNaoExplorado = catalogoCompatibilidade
        .filter((s) => s.compatibilidade < 50)
        .toSorted((a, b) => b.compatibilidade - a.compatibilidade);

      let paraImprimir = [];

      if (filtro == "todos") {
        paraImprimir = buscarNoCatalogo(catalogoCompleto, busca);

        if (paraImprimir.length > 0) {
          msgCarregamento.remove();
          renderizarCatalogo(
            paraImprimir.toSorted((a, b) => a.titulo.localeCompare(b.titulo)),
          );
        } else {
          msgCarregamento.textContent = "Série não encontrada";
        }
      } else if (filtro == "recomendados") {
        paraImprimir = buscarNoCatalogo(catalogoRecomendado, busca);

        if (paraImprimir.length > 0) {
          msgCarregamento.remove();
          renderizarCatalogo(paraImprimir);
        } else {
          msgCarregamento.textContent = "Série não encontrada";
        }
      } else if (filtro == "nao-explorados") {
        paraImprimir = buscarNoCatalogo(catalogoNaoExplorado, busca);

        if (paraImprimir.length > 0) {
          msgCarregamento.remove();
          renderizarCatalogo(paraImprimir);
        } else {
          msgCarregamento.textContent = "Série não encontrada";
        }
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

busca.addEventListener("submit", (event) => {
  event.preventDefault();

  carregarCatalogo(filtro.value, buscaInput.value);
});
