# 🎬 CineMatch 1.0

Projeto Final do Módulo 1 do curso Mobile-ReactNative da SCTEC.

O CineMatch é uma aplicação desenvolvida com HTML, CSS e JavaScript,
com o objetivo de criar uma experiência de descoberta e recomendação
de séries baseada nas preferências do usuário.

O projeto foi desenvolvido de forma colaborativa com um colega de classe,
colocando em prática conceitos estudados durante o módulo, como
estruturação de páginas, estilização, JavaScript, manipulação de arrays,
classes, objetos, consumo de API e lógica de recomendação.

---

## 🎯 Objetivo

O objetivo do CineMatch é ajudar o usuário a encontrar séries de acordo
com seus interesses e gêneros favoritos.

Na primeira etapa, o usuário informa:

- Nome;
- Idade;
- Gêneros favoritos.

O sistema permite selecionar até 5 gêneros favoritos.

Depois dessas informações, o usuário é direcionado para o catálogo,
onde pode pesquisar e filtrar as séries disponíveis.

---

## 🚀 Funcionalidades

### 👤 Cadastro inicial

O usuário informa seu nome e sua idade.

O formulário possui validações básicas utilizando os recursos do HTML,
como campos obrigatórios e quantidade mínima de caracteres.

### 🎭 Seleção de gêneros

O usuário pode escolher até 5 gêneros favoritos.

Entre as opções disponíveis estão:

- Ação
- Aventura
- Anime
- Comédia
- Crime
- Drama
- Espionagem
- Família
- Fantasia
- História
- Terror
- Jurídico
- Médico
- Música
- Mistério
- Romance
- Ficção Científica
- Esportes
- Sobrenatural
- Suspense
- Guerra
- Faroeste

### 🔎 Busca de séries

Na página de catálogo existe uma barra de pesquisa que permite
procurar por uma série específica.

### 🔽 Filtros

O catálogo possui opções de filtro:

- Recomendados
- Não Explorados
- Todos

### ⭐ Sistema de afinidade

O projeto possui uma lógica para verificar a compatibilidade entre
os gêneros favoritos do usuário e os gêneros de cada série.

Para isso, são utilizados métodos de array do JavaScript, como:

- reduce()
- some()

Esses métodos permitem comparar os gêneros e contabilizar
as correspondências encontradas.

---

## 🛠️ Tecnologias utilizadas

### HTML5

Utilizado para criar a estrutura das páginas e os elementos
de interação com o usuário.

### CSS3

Utilizado para estilizar a interface, organizar os componentes
e definir a apresentação visual da aplicação.

### JavaScript

Utilizado para implementar a lógica da aplicação, manipular os dados,
interagir com a interface e realizar as funcionalidades do catálogo.

### API

Utilizada para obter informações externas sobre as séries e
alimentar o catálogo da aplicação.

### Git e GitHub

Utilizados para versionamento, organização e compartilhamento
do projeto.

### Visual Studio Code

Editor utilizado durante o desenvolvimento.

---

## 🧠 Conceitos de JavaScript utilizados

Durante o desenvolvimento foram aplicados diversos conceitos
de JavaScript.

### Classes

Foi criada uma classe Serie para representar uma série dentro
da aplicação.

Exemplo:

```javascript
class Serie {
    id = "";
    titulo = "";
    generos = "";
    duracaoEp = "";
    status = "";
    sinopse = "";
    img = "";
    compatibilidade = "";
}