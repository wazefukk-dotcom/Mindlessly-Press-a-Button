let presses = 0,
    ppp = 1,
    gold = 0,
    diamond = 0,
    autoSpeed = 333,
    pressesStat = document.getElementById("presses"),
    pppstat = document.getElementById("perClick"),
    goldstat = document.getElementById("gold"),
    diamondstat = document.getElementById("diamond"),
    button = document.getElementById("theButton");

function refresh() {
    pressesStat.innerHTML = "Presses: " + presses;
    pppstat.innerHTML = "Presses per Press: " + ppp;
    button.style.rotate = (presses % 360) + "deg";

    goldstat.innerHTML = "Gold: " + gold;
    diamondstat.innerHTML = "Diamond: " + diamond;

    if (goldstat.innerHTML == "Gold: 0")
        goldstat.style.display = "none";
    else
        goldstat.style.display = "block";

    if (diamondstat.innerHTML == "Diamond: 0")
        diamondstat.style.display = "none";
    else
        diamondstat.style.display = "block";
}

function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

let shop = {

    P1ppp: function () {
        if (presses >= 180) {
            presses -= 180;
            ppp++;
            refresh();
        }
    },

    P5ppp: function () {
        if (presses >= 500) {
            presses -= 500;
            ppp += 5;
            refresh();
        }
    },

    auto: async function () {
        if (presses >= 30000) {
            presses -= 30000;
            refresh();
            while (true) {
                await sleep(autoSpeed);
                presses += ppp;
                refresh();
            }
        }
    },

    getGold: function () {
        if (presses >= 440000) {
            presses -= 440000;
            gold++;
            refresh();
        }
    },

    autoBuyPresses: async function () {
        if (gold >= 3) {
            gold -= 3;
            refresh();
            while (true) {
                await sleep(autoSpeed);
                this.P1ppp();
            }
        }
    },

    autoBuyPresses_5: async function () {
        if (gold >= 13) {
            gold -= 13;
            refresh();
            while (true) {
                await sleep(autoSpeed);
                this.P5ppp();
            }
        }
    },

    autoBuyAuto: async function () {
        if (gold >= 50) {
            gold -= 50;
            refresh();
            while (true) {
                await sleep(autoSpeed);
                this.auto();
            }
        }
    },

    autoBuyGold: async function () {
        if (gold >= 100) {
            gold -= 100;
            refresh()
            while (true) {
                await sleep(autoSpeed);
                this.getGold();
            }
        }
    },

    fasterAutos: function () {
        if (autoSpeed == 0) {
            document.getElementById("FasterAutos").innerHTML = "Faster Autos (MAXED)";
            return;
        }
        if (presses >= 20e9) {
            presses -= 20e9;
            autoSpeed = Math.trunc((autoSpeed / 2) * 1.3);
            refresh();
        }
    },

    getDiamond: function () {
        if (gold >= 50000) {
            gold -= 50000;
            diamond++;
            refresh();
        }
    },

    GTP: function () {
        if (diamond >= 4) {
            diamond -= 4;
            presses += (gold * 440000);
            gold = 0;
            refresh();
        }
    },

    PTG: function () {
        if (diamond >= 4) {
            diamond -= 4;
            gold += (Math.trunc(presses / 440000));
            presses = 0;
            refresh();
        }
    },

    AABP: async function () {
        if (diamond >= 10) {
            diamond -= 10;
            refresh();
            while (true) {
                await sleep(autoSpeed);
                this.autoBuyPresses_5();
            }
        }
    }
}

window.addEventListener('keydown', function(e) {
    switch (e.key) {
        case '1':
            shop.P1ppp();
            break;
        case '2':
            shop.P5ppp();
            break;
        case '3':
            shop.auto();
            break;
        case '4':
            shop.autoBuyPresses();
            break;
        case '5':
            shop.autoBuyPresses_5();
            break;
        case '6':
            shop.autoBuyAuto();
            break;
        case '7':
            shop.getGold();
            break;
        case '8':
            shop.getDiamond();
            break;
    }
});

window.addEventListener('keydown', function(e) {
    if (e.key === ' ') {
        e.preventDefault();
    }
});

document.addEventListener('keyup', function (event) {
    if (event.key = "space") {
        presses += ppp;
        refresh();
    }
})

refresh();
