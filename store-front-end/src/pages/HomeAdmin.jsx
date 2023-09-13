import { useContext, useEffect, useState } from "react";
import ErrorPageNotAcess from "../components/ErrorPageNotAcess";
import HeaderAdminUser from "../components/HeaderAdminUser";
import Loading from "../components/Loading";
import RegisterNewUser from "../components/RegisterNewUser";
import { FilterContextState } from "../context/InfoContext";

export default function HomeAdmin() {
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
      {user.role === "ADMIN" ? (
        <>
          <HeaderAdminUser user={ user } setUser={ setUser } />
        <div className="page-admin">
          <RegisterNewUser />
        </div> </>) : ( <ErrorPageNotAcess /> )
      }
    </>
  )
}