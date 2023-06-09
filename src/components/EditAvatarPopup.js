import PopupWithForm from "./PopupWithForm";
import {useEffect, useRef, useState} from "react";
import ValidationForm from "../hooks/ValidationForm";

function EditAvatarPopup({isOpen, onUpdateAvatar, onClose, isLoading}) {
  const inputRef = useRef("");
  const {handleChange, errors, setErrors, isValid, setIsValid} = ValidationForm();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar:
        inputRef.current.value,
    });
  }

  useEffect(() => {
    setIsValid(false);
    setErrors("");
    inputRef.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      disabled={!isValid}
      name="avatar"
      title={"Обновить аватар"}
      buttonText={isLoading ? `Сохранение...` : `Сохранить`}
      onSubmit={handleSubmit}
      isOpen={isOpen}
    >
      <input
        id="avatar-input"
        ref={inputRef}
        type="url"
        className="popup__input popup__input_value-avatar"
        name="avatar"
        placeholder="Ссылка на картинку"
        required
        onChange={handleChange}
      />
      <span className="popup__input-error popup-input-avatar-error">{errors.avatar}</span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;