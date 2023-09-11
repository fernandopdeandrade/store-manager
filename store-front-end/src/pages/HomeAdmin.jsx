import { useEffect, useState } from "react";
import ErrorPageNotAcess from "../components/ErrorPageNotAcess";
import Loading from "../components/Loading";
import RegisterNewUser from "../components/RegisterNewUser";

export default function HomeAdmin() {
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
      {role === "ADMIN" ? (
        <div className="page-admin">
          <p>Estou na página Home do adminstrador</p>
          <RegisterNewUser />
      </div>) : ( <ErrorPageNotAcess /> )
      }
    </>
  )
}