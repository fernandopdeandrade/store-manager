import { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
// import Loading from "../components/Loading";
import { FilterContextState } from "../context/InfoContext";
import useDataInfos from "../hooks/useDataInfos";
import "../styles/Login.css";

function Login() {
  const history = useHistory();

  const { role } = useContext(FilterContextState) || {};
  console.log("Sou o role do login= ", role);

  const { loginUser, getAllClients,  errorLogin, setErrorLogin } =
    useDataInfos() || {};

  const [username, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [messageLogin, setMessageLogin] = useState("");

  const USER_NAME_LIMIT = 5;
  const userNameValidation = username.length > USER_NAME_LIMIT; 
  const PASSWORD_LIMIT = 5;
  const passwordValidation = password.length > PASSWORD_LIMIT;

  const saveSubmition = () => {
    //  loginUser(username, password);
    getAllClients()
  };

  useEffect(() => {
    if (errorLogin === "Invalid email or password") {
      setErrorLogin("Email ou senha inválidos");

      setTimeout(() => {
        setErrorLogin("");
      }, 3000);
    }

    if (errorLogin === "Invalid email or password 1") {
      setErrorLogin("Usuário não encontrado no banco de dados");

      setTimeout(() => {
        setErrorLogin("");
      }, 3000);
    }

    if (role === "admin" || role === "user") {
      history.push("/home");
    }
    if (role === "") {
      setMessageLogin("Preencha todos os campos!");
    }
  }, [role, history, errorLogin, setErrorLogin, setMessageLogin]);

  // if (isLoading) return <Loading />;

  return (
    <div className="login-form">
      <img className="recipes_logo" alt="Logo" />
      <img alt="tomate" className="login_image" />
      <div className="formLogin">
        <h1>Login</h1>
        <input
          type="text"
          data-testid="userName-input"
          placeholder="Nome..."
          onChange={(event) => setuserName(event.target.value)}
        />
        <input
          type="password"
          data-testid="password-input"
          placeholder="Senha..."
          onChange={(event) => setPassword(event.target.value)}
        />
        <button
          className="login_button"
          type="button"
          data-testid="login-submit-btn"
          disabled={!(userNameValidation && passwordValidation)}
          onClick={saveSubmition}
        >
          Entrar
        </button>
        <Link className="link" to="/register">
          Ainda não tem conta?
        </Link>
      </div>
      {errorLogin.length > 0 ? (
        <span className="span-error-login">{errorLogin}</span>
      ) : (
        <span className="span-message">{messageLogin}</span>
      )}
    </div>
  );
}

export default Login;
