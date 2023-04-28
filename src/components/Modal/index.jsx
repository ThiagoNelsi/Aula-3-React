import PropTypes from 'prop-types'
import { AiOutlineClose } from 'react-icons/ai'
import './Modal.css'

function Modal({ titulo, isOpen, closeModal, children }) {
  return (
    <div className={`modal-background ${isOpen && "visible"}`}>
      <div className="modal-box">
        <header>
          <p>{titulo}</p>
          <p onClick={closeModal} className='fecharModal'><AiOutlineClose /></p>
        </header>
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  )
}

Modal.propTypes = {
  titulo: PropTypes.string,
  isOpen: PropTypes.bool,
  closeModal: PropTypes.func,
  children: PropTypes.node,
}

export default Modal;
