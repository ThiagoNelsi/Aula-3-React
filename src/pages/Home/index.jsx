import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { API_KEY, BASE_URL } from '../../config/api.json'
import Modal from '../../components/Modal'
import './Home.css'
import Header from '../../components/Header'
import buscarFilme from '../../services/buscarFilme'
import ListaDeFilmes from '../../components/ListaDeFilmes'

function Home() {
  const url = `${BASE_URL}/?apikey=${API_KEY}`;
  let searchTimeout = setTimeout(() => { }, 0);

  const inputRef = useRef(null);

  const [filmes, setFilmes] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [numeroDePaginas, setNumeroDePaginas] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [filmeSelecionado, setFilmeSelecionado] = useState({});
  const [listaDeFavoritos, setListaDeFavoritos] = useState(JSON.parse(localStorage.getItem('listaDeFavoritos')) || []);

  useEffect(() => {
    fetch(`${url}&s=${inputRef.current.value}&page=${pagina}`)
      .then(resposta => resposta.json())
      .then(resposta => setFilmes(resposta.Search || []));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagina]);

  useEffect(() => {
    console.log('A página renderizou');
  })

  function pesquisar(evento) {
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
    buscarFilme(id)
      .then(resposta => {
        setFilmeSelecionado(resposta);
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

  function trocarCorDoInput() {
    inputRef.current.style.background = 'red';
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
        <Header>
          <input
            ref={inputRef}
            type="text"
            onChange={pesquisar}
          />
        </Header>
        <button onClick={trocarCorDoInput}>Trocar cor do header</button>
        <main>
          <ListaDeFilmes
            filmes={filmes}
            openModal={openModal}
            removerFavorito={removerFavorito}
            adicionarFavorito={adicionarFavorito}
            listaDeFavoritos={listaDeFavoritos}
          />
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


