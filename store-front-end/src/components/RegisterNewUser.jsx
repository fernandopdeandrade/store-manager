import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useDataInfos from "../hooks/useDataInfos";
import "../styles/Register.css";

export default function RegisterNewUser() {
  const { createUser, responseRegister } = useDataInfos() || {};

  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [messageLogin, setMessageLogin] = useState("");
  const [classMessage, setClassMessage] = useState("");

  const NAME_LIMIT = 3;
  const nameValidation = name.length > NAME_LIMIT;
  const CPF_LIMIT = 10;
  const cpfValidation = cpf.length > CPF_LIMIT;
  const EMAIL_REGEX = /\S+@\S+\.\S+/;
  const emailValidation = EMAIL_REGEX.test(email);
  const BIRTHDATE_LIMIT = 3;
  const birthDateValidation = birthDate.length > BIRTHDATE_LIMIT;
  const PASSWORD_LIMIT = 5;
  const passwordValidation = password.length > PASSWORD_LIMIT;
  const ROLE_FORMAT = "USER" || "ADMIN";
  const roleValidation = role === ROLE_FORMAT;

  useEffect(() => {
      if (responseRegister.status === 409) {
        setMessageLogin("Erro ao cadastrar usuário");
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
    setRole("");

    document.getElementById("user-name-input").value = "";
    document.getElementById("user-cpf-input").value = "";
    document.getElementById("user-email-input").value = "";
    document.getElementById("user-birthDate-input").value = "";
    document.getElementById("password-input").value = "";
    document.getElementById("role-input").value = "";
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
      role: role,
    };
    
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };

    await createUser("http://localhost:8080/client", options);
  };

  return (
    <div className="login-form">
      <img className="recipes_logo" alt="Logo" />
      <div className="formRegister">
        <h1>Cadastro</h1>
        <div className="info-inputs-complete">
        {<b className={!nameValidation ? 'b-error' : 'b-succes'}>Nome deve ter 4 ou mais caracteres</b>}<br/> 
        {<b className={!cpfValidation ? 'b-error' : 'b-succes'}>Formato do cpf -000.000.000-00</b>}<br/>
        {<b className={!emailValidation ? 'b-error' : 'b-succes'}>Formato do email -email@email.com</b>}<br/>
        {<b className={!birthDateValidation ? 'b-error' : 'b-succes'}>Formato da data -00/00/0000</b>}<br/>
        {<b className={!passwordValidation ? 'b-error' : 'b-succes'}>Senha deve ter 6 ou mais caracteres</b>}<br/>
        {<b className={!roleValidation ? 'b-error' : 'b-succes'}>Role deve ser "USER" ou "ADMIN"</b>}
        </div>
        <input
          type="text"
          id="user-name-input"
          placeholder="Nome..."
          onChange={(event) => setName(event.target.value)}
        />      
        <input
          type="text"
          id="user-cpf-input"
          placeholder="CPF..."
          onChange={(event) => setCpf(event.target.value)}
        />     
        <input
          type="text"
          id="user-email-input"
          placeholder="Email..."
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="text"
          id="user-birthDate-input"
          placeholder="Data de nascimento..."
          onChange={(event) => setBirthDate(event.target.value)}
        />
        <input
          type="password"
          id="password-input"
          placeholder="Password..."
          onChange={(event) => setPassword(event.target.value)}
        />
        <input
          type="text"
          id="role-input"
          placeholder="Role..."
          onChange={(event) => setRole(event.target.value)}
        />
        <button
          className="login_button"
          type="button"
          id="login-submit-btn"
          disabled={!(roleValidation && passwordValidation && nameValidation)}
          onClick={registerUser}
        >
          Cadastrar
        </button>
        <Link className="link" to="/">
          Retornar para login
        </Link>
      </div>
      {messageLogin.length > 0 ? (
        <span className={classMessage}>{messageLogin}</span>
      ) : (
        <span className="span-message-register">Preencha todos os campos</span>
      )}
    </div>
  );
}