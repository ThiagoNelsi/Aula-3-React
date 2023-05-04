import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AiFillStar, AiOutlineStar, AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { API_KEY, BASE_URL } from '../../config/api.json'
import Modal from '../../components/Modal'
import './Home.css'

function Home() {
  const url = `${BASE_URL}/?apikey=${API_KEY}`;
  let searchTimeout = setTimeout(() => { }, 0);

  const [filmes, setFilmes] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [valorInput, setValorInput] = useState("");
  const [numeroDePaginas, setNumeroDePaginas] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [filmeSelecionado, setFilmeSelecionado] = useState({});
  const [listaDeFavoritos, setListaDeFavoritos] = useState(JSON.parse(localStorage.getItem('listaDeFavoritos')) || []);

  useEffect(() => {
    fetch(`${url}&s=${valorInput}&page=${pagina}`)
      .then(resposta => resposta.json())
      .then(resposta => setFilmes(resposta.Search || []));
  }, [pagina]);

  function pesquisar(evento) {
    setValorInput(evento.target.value);

    clearTimeout(searchTimeout);

    searchTimeout = setTimeout(() => {
      fetch(`${url}&s=${evento.target.value}`)
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
    fetch(`${url}&i=${id}`)
      .then(response => response.json())
      .then(response => {
        setFilmeSelecionado(response);
        setIsOpen(true);
      });
  }

  function closeModal() {
    setIsOpen(false);
  }

  function adicionarFavorito(evento, id) {
    evento.stopPropagation();

    const lista = [...listaDeFavoritos, id];
    const stringLista = JSON.stringify(lista);

    setListaDeFavoritos(lista);
    localStorage.setItem('listaDeFavoritos', stringLista);
  }

  function removerFavorito(evento, id) {
    evento.stopPropagation();

    const lista = listaDeFavoritos.filter(filme => filme !== id);
    const stringLista = JSON.stringify(lista);

    setListaDeFavoritos(lista);
    localStorage.setItem('listaDeFavoritos', stringLista);
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
            {/* <a href={`/detalhes/${filmeSelecionado.imdbID}`}>Mais detalhes</a> */}
            <Link to={`/detalhes/${filmeSelecionado.imdbID}`}>Mais detalhes</Link>
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
                  {
                    listaDeFavoritos.includes(filme.imdbID)
                      ? <AiFillHeart color="red" onClick={(evento) => removerFavorito(evento, filme.imdbID)} />
                      : <AiOutlineHeart color="red" onClick={(evento) => adicionarFavorito(evento, filme.imdbID)} />
                  }
                </li>
              ))
            }
          </ul>
          <div className="paginas">
            <button onClick={paginaAnterior}>{"<"}</button>
            <span>{pagina} / {numeroDePaginas} </span>
            <button onClick={proximaPagina}>{">"}</button>
          </div>
        </main>
      </div>
    </>
  )
}

export default Home


