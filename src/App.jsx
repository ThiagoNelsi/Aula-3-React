import { useState, useEffect } from 'react'
import './App.css'

function App() {

  const BASE_URL = "https://www.omdbapi.com/?apikey=2304a2e0"
  let searchTimeout = setTimeout(() => { }, 0);

  const [filmes, setFilmes] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [valorInput, setValorInput] = useState("");
  const [numeroDePaginas, setNumeroDePaginas] = useState(0);

  useEffect(() => {
    fetch(`${BASE_URL}&s=${valorInput}&page=${pagina}`)
      .then(resposta => resposta.json())
      .then(resposta => setFilmes(resposta.Search || []));
  }, [pagina]);

  function pesquisar(evento) {
    setValorInput(evento.target.value);

    clearTimeout(searchTimeout);

    searchTimeout = setTimeout(() => {
      fetch(`${BASE_URL}&s=${evento.target.value}`)
        .then(resposta => resposta.json())
        .then(resposta => {
          setFilmes(resposta.Search || []);
          setPagina(1);
          setNumeroDePaginas(Math.ceil(resposta.totalResults / 10));
        });
    }, 500);
  }

  function paginaAnterior() {
    if (pagina === 1) return;

    setPagina(pagina - 1);
  }

  function proximaPagina() {
    if (pagina === numeroDePaginas) return;

    setPagina(pagina + 1);
  }

  return (
    <div>
      <header>
        <input
          type="text"
          onChange={pesquisar}
          value={valorInput}
        />
      </header>
      <main>
        <ul>
          {
            filmes.map(filme => (
              <li key={filme.imdbID}>
                <p>{filme.Title}</p>
                <img src={filme.Poster} alt="Poster do filme" />
              </li>
            ))
          }
        </ul>
        <div className="paginas">
          <button onClick={paginaAnterior}>Pagina anterior</button>
          <span>{pagina}</span>
          <button onClick={proximaPagina}>Próxima página</button>
        </div>
      </main>
    </div>
  )
}

export default App


