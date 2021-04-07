'use strict';

const board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

const fields = document.querySelectorAll('.field');
const btn = document.querySelector('.btn');
const whoWon = document.querySelector('.won');
const message = document.querySelector('.message');
let whoseTurn = 'x';


function newGame() {
    initFields();
}

function checkIf3(mark, thisIndexX, thisIndexY) {
    if (board[thisIndexX].every(field => field == mark)) return true;
    if (board[0][thisIndexY] == board[1][thisIndexY] && board[0][thisIndexY] == board[2][thisIndexY]) return true;
    if ((thisIndexX == thisIndexY) && (board[0][0] == board[1][1]) && (board[0][0] == board[2][2])) return true;
    if ((parseInt(thisIndexX) + parseInt(thisIndexY) == 2) && (board[0][2] == board[1][1]) && (board[0][2] == board[2][0])) return true;
    return false;
}

function nextTurn() {
    const thisIndexX = this.dataset.x;
    const thisIndexY = this.dataset.y;
    if (board[thisIndexX][thisIndexY] != '') return;
    this.textContent = whoseTurn;
    board[thisIndexX][thisIndexY] = whoseTurn;
    if (checkIf3(whoseTurn, thisIndexX, thisIndexY)) {
        dspWinMsg(whoseTurn);
        clearFields();
        return;
    }
    whoseTurn = (whoseTurn == 'x') ? 'o' : 'x';
}

function dspWinMsg(who) {
    whoWon.textContent = who;
    message.setAttribute('style', 'visibility: visible');
}

function initFields() {
    fields.forEach(function (field) { field.addEventListener('click', nextTurn) });
    message.setAttribute('style', 'visibility: hidden');
    btn.addEventListener('click', newGame);
    // board.fill(''); a for ciklus helyett
    for (let i = 0; i < 3; i += 1) {
        for (let j = 0; j < 3; j += 1) {
            board[i][j] = '';
        }
    }
    fields.forEach(field => field.textContent = '');
    whoseTurn = 'x';
}

initFields();

function clearFields() {
    fields.forEach(function (field) { field.removeEventListener('click', nextTurn) });
}

