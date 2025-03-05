import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface Props {
  onClick: () => void;
}

const ButtonFilter = ({onClick}:Props) => {
  return (
    <button className='btn btn-primary' onClick={onClick}>Filtrer <FontAwesomeIcon icon={faFilter} /></button>
  )
}

export default ButtonFilter