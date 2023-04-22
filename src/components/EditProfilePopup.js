import PopupWithForm from "./PopupWithForm";
import {useEffect, useContext} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import ValidationForm from "../hooks/ValidationForm";

function EditProfilePopup({onUpdateUser, isOpen, isLoading, onClose}) {
  const currentUser = useContext(CurrentUserContext);
  const {handleChange, errors, formValue, setFormValue, setErrors, isValid} = ValidationForm();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: formValue.name,
      about: formValue.description,
    });
  }

  useEffect(() => {
    setErrors("")
    if (isOpen) {
      setFormValue({...formValue, 'name': currentUser.name, 'description': currentUser.about})
    }
  }, [isOpen, currentUser]);

  return (
    <PopupWithForm
      disabled={!isValid}
      name="profile"
      title={"Редактировать профиль"}
      buttonText={isLoading ? `Сохранение...` : `Сохранить`}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      
    >
      <input
        id="popup-input-name"
        value={formValue.name || ''}
        onChange={handleChange}
        type="text"
        className="popup__input popup__input_value-name"
        name="name"
        placeholder="Ваше имя"
        required
        minLength="2"
        maxLength="40"
      />
      <span className="popup__input-error">{errors.name}</span>
      <input
        id="popup-input-text"
        value={formValue.description || ''} 
        onChange={handleChange}
        type="text"
        className="popup__input popup__input_value-text"
        name="placeLink"
        placeholder="О себе"
        required
        minLength="2"
        maxLength="200"
      />
      <span className="popup__input-error">{errors.description}</span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;