import { Link } from 'react-router';

function NotFound() {
  return (
    <div>
      <h2>404 — Pagina nu există</h2>
      <p>Ne pare rău, pagina pe care o cauți nu există.</p>

      <Link to="/">Înapoi la Home</Link>
    </div>
  );
}

export default NotFound;