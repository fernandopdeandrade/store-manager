import { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Header from "../components/HeaderLoginRegister";
import Loading from "../components/Loading";
import { FilterContextState } from "../context/InfoContext";
import useDataInfos from "../hooks/useDataInfos";
import "../styles/Login.css";

function Login() {
  const history = useHistory();

  const { user } = useContext(FilterContextState) || {};

  const { loginUser, errorLogin, setErrorLogin } =
    useDataInfos() || {};

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const [messageLogin, setMessageLogin] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const EMAIL_REGEX = /\S+@\S+\.\S+/;
  const emailValidation = EMAIL_REGEX.test(email); 
  const PASSWORD_LIMIT = 5;
  const passwordValidation = password.length > PASSWORD_LIMIT;

  const saveSubmition = () => {
    loginUser(email, password);
  };
  
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    if (errorLogin === "Email ou senha inválidos") {
      setErrorLogin("Usuário não encontrado no banco de dados");

      setTimeout(() => {
        setErrorLogin("");
      }, 3000);
    }

    if (user.role === "ADMIN") {
      history.push("/home_admin");
    } else if (user.role === "USER") {
      history.push("/home_user");
    } else if (!user.role) {
      setMessageLogin("Preencha os campos corretamente!");
    }
  }, [history, errorLogin, setErrorLogin, user.role]);

  if (isLoading) return <Loading />;

  return (
    <>
      <Header />
    <div className="login-form">
      <img alt="tomate" className="login_image" src="http://localhost:3000/logo-store.jpg" />
      <div className="formLogin">
        <h1>Login</h1>
        <input
          type="email"
          data-testid="email-input"
          placeholder="Email..."
          onChange={(event) => setEmail(event.target.value)}
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
          disabled={!(emailValidation && passwordValidation)}
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
    </>
  );
}

export default Login;
