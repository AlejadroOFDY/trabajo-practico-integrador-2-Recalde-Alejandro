import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Loading } from "../components/Loading";

export const Profile = ({ onLogout }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/profile", {
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setUserData(data.user);
      } else {
        console.error("Error al obtener perfil, cerrando sesión");
        onLogout();
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      onLogout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleLogoutClick = async () => {
    try {
      await fetch("http://localhost:3000/api/logout", {
        credentials: "include",
      });
    } catch (error) {
      console.error("Error al cerrar sesión en el backend:", error);
    } finally {
      onLogout();
    }
  };

  if (loading) {
    return (
      <div className="container py-5">
        <Loading />
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <div className="text-center mb-4">
                <div
                  className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center"
                  style={{ width: "80px", height: "80px", fontSize: "2rem" }}
                >
                  {userData?.name ? userData.name.charAt(0).toUpperCase() : "U"}
                </div>
                <h2 className="mt-3">
                  {userData?.name
                    ? `${userData.name} ${userData.lastname}`
                    : "Mi Perfil"}
                </h2>
                <p className="text-muted">Información personal</p>
              </div>

              <hr />

              {userData && (
                <div className="mt-4">
                  <div className="mb-3 p-3 bg-light rounded">
                    <small className="text-muted">ID de Usuario</small>
                    <p className="mb-0 fw-bold">{userData.id}</p>
                  </div>

                  <div className="mb-3 p-3 bg-light rounded">
                    <small className="text-muted">Nombre</small>
                    <p className="mb-0 fw-bold">{userData.name}</p>
                  </div>

                  <div className="mb-3 p-3 bg-light rounded">
                    <small className="text-muted">Apellido</small>
                    <p className="mb-0 fw-bold">{userData.lastname}</p>
                  </div>

                  {userData.email && (
                    <div className="mb-3 p-3 bg-light rounded">
                      <small className="text-muted">Correo</small>
                      <p className="mb-0 fw-bold">{userData.email}</p>
                    </div>
                  )}

                  <button
                    onClick={handleLogoutClick}
                    className="btn btn-danger w-100 mt-3"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
