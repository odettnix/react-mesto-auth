function ImagePopup ({card, isOpen, onClose}) {
  return(
    <div onClick={onClose}  className={`popup popup_place_image" ${isOpen ? `popup_opened` : ""}`} >
        <div className="popup__image-container">
            <button className="popup__close" type="button" ></button>
            <figure className="popup__image-wrapper">
                <img className="popup__image" src={card.link} alt ={`Картинка: ${card.cardName}`} />
                <figcaption className="popup__image-caption">{card.name}</figcaption>
            </figure>
        </div>
    </div>
  );
}

export default ImagePopup;