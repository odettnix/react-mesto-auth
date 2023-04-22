function PopupWithForm ({disabled, name, isOpen, title, onClose, buttonText, onSubmit, children}) {

  return(
    <div onClick={onClose} className={`popup popup_${name} ${isOpen ? `popup_opened` : ""}` }>
    <div className="popup__container">
        <button className="popup__close" type="button" onClick={onClose}></button>
        <h3 className="popup__title">{title}</h3>
        <form className={`popup__form popup__${name}-form`}  onSubmit={onSubmit} name={name}>
        {children}
            <button disabled={disabled} className={disabled ? "popup__save_disabled popup__save" : "popup__save"} type="submit">{buttonText}</button>
        </form>
    </div>
    </div>
  );
}
  
export default PopupWithForm;