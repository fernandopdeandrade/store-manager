import { useContext, useEffect, useState } from "react";
import ErrorPageNotAcess from "../components/ErrorPageNotAcess";
import HeaderAdminUser from "../components/HeaderAdminUser";
import Loading from "../components/Loading";
import { FilterContextState } from "../context/InfoContext";

export default function HomeUser() {
  const [loading, setLoading] = useState(true);

  const { user, setUser } = useContext(FilterContextState) || {};
  
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      {loading && <Loading />}
      {user.role === "USER" ? (
        <>
          <HeaderAdminUser user={ user } setUser={ setUser } />
        <div className="page-user">
          <p>Estou na página Home do usuário</p>
        </div> </>) : ( <ErrorPageNotAcess /> )
      }
    </>
  )
}