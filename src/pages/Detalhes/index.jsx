import { useContext, useEffect } from 'react';
import Header from '../../components/Header';
import { Context } from '../../context';
import buscarFilme from '../../services/buscarFilme';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner';

function Detalhes() {
  const { id } = useParams()

  const { filmeSelecionado: filme, setFilmeSelecionado } = useContext(Context);

  useEffect(() => {
    if (!filme) {
      buscarFilme(id)
        .then(resposta => setFilmeSelecionado(resposta))
    }
  }, []);

  if (filme === null) return <Spinner />

  return (
    <div>
      <Header />

      <main>
        <h1>{filme.Title}</h1>
        <img src={filme.Poster} alt="Poster do filme" />
        <p>Trama: {filme.Plot}</p>
        <p>Linguagem: {filme.Language}</p>
        <p>Nota: {filme.imdbRating}</p>
        <p>Data de lançamento: {filme.Released}</p>
        <p>Diretor: {filme.Director}</p>
        <p>Genero: {filme.Genre}</p>
        <p>Premiaçoes: {filme.Awards}</p>
        <p>Atores: {filme.Actors}</p>
      </main>
    </div>
  )
}

export default Detalhes
