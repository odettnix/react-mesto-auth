import PopupWithForm from "./PopupWithForm";
import {useEffect, useState, useContext} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const currentUser = useContext(CurrentUserContext);

  const [isValidInputName, setIsValidInputName] = useState(true);
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [isValidInputDescription, setIsInputDescriptionValid] = useState(true);
  const [descriptionErrorMessage, setDescriptionErrorMessage] = useState("");

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

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
    if (e.target.validity.valid) {
      setDescriptionErrorMessage("");
      setIsInputDescriptionValid(true);
    } else {
      setDescriptionErrorMessage(e.target.validationMessage);
      setIsInputDescriptionValid(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
        props.onUpdateUser({
        name,
        about: description,
        });
  }

  useEffect(() => {
    setNameErrorMessage("");
    setDescriptionErrorMessage("");
    setIsValidInputName(true);
    setIsInputDescriptionValid(true);
    if (props.isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [props.isOpen, currentUser]);

  return (
    <PopupWithForm
      disabled={!(nameErrorMessage === "" && descriptionErrorMessage === "")}
      name="profile"
      title={"Редактировать профиль"}
      buttonText={props.isLoading ? `Сохранение...` : `Сохранить`}
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
    >
      <input
        id="popup-input-name"
        value={name}
        onChange={handleNameChange}
        type="text"
        className="popup__input popup__input_value-name"
        name="popup__name"
        placeholder="Ваше имя"
        required
        minLength="2"
        maxLength="40"
      />
      <span className="popup__input-error popup-input-avatar-error">{nameErrorMessage}</span>
      <input
        id="popup-input-text"
        value={description}
        onChange={handleDescriptionChange}
        type="text"
        className="popup__input popup__input_value-text"
        name="popup__text"
        placeholder="О себе"
        required
        minLength="2"
        maxLength="200"
      />
      <span className="popup__input-error popup-input-avatar-error">{descriptionErrorMessage}</span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;