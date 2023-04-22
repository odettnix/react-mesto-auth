import PopupWithForm from "./PopupWithForm";
import {useState, useEffect} from "react";
import ValidationForm from "../hooks/ValidationForm";

function AddPlacePopup({isLoading, isOpen, onAddCard}) {
  const {handleChange, errors, formValue, setFormValue, setErrors, isValid, setIsValid} = ValidationForm();

  function handleFormSubmit(evt) {
    evt.preventDefault();
    onAddCard({
      name: formValue.name,
      link: formValue.placeLink,
    });
  }

  useEffect(() => {
    setErrors("")
    if (isOpen) {
      setFormValue("")
      setIsValid(false)
    }
  }, [isOpen, setErrors, setFormValue, setIsValid]);
  
    return (
    <PopupWithForm
        disabled={!isValid}
        name='place' title={"Новое место"} 
        buttonText={isLoading ? `Сохранение...` : `Сохранить`} 
        isOpen={isOpen} 
        onSubmit={handleFormSubmit}>
        <input 
            type="text" 
            className="popup__input popup__input_value-location" 
            id="popup-input-location" 
            name="name" 
            value={formValue.name || ''}
            onChange={handleChange}
            placeholder="Название" 
            required 
            minLength="2" 
            maxLength="30"
        />
        <span className="popup__input-error popup-input-avatar-error">{errors.name}</span>
        <input 
            type="url" 
            className="popup__input popup__input_value-url" 
            id="popup-input-url" 
            name="placeLink" 
            value={formValue.placeLink || ''}
            onChange={handleChange}
            placeholder="Ссылка на картинку" 
            required 
        />
        <span className="popup__input-error popup-input-avatar-error">{errors.placeLink}</span>
      </PopupWithForm>
    );
  }
  
export default AddPlacePopup;