import register_ok from '../images/register_ok.svg'
import register_arror from '../images/register_arror.svg'

function InfoTooltip ({onClose, isOpen, registerResponse}) {
  return (
    <div onClick={onClose} className={`popup ${isOpen ? `popup_opened` : ""}`}>
      <div  className="popup__container popup__infoTooltip">
      <button className="popup__close" type="button" onClick={onClose}></button>
        <img src={registerResponse.status ? register_ok : register_arror} className="popup__message-icon" alt="Иконка статуса"></img>
        <h3 className="popup__title popup__title-infoTooltip">
          {registerResponse.text}
        </h3>
        
      </div>
    </div>
  );
}

export default InfoTooltip