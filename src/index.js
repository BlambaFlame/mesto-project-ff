import './pages/index.css';

import { initialCards } from './components/cards.js';
import { createCard, deleteCard, likeCard } from './components/card.js';  // Добавлены импорты
import { openModal, closeModal, setModalWindowEventListeners } from './components/modal.js';

const formEditProfile = document.querySelector('[name="edit-profile"]');
const nameInput = formEditProfile.querySelector('.popup__input_type_name');
const jobInput = formEditProfile.querySelector('.popup__input_type_description');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// PLACES
const formNewPlace = document.querySelector('[name="new-place"]');
const cardNameInput = formNewPlace.querySelector('.popup__input_type_card-name');
const urlInput = formNewPlace.querySelector('.popup__input_type_url');

const imagePopup = document.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');

const placesList = document.querySelector('.places__list');

// Функция открытия попапа с картинкой
function openCardPopup(title, link) {
    popupImage.src = link;
    popupImage.alt = title;
    popupCaption.textContent = title;
    openModal(imagePopup, null);
}

// Рендер карточки
function renderCard(item, method = "prepend") {
    const cardElement = createCard(
        item,          
        deleteCard,    
        openCardPopup, 
        likeCard       
    );
    placesList[method](cardElement);
}

// Инициализация начальных карточек
initialCards.forEach((cardData) => {
    renderCard(cardData, "append");
});

// Обработчики событий
const addButton = document.querySelector('.profile__add-button');
const addPopup = document.querySelector('.popup_type_new-card');
addButton.addEventListener('click', () => openModal(addPopup, null));

const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');
editButton.addEventListener('click', () => openModal(editPopup, beforeEditPopupOpened));

function beforeEditPopupOpened() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
}

function handleEditFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closeModal(editPopup);
}

formEditProfile.addEventListener('submit', handleEditFormSubmit);

function handleNewPlaceFormSubmit(evt) {
    evt.preventDefault();

    const newCard = {
        name: cardNameInput.value,
        link: urlInput.value
    };

    renderCard(newCard);
    formNewPlace.reset();
    closeModal(addPopup);
}

formNewPlace.addEventListener('submit', handleNewPlaceFormSubmit);

const popUps = document.querySelectorAll(".popup");
popUps.forEach(setModalWindowEventListeners);