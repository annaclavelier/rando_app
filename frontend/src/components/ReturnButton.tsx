import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router";

interface Props {
  link: string | number;
  text: string;
}
function ReturnButton({ link, text }: Props) {
  const navigate = useNavigate();

  return (
    <div>
      <button
        className="btn ps-0 text-secondary"
        onClick={() => {
          navigate(link);
        }}
      >
        <FontAwesomeIcon icon={faArrowLeft} /> {text}
      </button>
    </div>
  );
}

export default ReturnButton;
