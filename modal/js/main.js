
const modalContainer = document.querySelector('#modal__container');
const hider = document.querySelector('#hider');
const initBtn = document.querySelector('#init-button');
const okModalButton = document.querySelector(".button--ok");

initBtn.addEventListener('click', showModal);

function showModal() {
    modalContainer.setAttribute('class', 'modal__container--visible');
    hider.setAttribute('class', 'hider--visible');
    okModalButton.focus();
}

function hideModal() {
    modalContainer.setAttribute('class', 'modal__container--hidden');
    hider.setAttribute('class', 'hider--hidden');
}