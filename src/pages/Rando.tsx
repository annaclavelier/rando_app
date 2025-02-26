import { useParams } from "react-router-dom";

const Rando = () => {
  const { id } = useParams();
  return <div>Rando {id}</div>;
};

export default Rando;
