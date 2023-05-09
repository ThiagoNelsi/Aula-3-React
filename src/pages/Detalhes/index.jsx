import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import Header from '../../components/Header';
import buscarFilme from '../../services/buscarFilme';

function Detalhes() {
  const { id } = useParams();

  const [filme, setFilme] = useState({});

  useEffect(() => {
     buscarFilme(id)
      .then(resposta => {
        setFilme(resposta)
      })
  }, [])

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
