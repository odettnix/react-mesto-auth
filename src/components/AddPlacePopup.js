import PopupWithForm from "./PopupWithForm";
import {useState, useEffect} from "react";

function AddPlacePopup(props) {
    const [name, setName] = useState("");
    const [link, setLink] = useState("");
  
    const [isValidInputName, setIsValidInputName] = useState(true);
    const [nameErrorMessage, setNameErrorMessage] = useState("");
    const [isValidInputLink, setIsInputLinkValid] = useState(true);
    const [linkErrorMessage, setLinkErrorMessage] = useState("");
  
    function handleNameChange(e) {
      setName(e.target.value);
      if (e.target.validity.valid) {
        setNameErrorMessage("");
        setIsValidInputName(true);
      } else {
        setNameErrorMessage(e.target.validationMessage);
        setIsValidInputName(false);
      }
    }
  
    function handleLinkChange(e) {
      setLink(e.target.value);
      if (e.target.validity.valid) {
        setLinkErrorMessage("");
        setIsInputLinkValid(true);
      } else {
        setLinkErrorMessage(e.target.validationMessage);
        setIsInputLinkValid(false);
      }
    }
  
    function handleFormSubmit(evt) {
      evt.preventDefault();
      props.onAddCard({
        name,
        link,
      });
    }
  
    useEffect(() => {
      setName("");
      setLink("");
      setNameErrorMessage("");
      setLinkErrorMessage("");
      setIsValidInputName(false);
      setIsInputLinkValid(false);
    }, [props.isOpen]);
  
    return (
    <PopupWithForm
        disabled={!isValidInputLink || !isValidInputName} 
        name='place' title={"Новое место"} 
        buttonText={props.isLoading ? `Сохранение...` : `Сохранить`} 
        isOpen={props.isOpen} 
        onSubmit={handleFormSubmit}>
        <input 
            type="text" 
            className="popup__input popup__input_value-location" 
            id="popup-input-location" 
            name="placeName" 
            value={name} 
            onChange={handleNameChange}
            placeholder="Название" 
            required 
            minLength="2" 
            maxLength="30"
        />
        <span className="popup__input-error popup-input-avatar-error">{nameErrorMessage}</span>
        <input 
            type="url" 
            className="popup__input popup__input_value-url" 
            id="popup-input-url" 
            name="placeLink" 
            value={link} 
            onChange={handleLinkChange}
            placeholder="Ссылка на картинку" 
            required 
        />
        <span className="popup__input-error popup-input-avatar-error">{linkErrorMessage}</span>
      </PopupWithForm>
    );
  }
  export default AddPlacePopup;