import { useState, useEffect } from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'

import Modal from './components/Modal'
import './App.css'

function App() {

  const BASE_URL = "https://www.omdbapi.com/?apikey=<sua_api_key>"
  let searchTimeout = setTimeout(() => { }, 0);

  const [filmes, setFilmes] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [valorInput, setValorInput] = useState("");
  const [numeroDePaginas, setNumeroDePaginas] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [filmeSelecionado, setFilmeSelecionado] = useState({});

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

  function openModal(id) {
    fetch(`${BASE_URL}&i=${id}`)
      .then(response => response.json())
      .then(response => {
        setFilmeSelecionado(response);
        setIsOpen(true);
      });
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Modal titulo={filmeSelecionado.Title} isOpen={isOpen} closeModal={closeModal}>
        <div className="filme-info">
          <img src={filmeSelecionado.Poster} alt="Poster do filme" />
          <div>
            <div className="info-block">
              <h3>Trama</h3>
              <p>{filmeSelecionado.Plot}</p>
            </div>
            <div className="info-block">
              <h3>Nota</h3>
              {
                Array(10).fill(0).map((valor, indice) => (
                  (indice + 1) <= Math.ceil(filmeSelecionado.imdbRating)
                    ? <AiFillStar key={indice} color='#FFD700' />
                    : <AiOutlineStar key={indice} />
                ))
              }
            </div>
            <div className="info-block">
              <h3>Data de lançamento</h3>
              <p>{filmeSelecionado.Released}</p>
            </div>
            <div className="info-block">
              <h3>Gênero</h3>
              <p>{filmeSelecionado.Genre}</p>
            </div>
            <div className="info-block">
              <h3>Atores</h3>
              <ul>
                {
                  filmeSelecionado.Actors?.split(', ').map(nome => (
                    <li key={nome}>{nome}</li>
                  ))
                }
              </ul>
            </div>
          </div>
        </div>
      </Modal>
      <div>
        <header>
          <input
            type="text"
            onChange={pesquisar}
            value={valorInput}
          />
        </header>
        <main>
          <ul className='listaDeFilmes'>
            {
              filmes.map(filme => (
                <li key={filme.imdbID} onClick={() => openModal(filme.imdbID)}>
                  <p>{filme.Title}</p>
                  <img src={filme.Poster} alt="Poster do filme" />
                </li>
              ))
            }
          </ul>
          <div className="paginas">
            <button onClick={paginaAnterior}>{"<"}</button>
            <span>{pagina}</span>
            <button onClick={proximaPagina}>{">"}</button>
          </div>
        </main>
      </div>
    </>
  )
}

export default App


