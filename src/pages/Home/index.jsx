import { useState, useEffect, useRef, useContext } from 'react'

import { API_KEY, BASE_URL } from '../../config/api.json'
import Header from '../../components/Header'
import ListaDeFilmes from '../../components/ListaDeFilmes'
import buscarFilme from '../../services/buscarFilme'

import { Context } from '../../context'

import './Home.css'
import Spinner from '../../components/Spinner'
import ModalDetalhes from '../../components/ModalDetalhes'

function Home() {
  const url = `${BASE_URL}/?apikey=${API_KEY}`;
  let searchTimeout = setTimeout(() => { }, 0);

  const inputRef = useRef(null);

  const { setFilmeSelecionado } = useContext(Context);

  const [filmes, setFilmes] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [numeroDePaginas, setNumeroDePaginas] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [listaDeFavoritos, setListaDeFavoritos] = useState(JSON.parse(localStorage.getItem('listaDeFavoritos')) || []);
  const [carregandoModal, setCarregandoModal] = useState(false);
  const [carregandoFilmes, setCarregandoFilmes] = useState(false);

  useEffect(() => {
    fetch(`${url}&s=${inputRef.current.value}&page=${pagina}`)
      .then(resposta => resposta.json())
      .then(resposta => setFilmes(resposta.Search || []));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagina]);

  function pesquisar(evento) {
    setCarregandoFilmes(false);
    clearTimeout(searchTimeout);

    searchTimeout = setTimeout(() => {
      setCarregandoFilmes(true);
      fetch(`${url}&s=${evento.target.value}`)
        .then(resposta => resposta.json())
        .then(resposta => {
          setFilmes(resposta.Search || []);
          setPagina(1);
          setNumeroDePaginas(Math.ceil(resposta.totalResults / 10));
          setCarregandoFilmes(false);
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
    setIsOpen(true);
    setCarregandoModal(true);
    buscarFilme(id)
      .then(resposta => {
        setFilmeSelecionado(resposta);
        setCarregandoModal(false);
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
      <ModalDetalhes
        isOpen={isOpen}
        closeModal={closeModal}
        carregandoModal={carregandoModal}
      />
      <div>
        <Header>
          <input
            ref={inputRef}
            type="text"
            onChange={pesquisar}
          />
        </Header>
        <main>
          {carregandoFilmes
            ? <Spinner />
            : <ListaDeFilmes
              filmes={filmes}
              openModal={openModal}
              removerFavorito={removerFavorito}
              adicionarFavorito={adicionarFavorito}
              listaDeFavoritos={listaDeFavoritos}
            />
          }
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


