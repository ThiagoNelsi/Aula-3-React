import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { API_KEY, BASE_URL } from '../../config/api.json'

function Detalhes() {
  const url = `${BASE_URL}/?apikey=${API_KEY}`;

  const { id } = useParams();

  const [filme, setFilme] = useState({});

  useEffect(() => {
    buscarDados();
  }, [])

  function buscarDados() {
    fetch(`${url}&i=${id}`)
      .then(response => response.json())
      .then(response => {
        setFilme(response);
      });
  }

  return (
    <div>
      <header>
        LOGO
      </header>

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
