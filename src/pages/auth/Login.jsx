import { useForm } from "../../hooks/useForm";
import { useNavigate } from "react-router";

export const Login = () => {
  const { form, handleChange, handleReset } = useForm({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      console.log("estoy en el submit");

      if (response) {
        navigate("/home");
      } else {
        alert("Credenciales incorrectas");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h1 className="h4 mb-4 text-center">Iniciar sesión</h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="login-username" className="form-label">
                    Usuario
                  </label>
                  <input
                    id="login-username"
                    type="text"
                    name="username"
                    placeholder="username"
                    value={form.username}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="login-password" className="form-label">
                    Contraseña
                  </label>
                  <input
                    id="login-password"
                    type="password"
                    name="password"
                    placeholder="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Iniciar Sesión
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
