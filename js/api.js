export class Serie {
  id = "";
  titulo = "";
  generos = "";
  duracaoEp = "";
  status = "";
  sinopse = "";
  img = "";
  compatibilidade = "";

  constructor(id, titulo, generos, duracaoEp, status, img, sinopse) {
    ((this.id = id),
      (this.titulo = titulo),
      (this.generos = generos),
      (this.duracaoEp = duracaoEp),
      (this.status = status),
      (this.img = img),
      (this.sinopse = sinopse));
  }

  calcularAfinidade(genFav) {
    const genComum = genFav.reduce((acc, gen) => {
      if (
        this.generos.some((g) => {
          return g === gen;
        })
      ) {
        return acc + 1;
      } else {
        return acc;
      }
    }, 0);

    const compat = (genComum / this.generos.length) * 100;

    /* if(compat >= 80){
            return "Alta Afinidade"
        }else if(compat < 80 && compat >=50){
            return "Média Afinidade"
        }else{
            return "Baixa Afinidade"
        }; */
    return compat;
  }
}

export async function buscarCatalago() {
  const url = "https://api.tvmaze.com/shows";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Erro: ${response.status}");
    }

    const data = await response.json();

    const catalogoCompleto = data.map((serie) => {
      return new Serie(
        serie.id,
        serie.name,
        serie.genres,
        serie.runtime,
        serie.status,
        serie.image.medium,
        serie.summary,
      );
    });

    return catalogoCompleto;

  } catch (error) {
    console.error("Erro ao buscar dados:", error);
  }
}
