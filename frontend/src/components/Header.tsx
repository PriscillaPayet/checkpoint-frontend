import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="header">
      <h1>Checkpoint : frontend</h1>
      <Link to="/">
        <span>Countries</span>
      </Link>
    </header>
  );
}
