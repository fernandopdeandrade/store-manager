import { useEffect, useState } from "react";
import ErrorPageNotAcess from "../components/ErrorPageNotAcess";
import Loading from "../components/Loading";

export default function HomeUser() {
  const storageUser = localStorage.getItem("user");
  const user = JSON.parse(storageUser);
  const role = user.role;
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <>
      {loading && <Loading />}
      {role === "USER" ? (
        <div className="page-user">
        <p>Estou na página Home do usuário</p>
      </div>) : ( <ErrorPageNotAcess /> )
      }
    </>
  )
}