import { Link } from 'react-router-dom'
import '../styles/Header.css'

export default function HeaderLoginRegister() {
  return (
    <header className="header">
      <h1 className="title">Store Manager</h1>
      <div className="header-links">
        <Link to="/">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </header>
)
}