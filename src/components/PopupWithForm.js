function PopupWithForm (props) {

  return(
    <div onClick={props.onClose} className={`popup popup_${props.name} ${props.isOpen ? `popup_opened` : ""}` }>
    <div className="popup__container">
        <button className="popup__close" type="button" onClick={props.onClose}></button>
        <h3 className="popup__title">{props.title}</h3>
        <form className={`popup__form popup__${props.name}-form`} name={props.name}>
        {props.children}
            <button className="popup__save" type="submit">{props.buttonText}</button>
        </form>
    </div>
    </div>
  );
    
}
  
    
  
  export default PopupWithForm;