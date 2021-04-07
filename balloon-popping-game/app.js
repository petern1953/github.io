let popCounter = 0;

const balloons = document.querySelectorAll('.balloon');
const endText = document.querySelector('#say-no-balloons');

function popBalloon() {
    this.setAttribute('style', 'background-color: #ededed');
    this.removeEventListener('mouseover', popBalloon)
    setTimeout(() => this.setAttribute('class', 'inVisible'), 400);
    if ((popCounter += 1) > 24) setTimeout(() => endText.setAttribute('style', 'display: inline'), 300);
}

(function setBalloonsPopEvent() {
    balloons.forEach(balloon => balloon.addEventListener('mouseover', popBalloon));
})()
