import { useContext, useEffect, useState } from 'react';
import { FilterContextState } from '../context/InfoContext';
import { fetchCreateUser, fetchGetAllClients, fetchGetAllProducts, fetchGetAllSoldsByClientId, fetchGetProductId, fetchLoginUser } from '../services/fetchData';

export default function useDataInfos() {
  const { setUser, setProducts, setSolds } = useContext(FilterContextState);
  const [errorLogin, setErrorLogin] = useState('');
  const [responseRegister, setResponseRegister] = useState('');

    useEffect(() => { }, [responseRegister])
  
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
      } else {
        setErrorLogin('Email ou senha inválidos');
      }
    };

    const createUser = async (url, options) => {
    const resultData = await fetchCreateUser(url, options);
    setResponseRegister(resultData);
    console.log("sou o resultData do useDataInfos", resultData);
    };
  
    const getAllClients = async () => {
    const url = 'http://localhost:8080/client';
    const resultData = await fetchGetAllClients(url);
    console.log("sou o resultData do useDataInfos", resultData);
    return resultData;
    };
  
    const getAllProducts = async () => {
    const url = 'http://localhost:8080/product';
    const resultData = await fetchGetAllProducts(url);
    setProducts(resultData);
    };
  
    const getProductId = async (id) => {
      const url = `http://localhost:8080/product/${id}`;
      const resultData = await fetchGetProductId(url);
      console.log("sou o resultData do getProductId do useDataInfos", resultData);
      return resultData;
    }
  
    const getAllSoldsByClientId = async (id) => {
      const url = `http://localhost:8080/sold/${id}`;
      const resultData = await fetchGetAllSoldsByClientId(url);
      setSolds(resultData);
    }
  
  return {
    errorLogin,
    setErrorLogin,
    loginUser,
    getAllClients,
    getAllProducts,
    createUser,
    responseRegister,
    setResponseRegister,
    getProductId,
    getAllSoldsByClientId,
  };
}