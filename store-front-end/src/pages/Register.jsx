import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import useDataInfos from "../hooks/useDataInfos";
import "../styles/Register.css";

function Register() {
  const { createUser } = useDataInfos() || {};

  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [idProduct, setIdProduct] = useState("");
  const [active, setActive] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [messageLogin, setMessageLogin] = useState("");
  const [classMessage, setClassMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const NAME_LIMIT = 3;
  const nameValidation = name.length > NAME_LIMIT;
  const CPF_LIMIT = 11;
  const cpfValidation = cpf.length > CPF_LIMIT;
  const EMAIL_LIMIT = 3;
  const emailValidation = email.length > EMAIL_LIMIT;
  const BIRTHDATE_LIMIT = 3;
  const birthDateValidation = birthDate.length > BIRTHDATE_LIMIT;
  // const IDPRODUCT_LIMIT = 3;
  // const idProductValidation = idProduct.length > IDPRODUCT_LIMIT;
  // const ACTIVE_LIMIT = 3;
  // const activeValidation = active.length > ACTIVE_LIMIT;
  const PASSWORD_LIMIT = 5;
  const passwordValidation = password.length > PASSWORD_LIMIT;
  const ROLE_LIMIT = 3;
  const roleValidation = role.length > ROLE_LIMIT; 

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const clearInputs = () => {
    setRole("");
    setPassword("");
    setName("");
  };

  const registerUser = async () => {
    const body = {
      name: name,
      cpf: cpf,
      email: email,
      birth_date: birthDate,
      id_product: idProduct,
      active: active === "Ativo" ? true : false,
      password: password,
      role: role,
    };
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    await createUser(
      "http://localhost:8080/client",
      options
    );
  };

  if (loading) return <Loading />;

  return (
    <div className="login-form">
      <img className="recipes_logo" alt="Logo" />
      <div className="formRegister">
        <h1>Cadastro</h1>
        {!nameValidation && <b>Nome deve ter 4 ou mais caracteres</b>}
        <input
          type="text"
          data-testid="user-name-input"
          placeholder="Nome..."
          onChange={(event) => setName(event.target.value)}
        />
        {!roleValidation && <b>Formato do email - user@email.com</b>}
        <input
          type="text"
          data-testid="user-cpf-input"
          placeholder="CPF..."
          onChange={(event) => setCpf(event.target.value)}
        />
        {!cpfValidation && <b>Formato do email -000.000.000-00</b>}
        <input
          type="text"
          data-testid="user-email-input"
          placeholder="Email..."
          onChange={(event) => setEmail(event.target.value)}
        />
        {!emailValidation && <b>Formato do email -email@email.com</b>}
        <input
          type="text"
          data-testid="user-birthDate-input"
          placeholder="Data de nascimento..."
          onChange={(event) => setBirthDate(event.target.value)}
        />
        {!birthDateValidation && <b>Formato da data -00/00/0000</b>}
        <input
          type="text"
          data-testid="user-idProduct-input"
          placeholder="Id do produto..."
          onChange={(event) => setIdProduct(event.target.value)}
        />
        <input
          type="text"
          data-testid="user-active-input"
          placeholder="Ativo... ou Inativo..."
          onChange={(event) => setActive(event.target.value)}
        />
        <input
          type="password"
          data-testid="password-input"
          placeholder="Password..."
          onChange={(event) => setPassword(event.target.value)}
        />
        {!passwordValidation && <b>Senha deve ter 6 ou mais caracteres</b>}        
        <input
          type="text"
          data-testid="role-input"
          placeholder="Role..."
          onChange={(event) => setRole(event.target.value)}
        />
        <button
          className="login_button"
          type="button"
          data-testid="login-submit-btn"
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
        <span className="span-message">Preencha todos os campos</span>
      )}
    </div>
  );
}

export default Register;
