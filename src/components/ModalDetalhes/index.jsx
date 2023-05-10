import { useContext } from "react"
import PropTypes from "prop-types";
import { Context } from "../../context"
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import Modal from "../Modal";
import Spinner from "../Spinner";

function ModalDetalhes({ isOpen, closeModal, carregandoModal }) {
  const { filmeSelecionado } = useContext(Context);

  return (
    <Modal titulo={carregandoModal ? 'Carregando...' : filmeSelecionado?.Title} isOpen={isOpen} closeModal={closeModal}>
      {carregandoModal
        ? <Spinner />
        : <div className="filme-info">
          <img src={filmeSelecionado?.Poster} alt="Poster do filme" />
          <div>
            <div className="info-block">
              <h3>Trama</h3>
              <p>{filmeSelecionado?.Plot}</p>
            </div>
            <div className="info-block">
              <h3>Nota</h3>
              {
                Array(10).fill(0).map((valor, indice) => (
                  (indice + 1) <= Math.ceil(filmeSelecionado?.imdbRating)
                    ? <AiFillStar key={indice} color='#FFD700' />
                    : <AiOutlineStar key={indice} />
                ))
              }
            </div>
            <div className="info-block">
              <h3>Data de lançamento</h3>
              <p>{filmeSelecionado?.Released}</p>
            </div>
            <div className="info-block">
              <h3>Gênero</h3>
              <p>{filmeSelecionado?.Genre}</p>
            </div>
            <div className="info-block">
              <h3>Atores</h3>
              <ul>
                {
                  filmeSelecionado?.Actors?.split(', ').map(nome => (
                    <li key={nome}>{nome}</li>
                  ))
                }
              </ul>
            </div>
            {/* <a href={`/detalhes/${filmeSelecionado.imdbID}`}>Mais detalhes</a> */}
            <Link to={`/detalhes/${filmeSelecionado?.imdbID}`}>Mais detalhes</Link>
          </div>
        </div>
      }
    </Modal>
  )
}

ModalDetalhes.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  carregandoModal: PropTypes.bool.isRequired,
}

export default ModalDetalhes
