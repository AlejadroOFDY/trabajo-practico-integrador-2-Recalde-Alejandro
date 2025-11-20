import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "../../hooks/useForm";
import { Loading } from "../../components/Loading";

export const Register = ({ onLoginSuccess }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { form, handleChange, handleReset } = useForm({
    username: "",
    password: "",
    email: "",
    firstname: "",
    lastname: "",
    dni: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: form.firstname,
      lastname: form.lastname,
      username: form.username,
      password: form.password,
      email: form.email,
    };

    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        alert("¡Usuario registrado exitosamente! Por favor inicia sesión.");
        navigate("/login");
      } else {
        alert(data.message || "Error en el registro");
        handleReset();
      }
    } catch (error) {
      console.error(error);
      alert("Error al conectar con el servidor");
      handleReset();
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container py-5">
      {loading && <Loading />}
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h1 className="h4 mb-4 text-center">Registro</h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Usuario
                  </label>
                  <input
                    id="username"
                    type="text"
                    name="username"
                    placeholder="username"
                    value={form.username}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Correo
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Contraseña
                  </label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </div>

                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="firstname" className="form-label">
                        Nombre/s
                      </label>
                      <input
                        id="firstname"
                        type="text"
                        name="firstname"
                        placeholder="firstname"
                        value={form.firstname}
                        onChange={handleChange}
                        required
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="lastname" className="form-label">
                        Apellido/s
                      </label>
                      <input
                        id="lastname"
                        type="text"
                        name="lastname"
                        placeholder="lastname"
                        value={form.lastname}
                        onChange={handleChange}
                        required
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="dni" className="form-label">
                    DNI
                  </label>
                  <input
                    id="dni"
                    type="number"
                    name="dni"
                    placeholder="dni"
                    value={form.dni}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Registrarse
                </button>
              </form>
              <p className="text-center text-muted mt-3 mb-0">
                ¿Ya tienes cuenta?{" "}
                <Link to="/login" className="text-decoration-none">
                  Inicia sesión
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
