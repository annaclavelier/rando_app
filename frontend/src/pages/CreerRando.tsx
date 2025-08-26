import ReturnButton from "../components/ReturnButton";
import FormRando from "../components/FormRando";

function CreerRando() {

  return (
    <div className="container pt-4">
      <ReturnButton link={"/my-randos"} text="Retour à mes randonnées" />

      <h2>Créer une randonnée</h2>
      <FormRando mode="create"/>
    </div>
  );
}

export default CreerRando;
