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

  return (
    <>
    {loading && <Loading />}
    <HeaderAdminUser user={user} setUser={ setUser } />
    <div className="product-details">
      <p className="price"><b>Preço:</b> {product.price_in_cents / 100}.00 R$</p>
      <img src={ product.link_image } alt={ product.name } />  
      <h1>{product.name}</h1>
      <p className="description"><b>Descrição:</b> {product.descricao_product}</p>
      <div className="buttons-details-product">
        <Link className="comprar">Comprar</Link>
        <Link className="retornar" to="/home_user">Voltar para a loja</Link>
      </div>  
    </div>    
    </>
  );
}