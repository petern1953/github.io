const buttons = document.querySelectorAll('.button');
const backGround = document.body;

function changeBackgroundColor() {
    let color = this.attributes.id.value;
    backGround.setAttribute('style', `background-color: ${color}`);
};

buttons.forEach(button => button.addEventListener('click', changeBackgroundColor));