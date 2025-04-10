import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav>
      <Link to="/">Landing</Link> |{" "}
      <Link to="/home">Home</Link> |{" "}
    </nav>
  )
}