import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <Link to="/">Retourner à la page d'accueil</Link>
      </p>
    </div>
  );
}
