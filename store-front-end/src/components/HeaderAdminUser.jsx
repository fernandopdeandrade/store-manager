import { Link } from 'react-router-dom';
import '../styles/Header.css';

export default function HeaderAdminUser(props) {
  const { user, setUser } = props;

  const logout = () => {
    setUser({});
    localStorage.clear();
  }

  return (
    <header className="header">
      <h1 className="title">Store Manager</h1>
      <p>Seja bem vindo(a) { user.name }</p>
      <div className="header-links">
        <Link to="/admin/products">Pedidos</Link>
        <Link to="/" onClick={ logout }>Sair</Link>
      </div>
    </header>
)
}