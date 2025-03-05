import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ButtonFilter = () => {
  return (
    <button className='btn btn-primary'>Filtrer <FontAwesomeIcon icon={faFilter} /></button>
  )
}

export default ButtonFilter