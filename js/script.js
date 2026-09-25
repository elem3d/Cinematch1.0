const formulario = document.getElementById("formulario");


formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const idade = document.getElementById("idade").value;
    //const generos = document.getElementById("genero").value;

    const usuario = {
        nome: nome,
        idade: idade,
        genero: genero
    };

    localStorage.setItem("usuario", JSON.stringify(usuario));

    alert("Dados salvos com sucesso!");

});