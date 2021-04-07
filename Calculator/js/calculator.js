// Követelmények:
// Az eval metódus használata SZIGORÚAN TILOS! Most és mindörökké!
// Egyelőre nem kell foglalkozni azzal az esettel, hogy mi történik,
// ha két műveleti jel van egymás után. Ilyen esetekben dobhattok hibát.
// A felső input mezőben jelenjen meg az ERROR szöveg.
// Egymás után több művelet is végrehajtható, pl.: 10 - 20 + 3 * 2.
// Ilyen esetben a precedencia szabályokra még nem kell odafigyeled,
// csak balról jobbra, sorban értékelődjenek ki a műveletek!
// A számok és műveleti jelek a felső input mezőben jelenjenek meg.
// Az egyenlőségjelre kattintva az inputban megjelenik a művelet(ek) eredménye
// A C gomb törli az input mező tartamát

// ************         COMMENTS         *************
//
// Memory button híján a műveletek (= utáni) eredménye  
// további láncműveletekre használható, mintha csak 
// kézzel vittük volna be azt, közvetlenül

'use strict'

// ezekben gyűjtjük a kijelzöbe kerülő számokat / aritmetikai műveleteket
const numericAccu = [];
let numericStringTaylor; // az aktuális numerikus adat ebben gyűlik
const arithmAccu = [];

// a gombok
const arithmButtons = document.querySelectorAll('.arithmButton');
const numButtons = document.querySelectorAll('.num');
const dotButton = document.querySelector('.dot');
const clearButton = document.querySelector('.clear');
const equButton = document.querySelector('.equButton');
// a gombok animálásához
const buttons = document.querySelectorAll('.button');

// a kijelző
const calcDisplay = document.querySelector('#calcDisplay');

// figyeljük, az előző karakter műveleti jel, illetve pont volt-e
// nem engedünk meg egymást követően sem két .-ot, sem két műveleti jelet
let lastCharIsArithmSign = false;
let noDotYet = true;

const resetNumericTaylor = () => numericStringTaylor = '';
resetNumericTaylor();

const resetNumericAccu = () => numericAccu.length = 0;
resetNumericAccu();

const resetArithmAccu = () => arithmAccu.length = 0;
resetArithmAccu();

const setLastCharIsArithmSignWatch = () => lastCharIsArithmSign = true;
const setDotWatch = () => noDotYet = false;
const resetLastCharIsArithmSignWatch = () => lastCharIsArithmSign = false;
const resetDotWatch = () => noDotYet = true;

const resetWatches = () => {
    resetLastCharIsArithmSignWatch();
    resetDotWatch();
}

const putCharInNumericTaylor = (char) => {
    numericStringTaylor += char;
}

const moveResult2NumericTaylor = (result) => {
    numericStringTaylor = result;
}

const moveNumberStringInNumericAccu = () => {
    numericAccu[numericAccu.length] = numericStringTaylor;
    resetNumericTaylor();
}
const putSignInArithmAccu = (sign) => arithmAccu[arithmAccu.length] = sign;

const putCharInDisplay = (char) => {
    calcDisplay.value = (calcDisplay.value == '0') ? char : calcDisplay.value + char;
}

const displayResult = (result) => calcDisplay.value = result;

const sendErrorMessage = () => calcDisplay.value = "*** ERROR ***";
const clearDisplay = () => calcDisplay.value = '0';

const resetAll = () => {
    resetNumericTaylor();
    resetNumericAccu();
    resetArithmAccu();
    resetWatches();
    clearDisplay();
}

const manageError = () => {
    sendErrorMessage();
    setTimeout(() => resetAll(), 2000);
}

const manageArithmetics = (button) => {
    let arithmSign = button.getAttribute('value');
    if (!lastCharIsArithmSign && numericStringTaylor.length && numericStringTaylor != '.') {
        moveNumberStringInNumericAccu();
        putSignInArithmAccu(arithmSign);
        putCharInDisplay(arithmSign);
        setLastCharIsArithmSignWatch();
        resetDotWatch();
    } else {
        manageError();
    }
}

const manageNums = (button) => {
    let numChar = button.getAttribute('value');
    putCharInDisplay(numChar);
    putCharInNumericTaylor(numChar);
    resetLastCharIsArithmSignWatch();
}

const manageDot = () => {
    if (!numericStringTaylor.includes('.') && noDotYet) {
        putCharInNumericTaylor('.');
        putCharInDisplay('.');
        resetLastCharIsArithmSignWatch();
        setDotWatch();
    } else {
        manageError();
    }
}

const calculate = () => {
    moveNumberStringInNumericAccu();

    return numericAccu.map((item) => parseFloat(item))
        .reduce((total, currentItem, idx) =>
            (arithmAccu[idx - 1] == '+') ? total + currentItem :
                (arithmAccu[idx - 1] == '-') ? total - currentItem :
                    (arithmAccu[idx - 1] == '*') ? total * 10 * currentItem / 10 : total * 10 / currentItem / 10);
}

const animateButton = (button) => {
    button.classList.add('clicked');
    setTimeout((() => button.classList.remove('clicked')), 100);
}

// gombok aktívvá tétele
const activateArithmButtons = () => arithmButtons.forEach((button) => button.addEventListener('click', () => manageArithmetics(button)));
activateArithmButtons();

const activateNumButtons = () => numButtons.forEach((button) => button.addEventListener('click', () => manageNums(button)));
activateNumButtons();

const activateDotButton = () => dotButton.addEventListener('click', () => manageDot());
activateDotButton();

const activateEquButton = () => equButton.addEventListener('click', () => {
    let temp = calculate();
    let t = temp.toString();
    resetAll();
    displayResult(t);
    moveResult2NumericTaylor(t);
});
activateEquButton();

const activateClearButton = () => clearButton.addEventListener('click', () => resetAll());
activateClearButton();

const activateButtons = () => buttons.forEach((button) => button.addEventListener('click', () => animateButton(button)));
activateButtons();

// just in test phase
const testVariables = () => {
    console.log('numericAccu: ', numericAccu);
    console.log('numericStringTaylor: ', numericStringTaylor);
    console.log('arithmAccu: ', arithmAccu);
    console.log('lastCharIsArithmSign: ', lastCharIsArithmSign);
    console.log('noDotYet: ', noDotYet);
}
