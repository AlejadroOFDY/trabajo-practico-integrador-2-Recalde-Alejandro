import { Link } from "react-router";

export const Navbar = ({ authStatus, onLogout }) => {
  const handleLogoutClick = async () => {
    try {
      await fetch("http://localhost:3000/api/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Error al cerrar sesión en el backend:", error);
    } finally {
      onLogout();
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/home">
          App
        </Link>
        <div className="d-flex gap-2">
          {authStatus === "authenticated" ? (
            <>
              <Link to="/home" className="btn btn-sm btn-outline-primary">
                Inicio
              </Link>
              <Link to="/tasks" className="btn btn-sm btn-outline-info">
                Tareas
              </Link>
              <Link to="/profile" className="btn btn-sm btn-outline-success">
                Perfil
              </Link>
              <button
                onClick={handleLogoutClick}
                className="btn btn-sm btn-outline-danger"
              >
                Salir
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-sm btn-outline-primary">
                Login
              </Link>
              <Link to="/register" className="btn btn-sm btn-outline-secondary">
                Registro
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
