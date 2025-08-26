import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { auth } = useAuth();

  return (
      <div className="container pt-4">
        <div className="h3">
          Bonjour <span className="text-capitalize">{auth?.prenom}</span> !
        </div>
        <hr/>
        <div>
          <Link to="/my-randos">Mes randonnées</Link>
        </div>

        <div>
          <Link to="/favorites">Mes favoris</Link>
        </div>

        <div><Link to="/search?query=">Découvrir les randonnées en ligne</Link></div>
      </div>
  );
}

export default Dashboard;
