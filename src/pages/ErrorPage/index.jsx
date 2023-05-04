import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div>
      <h1>404</h1>
      <p>A página que você tentou acessar não existe 😞</p>
      <Link to={'/'}>Voltar para Home</Link>
    </div>
  );
}

export default ErrorPage;
