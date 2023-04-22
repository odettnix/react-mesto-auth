import PopupWithForm from "./PopupWithForm";

function ConfirmPopup({card, isOpen, onConfirmDeleteClick}) {

  function handleSubmit(e) {
    e.preventDefault();
    onConfirmDeleteClick(card);
  }

  return (
    <PopupWithForm 
      name='confirm' 
      onSubmit={handleSubmit} 
      isOpen={isOpen} 
      buttonValid={true}
      title={"Вы уверенны?"} 
      buttonText={"Да"} 
    />
  );
}

export default ConfirmPopup;