import { useContext, useState } from 'react';
import { FilterContextState } from '../context/InfoContext';
import { fetchCreateUser, fetchGetAllClients, fetchGetAllProducts, fetchLoginUser } from '../services/fetchData';

export default function useDataInfos() {
  const { setToken, setUser } = useContext(FilterContextState);
  const [isLoading, setIsLoading] = useState(true);
  const [errorLogin, setErrorLogin] = useState('');

  const loginUser = async (username, password) => {
    const url = 'http://localhost:8080/client/auth/login';
    const body = {
      username,
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
    console.log("sou o resultData do useDataInfos", resultData);
  };

  const createUser = async (data) => {
      
    const url = 'http://localhost:8080/client';
    const resultData = await fetchCreateUser(url, Option);
      
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