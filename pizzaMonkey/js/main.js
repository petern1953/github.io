const EGYSEGAR = 900;
const SZALLITASDIJA = 500;
let szallitasiKoltseg = SZALLITASDIJA;
const OSSZEGHATAR = 5000;
const DIJINFO = "5000 Ft feletti rendelésnél a kiszállítás költségét (500 Ft) mi álljuk.";
const DIJMESSAGE = "Figyelem! Az összeg 500 Ft-os házhoz szállítási díjat tartalmaz!";

function setDijinfo() {
    document.querySelector("small.message").innerHTML = DIJINFO;
}

function feltetPlus() {
    let feltetAr = 0;
    let nincsFeltet = document.querySelector("input#semmi");
    let sajtFeltet = document.querySelector("input#sajt");
    let duplaSajtFeltet = document.querySelector("input#duplaSajt");
    let duplaHusFeltet = document.querySelector("input#duplaHus");
    let duplaFeltet = document.querySelector("input#duplaFeltet");
    let valamiMasFeltet = document.querySelector("input#valamiMas");
    feltetAr = feltetAr + sajtFeltet.checked * sajtFeltet.value;
    feltetAr = feltetAr + duplaSajtFeltet.checked * duplaSajtFeltet.value;
    feltetAr = feltetAr + duplaHusFeltet.checked * duplaHusFeltet.value;
    feltetAr = feltetAr + duplaFeltet.checked * duplaFeltet.value;
    feltetAr = feltetAr + valamiMasFeltet.checked * valamiMasFeltet.value;
    return parseInt(feltetAr);
    // console.log(feltetAr);
}

function ontetPlus() {
    let ontetAr = 0;
    let ontetek = document.querySelector("select#szosz")
    let valasztottOntet = ontetek.selectedIndex;

    ontetAr = ontetek[valasztottOntet].value;
    return parseInt(ontetAr);
    // console.log(ontetAr);
}

function plusAr() {
    return feltetPlus() + ontetPlus();
    // console.log(alapAr + feltetPlus() + ontetPlus());
}

// Ellenőrzéssel korrigált darabszám. Hibás adat esetén 0
function darabSzam() {
    let darabSzam = parseInt(document.querySelector("input#mennyi").value);

    darabSzam = isNaN(darabSzam) ? 0 : darabSzam;

    if (darabSzam < 1) {
        alert("Minimum 1 terméket kell vásárolnia!");
        return 0;
    } else if (darabSzam > 10) {
        alert("Maximum 10 terméket vásárolhat!");
        return 0;
    } else {
        return darabSzam;
    }
}

/* ez volt
 function fizetendo() {
    let osszAr = (EGYSEGAR + plusAr()) * parseInt(darabSzam());
    let vegOsszeg = ((osszAr > 0) && (osszAr <= OSSZEGHATAR)) ? osszAr + SZALLITASIDIJ : osszAr;
    return vegOsszeg ;
} 
ez lett */
function fizetendo() {
    let osszAr = (EGYSEGAR + plusAr()) * parseInt(darabSzam());
    szallitasiKoltseg = (osszAr > OSSZEGHATAR) ? 0 : SZALLITASDIJA;
    return osszAr + szallitasiKoltseg ;
}

function arKiirasa() {
    let toShow = document.querySelector("span.summa");
    let vegOsszeg = fizetendo();
    toShow.innerHTML = vegOsszeg;
    szallitasiKoltseg ? document.querySelector("small.message").innerHTML = DIJMESSAGE : setDijinfo();
    } 

/* ez volt
function arKiirasa() {
    let toShow = document.querySelector("span.summa");
    let vegOsszeg = fizetendo();
    toShow.innerHTML = vegOsszeg;
    if (szallitasiKoltseg) {
        document.querySelector("small.message").innerHTML = DIJMESSAGE;
    } 
} */

function nevValidation() {
    let success = true;
    let megrendelo = document.querySelector("input#name").value;
    if (megrendelo.trim().length == 0) {
        alert("Kérem, töltse ki a mezőt, adja meg a nevét!");
        success = false;
    }
    return success;
}

function emailValidation() {
    let success = false;
    let email = document.querySelector("input#email").value;
    let atCharacter = email.indexOf("@");
    let dotCharacter = email.substring(atCharacter + 2).indexOf(".");
    if (atCharacter == -1) {
        alert("Az email-címből nem hiányozhat a @ karakter!");
    } else 
    if (dotCharacter == -1) {
        alert("Hibás email-cím!");
    } else {
        success = true;
    }
    return success;
}

function cimValidation() {
    let success = true;
    let cim = document.querySelector("input#address").value;
    if (cim.trim().length < 10) {
        alert("Kérem, adjon meg egy érvényes címet!");
        success = false;
    }
    return success;
}

function commentValidation() {
    let success = true;
    let comment = document.querySelector("textarea#comment").value;
    if (comment.length && (comment.indexOf("<") != -1 || comment.indexOf(">") != -1)) {
        alert("Kérem, ne használjon sem <, sem > karaktert!");
        success = false;
    }
    return success;
}

function validations() {
    let success = nevValidation() && emailValidation() && cimValidation() && commentValidation();
    return success;
}

function checkAndPrice() {
    if (validations()) {
        arKiirasa();
    }
}