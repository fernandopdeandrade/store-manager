import { useContext, useState } from 'react';
import { FilterContextState } from '../context/InfoContext';
import { fetchLoginUser } from '../services/fetchData';

export default function useDataInfos() {
  const { setToken, setUser } = useContext(FilterContextState);

  const [isLoading, setIsLoading] = useState(true);
  const [errorLogin, setErrorLogin] = useState('');

  // função responsável por fazer o login do usuário e gerar o token
  // e chamar a outra função responsável por validar o token e retornar o usuário
  const loginUser = async (username, password) => {
    const url = 'http://localhost:8080/product';
    const resultData = await fetchLoginUser(url);
    console.log("sou o resultData do useDataInfos", resultData);
  };
  
  return {
    isLoading,
    errorLogin,
    setErrorLogin,
    loginUser,
  };
}