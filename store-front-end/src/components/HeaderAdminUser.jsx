import { Link, useLocation } from 'react-router-dom';
import '../styles/Header.css';

export default function HeaderAdminUser(props) {
  const { user, setUser } = props;

  const location = useLocation();

  const logout = () => {
    setUser({});
    localStorage.clear();
  }

  return (
    <header className="header">
      <h1 className="title">Store Manager</h1>
      <p>Seja bem vindo(a) { user.name }</p>
      <div className="header-links">
        {
          location.pathname.split('/')[1] === 'home_user_purchased'
          ? <Link to={ "/home_user" }>Loja</Link>
          : <Link to={`/home_user_purchased/${user.id}`}>Pedidos</Link>
        }
        <Link to="/" onClick={ logout }>Sair</Link>
      </div>
    </header>
)
}