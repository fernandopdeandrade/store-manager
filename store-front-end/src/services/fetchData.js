const fetchDataRegisterUser = async (url, options) => {
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};

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

export {
  fetchCreateUser,
  fetchDataRegisterUser,
  fetchLoginUser
};

