// Mutassa az órát, percet, másodpercet
// Az óra a user által használt időzóna szerint jelenítse meg az időt
// Az óra 24 órás formátumot használjon minden esetben
// A színeket szabadon választhatod meg
// Az óra a képernyő közepén jelenjen, azaz meg mind vertikálisan, mind horizontálisan legyen középre igazítva minden nézetben
// A háttérszín pontosan 1 képernyő széles és magas legyen minden nézetben
// Használd a Cyberverse betűtípust
// A betűméretet te választhatod meg

const time = document.querySelector('.clock');

const displayTime = (timeString) => time.textContent = timeString;

(function watch() {
    timeNow = new Date();
    displayTime(timeNow.toTimeString('hu').slice(0, 8));
    setTimeout(watch, 1000);
})()