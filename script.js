let presses = 0,
    ppp = 1,
    gold = 0,
    diamond = 0,
    rainbow = 0,
    autoSpeed = 333,
    terminate = false;

let pressesStat = document.getElementById("presses"),
    pppstat = document.getElementById("perClick"),
    goldstat = document.getElementById("gold"),
    diamondstat = document.getElementById("diamond"),
    button = document.getElementById("theButton"),
    diamondShop = document.getElementById("diamondShop"),
    goldShop = document.getElementById("goldShop"),
    rainbowstat = document.getElementById("rainbow"),
    rainbowshop = document.getElementById("rainbowShop");

function refreshShops() {
    if (goldstat.innerHTML == "Gold: 0") {
        goldstat.style.display = "none";
        goldShop.style.display = "none";
    } else {
        goldstat.style.display = "block";
        goldShop.style.display = "block";
    }

    if (diamondstat.innerHTML == "Diamond: 0") {
        diamondstat.style.display = "none";
        diamondShop.style.display = "none";
    } else {
        diamondstat.style.display = "block";
        diamondShop.style.display = "block";
    }

    if (rainbowstat.innerHTML == "Rainbow: 0") {
        rainbowstat.style.display = "none";
        rainbowshop.style.display = "none";
    } else {
        rainbowstat.style.display = "block";
        rainbowshop.style.display = "block";
    }
}

function refreshMisc() {
    button.style.rotate = (presses % 360) + "deg";
}

function refreshCurrency() {
    pressesStat.innerHTML = "Presses: " + presses;
    pppstat.innerHTML = "Presses per Press: " + ppp;
    goldstat.innerHTML = "Gold: " + gold;
    diamondstat.innerHTML = "Diamond: " + diamond;
    rainbowstat.innerHTML = "Rainbow: " + rainbow;
}

// refreshes all
function refresh() {
    refreshShops();
    refreshCurrency();
    refreshMisc();
}

refresh();

function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

// TODO: Add increasing prices for all upgrades
let shop = {
    autocount: 0,
    autopressescount: 0,
    autopressescount_5: 0,
    autogoldcount: 0,
    autoautocount: 0,
    autoautopressescount: 0,
    p1pppcount: 0,
    p5pppcount: 0,
    goldcount: 0,
    fasterautoscount: 0,
    diamondcount: 0,
    PTGcount: 0,
    GTPcount: 0,
    autodiamondcount: 0,
    rainbowCount: 0,
    p1pppprice: 180,

    P1ppp: function () {
        if (presses >= this.p1pppprice) {
            presses -= this.p1pppprice;
            ppp++;
            this.p1pppcount++;
            this.p1pppprice = Math.round(this.p1pppprice * 1.15);
            document.getElementById("p1pppcounter").innerHTML = this.p1pppcount;
            document.getElementById("p1pppprice").innerHTML = '(' + this.p1pppprice + ')';
            refresh();
        }
    },

    P5ppp: function () {
        if (presses >= 500) {
            presses -= 500;
            ppp += 5;
            this.p5pppcount++;
            document.getElementById("p5pppcounter").innerHTML = this.p5pppcount;
            refresh();
        }
    },

    auto: async function () {
        if (presses >= 30000) {
            presses -= 30000;
            refresh();
            this.autocount++;
            document.getElementById("autocounter").innerHTML = this.autocount;
            if (this.autocount > 1) return;
            while (true) {
                if (terminate) break;
                await sleep(autoSpeed);
                presses += (ppp * this.autocount);
                refresh();
            }
        }
    },

    getGold: function () {
        if (presses >= 440000) {
            presses -= 440000;
            gold++;
            this.goldcount++;
            refresh();
            document.getElementById("buygoldcounter").innerHTML = this.goldcount;
        }
    },

    autoBuyPresses: async function () {
        if (gold >= 3) {
            gold -= 3;
            refresh();
            this.autopressescount++;
            document.getElementById("autobuypress1counter").innerHTML = this.autopressescount;
            if (this.autopressescount > 1) return;
            while (true) {
                if (terminate) break;
                await sleep(autoSpeed);
                for (let i = 0; i < this.autopressescount; i++)
                    this.P1ppp();
                refresh();
            }
        }
    },

    autoBuyPresses_5: async function () {
        if (gold >= 13) {
            gold -= 13;
            refresh();
            this.autopressescount_5++;
            document.getElementById("autobuypress5counter").innerHTML = this.autopressescount_5;
            if (this.autopressescount_5 > 1) return;
            while (true) {
                if (terminate) break;
                await sleep(autoSpeed);
                for (let i = 0; i < this.autopressescount_5; i++)
                    this.P5ppp();
                refresh();
            }
        }
    },

    autoBuyAuto: async function () {
        if (gold >= 50) {
            gold -= 50;
            refresh();
            this.autoautocount++;
            document.getElementById("autobuyautocounter").innerHTML = this.autoautocount;
            if (this.autoautocount > 1) return;
            while (true) {
                if (terminate) break;
                await sleep(autoSpeed);
                for (let i = 0; i < this.autoautocount; i++)
                    this.auto();
            }
        }
    },

    autoBuyGold: async function () {
        if (gold >= 100) {
            gold -= 100;
            this.autogoldcount++;
            document.getElementById("autobuygoldcounter").innerHTML = this.autogoldcount;
            refresh();
            if (this.autogoldcount > 1) return;
            while (true) {
                if (terminate) break;
                await sleep(autoSpeed);
                for (let i = 0; i < this.autogoldcount; i++)
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
            this.fasterautoscount++;
            document.getElementById("fasterautoscounter").innerHTML = this.fasterautoscount;
            refresh();
        }
    },

    getDiamond: function () {
        if (gold >= 50000) {
            gold -= 50000;
            diamond++;
            this.diamondcount++;
            document.getElementById("1diamondcounter").innerHTML = this.diamondcount;
            refresh();
        }
    },

    GTP: function () {
        if (diamond >= 4) {
            diamond -= 4;
            presses += (gold * 440000);
            gold = 0;
            this.GTPcount++;
            document.getElementById("GTPcounter").innerHTML = this.GTPcount;
            refresh();
        }
    },

    PTG: function () {
        if (diamond >= 4) {
            diamond -= 4;
            gold += (Math.trunc(presses / 440000));
            presses = 0;
            this.PTGcount++;
            document.getElementById("PTGcounter").innerHTML = this.PTGcount;
            refresh();
        }
    },

    AABP: async function () {
        if (diamond >= 10) {
            diamond -= 10;
            refresh();
            this.autoautopressescount++;
            document.getElementById("autoautobuypresscounter").innerHTML = this.autoautopressescount;
            if (this.autoautopressescount > 1) return;
            while (true) {
                if (terminate) break;
                await sleep(autoSpeed);
                for (let i = 0; i < this.autoautopressescount; i++)
                    this.autoBuyPresses_5();
            }
        }
    },

    autoBuyDiamond: async function () {
        if (diamond >= 100) {
            diamond -= 100;
            this.autodiamondcount++;
            document.getElementById("autobuydiamondcounter").innerHTML = this.autodiamondcount;
            refresh();
            if (this.autodiamondcount > 1) return;
            while (true) {
                if (terminate) break;
                await sleep(autoSpeed);
                for (let i = 0; i < this.autodiamondcount; i++)
                    this.getDiamond();
            }
        }
    },

    buyRainbow: function () {
        if (diamond >= 13000) {
            diamond -= 13000;
            rainbow++;
            this.rainbowCount++;
            document.getElementById("buyrainbowcounter").innerHTML = this.rainbowCount;
            refresh();
        }
    },

    funnel: function () {
        if (rainbow >= 30) {
            this.PTG();
            while (gold >= 50000)
                this.getDiamond();
            if (diamond >= 13000) {
                rainbow += Math.trunc(diamond / 13000);
                diamond = 0;
            }
            refresh();
        }
    }
};

let menu = {
    isActive: false,

    menuToggle: function () {
        this.isActive = !this.isActive;
        let menuelement = document.getElementById("menu");

        if (this.isActive)
            menuelement.style.display = "block";
        else
            menuelement.style.display = "none";
    },

    terminate: async function () {
        terminate = true;
        await sleep(500);
        terminate = false;
    }
};

window.addEventListener('keydown', function(e) {
    if (e.key === ' ')
        e.preventDefault();
});

document.addEventListener('keyup', function(e) {
    if (e.key == ' ') {
        presses += ppp;
        refresh();
    }
});

document.addEventListener('keyup', function(e) {
    if (e.key == 'Shift')
        menu.menuToggle();
});

document.addEventListener('keydown', function(e) {
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
            shop.getGold();
            break;
        case '5':
            shop.autoBuyPresses();
            break;
        case '6':
            shop.autoBuyPresses_5();
            break;
        case '7':
            shop.autoBuyAuto();
            break;
        case '8':
            shop.autoBuyGold();
            break;
        case '9':
            shop.getDiamond();
            break;
    }
});




