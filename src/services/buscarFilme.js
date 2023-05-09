import { BASE_URL, API_KEY } from "../config/api.json";

async function buscarFilme(id) {
  const url = `${BASE_URL}/?apikey=${API_KEY}`;
  const resposta = await fetch(`${url}&i=${id}`);
  const json = await resposta.json();
  return json;
}

export default buscarFilme;
