import { Link } from 'react-router-dom';

export default function ErrorPageNotAcess() {
  return (
    <div>
      <p>Você não tem acesso a essa página</p>
      <Link to="/">Voltar para a página inicial</Link>
    </div>
  )
}