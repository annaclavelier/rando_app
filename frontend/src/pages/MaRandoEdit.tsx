import FormRando from "../components/FormRando";
import ReturnButton from "../components/ReturnButton";

function EditRando() {
  return (
    <div className="container p-5">
      <ReturnButton link="/my-randos" text="Retour à mes randonnées" />

      <h2>Modifier la randonnée</h2>
      <FormRando mode="edit"/>
    </div>
  );
}

export default EditRando;
