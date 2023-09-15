const fetchCreateUser = async (url, options) => {
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};

const fetchLoginUser = async (url, options) => {
  const response = await fetch(url, options);
  const data = response.json();
  return data;
};

const fetchGetAllProducts = async (url) => {
  const response = await fetch(url);
  const data = await response.json()
  return data;
}

const fetchGetProductId = async (url) => {
  const response = await fetch(url);
  const data = response.json();
  return data;
}

const fetchGetAllClients = async (url) => {
  const response = await fetch(url);
  const data = await response.json()
  return data;
}

const fetchGetAllSoldsByClientId = async (url) => {
  const response = await fetch(url);
  const data = await response.json()
  return data;
}

export {
  fetchCreateUser,
  fetchGetAllClients,
  fetchGetAllProducts,
  fetchGetAllSoldsByClientId,
  fetchGetProductId,
  fetchLoginUser
};

