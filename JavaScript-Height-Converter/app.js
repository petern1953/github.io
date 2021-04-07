'strict mode';

const inputFeet = document.querySelector('input#feet');
const inputInches = document.querySelector('input#inches');
const footInCm = 30.48;
const inchInCm = 2.54;

function getFeetValue() {
    return parseFloat(inputFeet.value);
}

function getInchesValue() {
    return parseFloat(inputInches.value);
}

function convertToCm(feet, inches) {
    if (!isNaN(feet) && !isNaN(inches)) return feet * footInCm + inches * inchInCm;
    return NaN;
}

const convertBtn = document.querySelector('input#button');
const result = document.querySelector('#results');

function showResult() {
    let valueInCm = convertToCm(getFeetValue(), getInchesValue());
    result.innerText = isNaN(valueInCm) ? "Hibás adat!" : valueInCm.toFixed(2);
}

function clearOutField() {
    result.innerText = '';
};

const initArray = [
    { element: convertBtn, event: 'click', action: showResult },
    { element: inputFeet, event: 'change', action: clearOutField },
    { element: inputInches, event: 'change', action: clearOutField }
];

function addEvent(array) {
    array.forEach((item) => item.element.addEventListener(item.event, item.action));
};

(function initConverter() {
    addEvent(initArray);
    clearOutField();
})();