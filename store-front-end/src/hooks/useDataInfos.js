import { useContext, useState } from 'react';
import { FilterContextState } from '../context/InfoContext';
import { fetchCreateUser, fetchGetAllClients, fetchGetAllProducts, fetchLoginUser } from '../services/fetchData';

export default function useDataInfos() {
  const { setToken, setUser, setRole, setSuccessRegister } = useContext(FilterContextState);
  const [isLoading, setIsLoading] = useState(true);
  const [errorLogin, setErrorLogin] = useState('');

  const loginUser = async (email, password) => {
    const url = 'http://localhost:8080/client/auth/login';
    const body = {
      email,
      password,
    };
    const Option = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };

    const resultData = await fetchLoginUser(url, Option);

    if (resultData.password === password) {
      setUser(resultData);
      setToken("access-token");
      setRole(resultData.role);
      setSuccessRegister('Login efetuado com sucesso');
    } else {
      setErrorLogin('Email ou senha inválidos');
    }
  };

    const createUser = async (url, options) => {
    const resultData = await fetchCreateUser(url, options);
    console.log("sou o resultData do useDataInfos", resultData);
    };
  
    const getAllClients = async () => {
    const url = 'http://localhost:8080/client';
    const resultData = await fetchGetAllClients(url);
    console.log("sou o resultData do useDataInfos", resultData);
    };
  
    const getAllProducts = async () => {
    const url = 'http://localhost:8080/product';
    const resultData = await fetchGetAllProducts(url);
    console.log("sou o resultData do useDataInfos", resultData);
  };
  
  return {
    isLoading,
    errorLogin,
    setErrorLogin,
    loginUser,
    getAllClients,
    getAllProducts,
    createUser
  };
}