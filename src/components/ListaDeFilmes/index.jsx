import PropTypes from 'prop-types'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

function ListaDeFilmes({ filmes, openModal, removerFavorito, adicionarFavorito, listaDeFavoritos }) {
  return (
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
  )
}

ListaDeFilmes.propTypes = {
  filmes: PropTypes.arrayOf(PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Poster: PropTypes.string.isRequired,
  })),
  openModal: PropTypes.func.isRequired,
  removerFavorito: PropTypes.func.isRequired,
  adicionarFavorito: PropTypes.func.isRequired,
  listaDeFavoritos: PropTypes.arrayOf(PropTypes.string).isRequired,
}

ListaDeFilmes.defaultProps = {
  filmes: [],
}

export default ListaDeFilmes
