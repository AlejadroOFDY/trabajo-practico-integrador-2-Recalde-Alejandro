import { Footer } from "./Footer";
export const Navbar = () => {
  const hasToken = document.cookie.includes("token=");
  const logout = async () => {
    const res = await fetch("http://localhost:3000/api/logout", {
      method: "POST",
      credentials: "include",
    });
    if (res.ok) window.location.href = "/login";
  };
  return (
    <>
      <nav className="navbar navbar-light bg-light px-3">
        <a className="navbar-brand" href="/home">
          App
        </a>
        <div className="d-flex gap-2">
          {!hasToken && (
            <a href="/login" className="btn btn-sm btn-outline-primary">
              Login
            </a>
          )}
          {!hasToken && (
            <a href="/register" className="btn btn-sm btn-outline-secondary">
              Registro
            </a>
          )}
          {hasToken && (
            <a href="/tasks" className="btn btn-sm btn-outline-info">
              Tareas
            </a>
          )}
          {hasToken && (
            <a href="/profile" className="btn btn-sm btn-outline-success">
              Perfil
            </a>
          )}
          {hasToken && (
            <button onClick={logout} className="btn btn-sm btn-outline-danger">
              Salir
            </button>
          )}
        </div>
      </nav>
      <Footer />
    </>
  );
};
