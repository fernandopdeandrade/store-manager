/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import HeaderAdminUser from "../components/HeaderAdminUser";
import Loading from "../components/Loading";
import { FilterContextState } from "../context/InfoContext";
import useDataInfos from "../hooks/useDataInfos";
import '../styles/ProductIdDetails.css';

export default function ProductIdDetails() {
  const { id } = useParams();

  const { getProductId } = useDataInfos() || {};
  const { user, setUser } = useContext(FilterContextState) || {};

  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductId(id).then((response) => {
      setProduct(response);
    });

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const buyProduct = async (idClient, idProduct) => {
    const body = {
      idClient,
      idProduct,
    };

    await fetch('http://localhost:8080/sold', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  }

  return (
    <>
    {loading && <Loading />}
    <HeaderAdminUser user={user} setUser={ setUser } />
      <div className="product-details">
      <h1 className="title">Detalhes do produto</h1>
      <img src={ product.link_image } alt={ product.name } />  
      <h1 className="product-name">{product.name}</h1>
      <p className="price"><b>Preço:</b> {product.price_in_cents / 100}.00 R$</p>
      <p className="description"><b>Descrição:</b> {product.descricao_product}</p>
      <div className="buttons-details-product">
        <Link
          className="comprar"
          to="/home_user"
          onClick={ () => buyProduct(user.id, product.id) }
        >Comprar</Link>
        <Link className="retornar" to="/home_user">Voltar para a loja</Link>
      </div>  
    </div>    
    </>
  );
}