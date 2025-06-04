export { createCard, deleteCard, likeCard };

const cardTemplate = document.querySelector('#card-template').content;

// Функция удаления карточки
function deleteCard(cardElement) {
    cardElement.remove();
}

// Функция лайка карточки
function likeCard(likeButton) {
    likeButton.classList.toggle("card__like-button_is-active");
}

function createCard(cardData, deleteCallback, onCardClickFunction, likeFunction) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;  
    cardTitle.textContent = cardData.name;

    deleteButton.addEventListener('click', () => {
        deleteCallback(cardElement);
    });

    const likeButton = cardElement.querySelector('.card__like-button');
    likeButton.addEventListener('click', (event) => {
        likeFunction(event.target);
    });

    cardImage.addEventListener('click', () => 
        onCardClickFunction(cardData.name, cardData.link));

    return cardElement;
}