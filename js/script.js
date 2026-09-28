import { renderizarCatalogo } from "./catalogo.js";
import { catalogoCompleto } from "./api.js";
import { recomendados } from "./catalogo.js";
import { naoExplorados } from "./catalogo.js";

const formulario = document.getElementById("formulario");
const generosContainer = document.querySelector(".generos-container");
const generosList = document.getElementsByName("generos");

let generosMarcados = [];

/*

MINHA LÓGICA INICIAL da mensagem de erro dos botões de gênero (parte1)

  generosList.forEach((gen) => gen.addEventListener("change", (event) =>{
      if (event.target.checked) {
          generosMarcados.push(event.target.value)
          console.log(generosMarcados)
      }
      else{
          const posicao = generosMarcados.indexOf(event.target.value);
          generosMarcados.splice(posicao, 1);
          console.log(generosMarcados)
      }
      

  })) 
*/

// Lógica dinâmica para verificação de quantos generos estão selecionados

formulario.addEventListener("change", (evento) => {
  if (evento.target.matches("input[name=generos]")) {
    const generosFavoritos = Array.from(
      formulario.querySelectorAll('input[name="generos"]:checked'),
    );

    if (generosFavoritos.length > 5) {
      evento.target.checked = false;
      const criaMsgErro = (() =>{
        const mensagemErro = document.createElement("p");
        mensagemErro.textContent = "Selecione apenas 5 gêneros";
        mensagemErro.classList.add("gen-erro-msg");
        generosContainer.appendChild(mensagemErro);
      });

      criaMsgErro();

      setTimeout(() => {
        const erroMsgElement = document.querySelector(".gen-erro-msg");
        erroMsgElement.remove();
      }, 5000);

    }
  }
});



formulario.addEventListener("submit", function (event) {
  event.preventDefault();

  /* 
    LÓGICA INICIAL da mensagem de erro dos botões de gênero (parte2)

    if (generosMarcados.length > 5) {
      const mensagemErro = document.createElement("p");
      mensagemErro.textContent = "Selecione apenas 5 gêneros";
      mensagemErro.classList.add("gen-erro-msg");
      generosContainer.appendChild(mensagemErro);
      return;
    }
  */

  const nome = document.getElementById("nome").value;
  const idade = document.getElementById("idade").value;
  const generosFav = generosMarcados;

  const usuario = {
    nome: nome,
    idade: idade,
    generos: generosFav,
  };

  console.log(usuario);
  localStorage.setItem("usuario", JSON.stringify(usuario));

  window.location.href = "../catalogo.html";

  renderizarCatalogo(catalogoCompleto);

  const filtro = document.getElementById("filter");
  const buscaBtn = document.getElementById("busca-btn");

  const handleBusca = (filter) => {};

  buscaBtn.addEventListener("submit", handleBusca(filtro));
});
