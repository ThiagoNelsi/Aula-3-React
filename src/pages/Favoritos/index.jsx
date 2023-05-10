import { useEffect, useState } from "react";
import buscarFilme from "../../services/buscarFilme";
import Header from "../../components/Header"
import ListaDeFilmes from "../../components/ListaDeFilmes";
import Spinner from "../../components/Spinner";

function Favoritos() {

  const [ids] = useState(JSON.parse(localStorage.getItem('listaDeFavoritos')) || []);
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    buscarFilmes();
  }, []);

  async function buscarFilmes() {
    const promises = ids.map(async id => {
      const resposta = await buscarFilme(id);
      return resposta;
    });

    const respostaFinal = await Promise.all(promises)

    setFilmes(respostaFinal.reverse());
  }

  return (
    <>
      <Header />
      {filmes.length === 0 && <Spinner />}
      <ListaDeFilmes
        filmes={filmes}
        openModal={() => {}}
        adicionarFavorito={() => {}}
        removerFavorito={() => {}}
        listaDeFavoritos={ids}
      />
    </>
  )
}

export default Favoritos
