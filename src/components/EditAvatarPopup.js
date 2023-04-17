import PopupWithForm from "./PopupWithForm";
import {useEffect, useRef, useState} from "react";

function EditAvatarPopup(props) {
  const inputRef = useRef("");
  const [isValidInput, setIsValidInput] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function onChange(e) {
    if (e.target.validity.valid) {
      setErrorMessage("");
      setIsValidInput(true);
    } else {
      setErrorMessage(e.target.validationMessage);
      setIsValidInput(false);
    }
  }

  useEffect(() => {
    setIsValidInput(false);
    setErrorMessage("");
    inputRef.current.value = "";
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }

  return (
    <PopupWithForm
      disabled={!isValidInput}
      name="avatar"
      title={"Обновить аватар"}
      buttonText={props.isLoading ? `Сохранение...` : `Сохранить`}
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
    >
      <input
        id="avatar-input"
        ref={inputRef}
        type="url"
        className="popup__input popup__input_value-avatar"
        name="avatar"
        placeholder="Ссылка на картинку"
        required
        onChange={onChange}
      />
      <span className="popup__input-error popup-input-avatar-error">{errorMessage}</span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;