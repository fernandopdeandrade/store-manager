/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import HeaderAdminUser from "../components/HeaderAdminUser";
import Loading from "../components/Loading";
import { FilterContextState } from "../context/InfoContext";
import useDataInfos from "../hooks/useDataInfos";
import '../styles/HomeUserPurchased.css';

export default function HomeUserPurchased() {
  const { id } = useParams();

  const { solds, products, user } = useContext(FilterContextState) || {};
  
  const { getAllSoldsByClientId, getAllProducts } = useDataInfos();

  const [allSoldsByClientId, setAllSoldsByClientId] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    getAllProducts()
    getAllSoldsByClientId(id)

    setTimeout(() => {
      (() => oldsByProductsClientId())();
      setLoading(false);
    }, 2000);

  }, [])
  
  const oldsByProductsClientId = () => {
    for (let i = 0; i < solds.length; i++) {
      for (let j = 0; j < products.length; j++) {
        if (solds[i].idProduct === products[j].id) {
          setAllSoldsByClientId((old) => [...old, products[j]]);
        }
      }
    }
  }
  
  return (
    <>
      {loading ? (<Loading />)
       : (
          <>
            <HeaderAdminUser user={ user } />
            <div className="home-user-purchased">
                {allSoldsByClientId.length === 0 ? (
                  <p className="message-product">Você não tem nenhuma compra no momento! :/</p>
                ) : (
                  allSoldsByClientId.map((item, index) => (
                    <div className="item-product" key={ index }>
                      <h2 className="name-product">{item.name.length > 25 ? `${item.name.slice(0, 25)}...` : item.name}</h2>
                      <img src={item.link_image} alt={item.name} />
                      <h3 className="price-product"><b>Preço: </b>{item.price_in_cents / 100}.00 R$</h3>
                      <h3 className="description-product"><b>Descrição: </b>{ item.descricao_product.length > 30 ? `${item.descricao_product.slice(0, 30)}...` : item.descricao_product }</h3>
                      <div className="bottons-product-purchased">
                          <Link to="/home_user" className="btn-to-give-up">Desistir da compra</Link>
                        <Link to="/home_user" className="btn-go-to-the-store">Voltar para a loja</Link>
                        <Link to={`/product/${item.id}`} className="btn-to-see-more">Detalhes</Link>
                      </div>                        
                    </div>
                  ))
                )}
            </div>
          </>
        )}
    </>
  )
}
