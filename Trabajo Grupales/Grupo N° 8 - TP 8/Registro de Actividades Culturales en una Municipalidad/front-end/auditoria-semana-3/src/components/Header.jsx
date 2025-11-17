import { Link, useNavigate } from "react-router-dom";
import "../styles/header/header.css";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="app-header">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Mi App
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/artistas">
                  Artistas
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/lugares">
                  Lugares
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/eventos">
                  Eventos
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/ventas">
                  Ventas
                </Link>
              </li>
            </ul>
            <div className="d-flex">
              {localStorage.getItem("token") ? (
                <button
                  className="btn btn-outline-light"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link className="btn btn-outline-light me-2" to="/login">
                    Login
                  </Link>
                  <Link className="btn btn-outline-light" to="/registro">
                    Registro
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
