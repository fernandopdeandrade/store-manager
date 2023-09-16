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

  const { solds, products, user, setUser } = useContext(FilterContextState) || {};
  
  const { getAllSoldsByClientId, getAllProducts, deleteSold } = useDataInfos();

  const [allSoldsByClientId, setAllSoldsByClientId] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log("sou o allSoldsByClientId = ", allSoldsByClientId);
  
  useEffect(() => {
    (async () => { await allFetchs(); })();
  }, [])

  const allFetchs = async () => {
    await getAllProducts();
    await getAllSoldsByClientId(id);

    setTimeout(() => {
      oldsByProductsClientId();
    }, 2000);
  }
  
  const oldsByProductsClientId = async () => {
    const resultFunc = [];
    
    for (let i = 0; i < solds.length; i++) {
      for (let j = 0; j < products.length; j++) {
        if (solds[i].idProduct === products[j].id) {
          resultFunc.push(products[j]);
        }
      }
    }
    setAllSoldsByClientId(resultFunc);
    setLoading(false);
  }

  const handleDeleteSold = async (idProduct) => {
    let resultId = "";

    for (let i = 0; i < solds.length; i++) {
      if (solds[i].idProduct === idProduct) {
        resultId = solds[i].id;
      }
    }

    console.log("sou o resultId = ", resultId);
    await deleteSold(resultId);
  }
  
  return (
    <>
      {loading ? (<Loading />)
       : (
          <>
            <HeaderAdminUser user={user} setUser={ setUser } />
            <h1 className="title-purchased">Minhas Compras</h1>
            <div className="home-user-purchased">
                {allSoldsByClientId.length === 0 ? (
                  <p className="message-product">Você não tem nenhuma compra no momento! :/</p>
                ) : (
                  allSoldsByClientId.map((item, index) => (
                    <div className="item-product" key={ index }>
                      <h2 className="name-product">{item.name.length > 25 ? `${item.name.slice(0, 25)}...` : item.name}</h2>
                      <img src={item.link_image} alt={item.name} />
                      <h3 className="price-product"><b>Preço: </b>{item.price_in_cents / 100}.00 R$</h3>
                      <h3 className="description-product"><b>Descrição: </b>{ item.descricao_product.length > 30 ? `${item.descricao_product.slice(0, 40)}...` : item.descricao_product }</h3>
                      <div className="bottons-product-purchased">
                        <Link
                          to="/home_user"
                          className="btn-to-give-up"
                          onClick={ () => handleDeleteSold(item.id) }
                        >Desistir da compra</Link>
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
