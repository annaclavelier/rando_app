import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { auth } = useAuth();

  return (
    <>
      <div className="container p-5">
        <div className="h3">
          Bonjour <span className="text-capitalize">{auth?.prenom}</span> !
        </div>
      </div>

      <div>Vos randonnées</div>
      <div>Vos favoris</div>
    </>
  );
}

export default Dashboard;
