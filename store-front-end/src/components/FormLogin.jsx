import { useEffect, useState } from 'react';
import '../styles/FormLogin.css';
import Loading from './Loading';

export default function FormLogin() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const MIN_PASSWORD_LENGTH = 6;
    const isValid = userName.length > 0 && password.length >= MIN_PASSWORD_LENGTH;
    setIsDisabled(!isValid);
  }
    , [userName, password]);
  
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }
    , []);
  
  const handleUserName = ({ target }) => {
    setUserName(target.value);
  }

  const handlePassword = ({ target }) => {
    setPassword(target.value);
  }

  const handleSubmit = (event) => {
    alert("logado com sucesso");
    event.preventDefault();
  }

  return (
    loading ? <Loading /> :
    <form onSubmit={handleSubmit}>
      <fieldset>
        <label htmlFor="userName">
          Usuário:
          <input
            id="userName"
            type="text"
            value={userName}
            onChange={handleUserName}
          />
        </label>
        <label htmlFor="password">
          Senha:
          <input
            id="password"
            type="password"
            value={password}
            onChange={handlePassword}
          />
        </label>
        <button type="submit" disabled={isDisabled}>
          Entrar
        </button>
      </fieldset>
    </form>
  );
};
