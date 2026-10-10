import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="p-8 text-center text-muted">
      <h1>That page drifted off the map.</h1>
      <p>
        <Link to="/">Return to Workora</Link>
      </p>
    </div>
  )
}
