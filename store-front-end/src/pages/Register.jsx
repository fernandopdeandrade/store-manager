import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/HeaderLoginRegister";
import Loading from "../components/Loading";
import useDataInfos from "../hooks/useDataInfos";
import "../styles/Register.css";

export default function Register() {
  const { createUser, responseRegister } = useDataInfos() || {};

  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [password, setPassword] = useState("");
  const [messageLogin, setMessageLogin] = useState("");
  const [classMessage, setClassMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const NAME_LIMIT = 2;
  const nameValidation = name.length > NAME_LIMIT;
  const CPF_REGEX = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
  const cpfValidation = CPF_REGEX.test(cpf);
  const EMAIL_REGEX = /\S+@\S+\.\S+/;
  const emailValidation = EMAIL_REGEX.test(email);
  const BIRTHDATE_REGEX = /^\d{2}-\d{2}-\d{4}$/;
  const birthDateValidation = BIRTHDATE_REGEX.test(birthDate);
  const PASSWORD_LIMIT = 5;
  const passwordValidation = password.length > PASSWORD_LIMIT;

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    if (responseRegister.status === 409) {
      setMessageLogin("Usuário já existe no banco de dados");
      setClassMessage("error");
    } else {
      setMessageLogin("Usuário cadastrado com sucesso");
      setClassMessage("success");
      clearInputs();
    }

    setTimeout(() => {
      setMessageLogin("");
      setClassMessage("span-message-register");
    }, 3000);
  }, [responseRegister]);

  const clearInputs = () => {
    setName("");
    setCpf("");
    setEmail("");
    setBirthDate("");
    setPassword("");

    document.getElementById("user-name-input").value = "";
    document.getElementById("user-cpf-input").value = "";
    document.getElementById("user-email-input").value = "";
    document.getElementById("user-birthDate-input").value = "";
    document.getElementById("password-input").value = "";
  };

  const registerUser = async () => {
    const body = {
      name: name,
      cpf: cpf,
      email: email,
      birth_date: birthDate,
      id_product: "",
      active: true,
      password: password,
      role: "USER",
    };
    
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };

    await createUser("http://localhost:8080/client", options);
  };

  return (
    <>
      {isLoading && <Loading />}
      <Header />
      <div className="login-form">
      <img className="logo-store" alt="Logo" src="http://localhost:3000/logo-store.jpg" /><br/>
      <div className="formRegister">
        <h1>Cadastro</h1>
        {<b className={!nameValidation ? 'b-error-register' : 'b-succes-register'}>Nome deve ter 3 ou mais caracteres</b>}<br/> 
        <input
          type="text"
          id="user-name-input"
          placeholder="Nome..."
          onChange={(event) => setName(event.target.value)}
          />      
          {<b className={!cpfValidation ? 'b-error-register' : 'b-succes-register'}>Formato do cpf 000.000.000-00</b>}<br/>
        <input
          type="text"
          id="user-cpf-input"
          placeholder="CPF..."
          onChange={(event) => setCpf(event.target.value)}
          />     
          {<b className={!emailValidation ? 'b-error-register' : 'b-succes-register'}>Formato do email email@email.com</b>}<br/>
        <input
          type="text"
          id="user-email-input"
          placeholder="Email..."
          onChange={(event) => setEmail(event.target.value)}
          />
          {<b className={!birthDateValidation ? 'b-error-register' : 'b-succes-register'}>Formato da data 00-00-0000</b>}<br/>
        <input
          type="text"
          id="user-birthDate-input"
          placeholder="Data de nascimento..."
          onChange={(event) => setBirthDate(event.target.value)}
          />
          {<b className={!passwordValidation ? 'b-error-register' : 'b-succes-register'}>Senha deve ter 6 ou mais caracteres</b>}<br/>
        <input
          type="password"
          id="password-input"
          placeholder="Password..."
          onChange={(event) => setPassword(event.target.value)}
          />
        <button
          className="login_button"
          type="button"
          id="login-submit-btn"
          disabled={!(nameValidation && cpfValidation && emailValidation && birthDateValidation && passwordValidation)}
          onClick={registerUser}
        >
          Cadastrar
        </button>
        <Link className="link-register" to="/">
          Retornar para login
        </Link>
      </div>
      {messageLogin.length > 0 ? (
        <span className={classMessage}>{messageLogin}</span>
      ) : (
        <span className="span-message-register">Preencha todos os campos</span>
      )}
    </div>
    </>
  );
}