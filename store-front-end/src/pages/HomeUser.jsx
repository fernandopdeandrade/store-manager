/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ErrorPageNotAcess from "../components/ErrorPageNotAcess";
import HeaderAdminUser from "../components/HeaderAdminUser";
import Loading from "../components/Loading";
import { FilterContextState } from "../context/InfoContext";
import useDataInfos from "../hooks/useDataInfos";
import '../styles/HomeUser.css';

export default function HomeUser() {
  const { getAllProducts } = useDataInfos() || {};
  const { user, setUser, products } = useContext(FilterContextState) || {};

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    getAllProducts()
  }, []);

  return (
    <>
      {loading && <Loading />}
      {user.role === "USER" ? (
        <>
        <HeaderAdminUser user={ user } setUser={ setUser } />
            <div className="container-products">
              {products.map((product) => (
                <div className="product" key={ product.id }>
                  <img src={ product.link_image } alt={ product.name } />
                  <p className="title">{product.name.length > 20 ? `${product.name.slice(0, 20)}...` : `${product.name}`}</p>
                  <p className="price"><b>Preço: </b>{product.price_in_cents / 100}.00 <b>R$</b></p>
                  <Link
                    className="link-details"
                    to={ `/product/${product.id}` }
                  >Ver detalhes do produto
                  </Link>
                </div>
              ))}
        </div> </>) : ( <ErrorPageNotAcess /> )
      }
    </>
  )
}