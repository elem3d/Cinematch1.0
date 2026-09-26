const formulario = document.getElementById("formulario");
const generosContainer = document.querySelector(".generos-container")
const generosList = document.getElementsByName("generos")

let generosMarcados = [];

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

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    if(generosMarcados.length > 5){
        const mensagemErro = document.createElement("p");
        mensagemErro.textContent = "Selecione apenas 5 gêneros"
        mensagemErro.classList.add("gen-erro-msg")
        generosContainer.appendChild(mensagemErro)
        return
    }

    const nome = document.getElementById("nome").value;
    const idade = document.getElementById("idade").value;
    const generosFav = generosMarcados;

    const usuario = {
        nome: nome,
        idade: idade,
        generos: generosFav
    };

    console.log(usuario)
    localStorage.setItem("usuario", JSON.stringify(usuario));

    window.location.href = "../catalogo.html";
    
    renderizarCatalogo();
});