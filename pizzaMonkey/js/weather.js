let hetiHomerseklet = 
    [ -2, 23.5, 27, 32, 23.4, 18, 14.2 ];
//  hétfő kedd szerda cs péntek szo vas

let fokHatarokTomb = [
    0, 15, 20, 25, 100
];
//   0,             15,           20,           25,       100
let ajanlatokTomb = [
    "forró csoki", "meleg tea", "finom süti", "fagyi", "jéghideg limonádé"
];

function displayAjanlat() {
    let het = document.querySelector("select#napok")
    let napIndex = het.selectedIndex;
    let napiHomerseklet = hetiHomerseklet[napIndex].toFixed(1)
    let napiAjanlat;
    let numberOfAjanlat = ajanlatokTomb.length;
    for (let i = 0; i < numberOfAjanlat; i++) {
        if (napiHomerseklet < fokHatarokTomb[i]) {
            napiAjanlat = ajanlatokTomb[i];
            break;
        }
    }
    document.querySelector("div.ajanlat span#homerseklet").innerHTML = napiHomerseklet + "°C";
    document.querySelector("p#ajanlat span").innerHTML = napiAjanlat;
};

function homersekletAtlag() {
    let osszeg = 0;
    for (let i = 0; i < hetiHomerseklet.length; i++) {
        osszeg += isNaN(hetiHomerseklet[i]) ? 0 : hetiHomerseklet[i] ;
    }
    let atlag = osszeg / hetiHomerseklet.length;
    // console.log("Átlag: ", atlag);
    document.querySelector("div.hetiAtlag span").innerHTML = " " + atlag.toFixed(1);
}

function homersekletMin() {
    let min = isNaN(hetiHomerseklet[0]) ? 0 : hetiHomerseklet[0];
    for (let i = 0; i < hetiHomerseklet.length; i++) {
        // let napiHomerseklet = isNaN(hetiHomerseklet[i]) ? 0 : hetiHomerseklet[i]
        if (isNaN(hetiHomerseklet[i]) ? 0 : hetiHomerseklet[i] < min) {
            min = hetiHomerseklet[i];
        }
    }
    // console.log("Minimum: ", min);
    document.querySelector("div.hetiMin span").innerHTML = " " + min.toFixed(1);
}


function homersekletMax() {
    let max = isNaN(hetiHomerseklet[0]) ? 0 : hetiHomerseklet[0];
    for (let i = 0; i < hetiHomerseklet.length; i++) {
        if (isNaN(hetiHomerseklet[i]) ? 0 : hetiHomerseklet[i] > max) {
            max = hetiHomerseklet[i];
        }
    }
    // console.log("Maximum: ", max);
    document.querySelector("div.hetiMax span").innerHTML = " " + max.toFixed(1);
}

function displayStatisztika() {
    homersekletAtlag();
    homersekletMin();
    homersekletMax();
};

displayAjanlat();
displayStatisztika();