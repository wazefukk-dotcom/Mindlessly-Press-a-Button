let presses = 1241421240,
    ppp = 1124124124,
    gold = 124121240,
    diamond = 1241241420,
    rainbow = 4121241240,
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
    p5pppprice: 500,
    autoprice: 30000,
    fasterautosprice: 30e9,
    autobuypress1cost: 3,
    autobuypress5cost: 13,
    autobuyautocost: 50,
    autobuygoldcost: 100,
    gtpcost: 4,
    ptgcost: 4,
    aabpcost: 10,
    funnelcost: 30,

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
        if (presses >= this.p5pppprice) {
            presses -= this.p5pppprice;
            ppp += 5;
            this.p5pppcount++;
            this.p5pppprice = Math.round(this.p5pppprice * 1.15);
            document.getElementById("p5pppcounter").innerHTML = this.p5pppcount;
            document.getElementById("p5pppprice").innerHTML = '(' + this.p5pppprice + ')';
            refresh();
        }
    },

    auto: async function () {
        if (presses >= this.autoprice) {
            presses -= this.autoprice;
            refresh();
            this.autocount++;
            this.autoprice = Math.round(this.autoprice * 1.15);
            document.getElementById("autocounter").innerHTML = this.autocount;
            document.getElementById("autoprice").innerHTML = '(' + this.autoprice + ')';
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
        if (gold >= this.autobuypress1cost) {
            gold -= this.autobuypress1cost;
            refresh();
            this.autopressescount++;
            this.autobuypress1cost = Math.ceil(this.autobuypress1cost * 1.15);
            document.getElementById("autobuypress1cost").innerHTML = "(" + this.autobuypress1cost + ")";
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
        if (gold >= this.autobuypress5cost) {
            gold -= this.autobuypress5cost;
            refresh();
            this.autopressescount_5++;
            this.autobuypress5cost = Math.ceil(this.autobuypress5cost * 1.15);
            document.getElementById("autobuypress5cost").innerHTML = "(" + this.autobuypress5cost + ")";
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
        if (gold >= this.autobuyautocost) {
            gold -= this.autobuyautocost;
            refresh();
            this.autoautocount++;
            this.autobuyautocost = Math.ceil(this.autobuyautocost * 1.15);
            document.getElementById("autobuyautocost").innerHTML = "(" + this.autobuyautocost + ")";
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
        if (gold >= this.autobuygoldcost) {
            gold -= this.autobuygoldcost;
            this.autogoldcount++;
            this.autobuygoldcost = Math.ceil(this.autobuygoldcost * 1.15);
            document.getElementById("autobuygoldcost").innerHTML = "(" + this.autobuygoldcost + ")";
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
            document.getElementById("fasterautosprice").remove();
            return;
        }
        if (presses >= this.fasterautosprice) {
            presses -= this.fasterautosprice;
            autoSpeed = Math.trunc((autoSpeed / 2) * 1.3);
            this.fasterautoscount++;
            this.fasterautosprice = Math.round(this.fasterautosprice * 1.15);
            document.getElementById("fasterautoscounter").innerHTML = this.fasterautoscount;
            document.getElementById("fasterautosprice").innerHTML = "(" + this.fasterautosprice + ")";
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
        if (diamond >= this.gtpcost) {
            diamond -= this.gtpcost;
            presses += (gold * 440000);
            gold = 0;
            this.GTPcount++;
            document.getElementById("GTPcounter").innerHTML = this.GTPcount;
            refresh();
        }
    },

    PTG: function () {
        if (diamond >= this.ptgcost) {
            diamond -= this.ptgcost;
            gold += (Math.trunc(presses / 440000));
            presses = 0;
            this.PTGcount++;
            document.getElementById("PTGcounter").innerHTML = this.PTGcount;
            refresh();
        }
    },

    AABP: async function () {
        if (diamond >= this.aabpcost) {
            diamond -= this.aabpcost;
            this.autoautopressescount++;
            this.aabpcost = Math.ceil(this.aabpcost * 1.15);
            document.getElementById("aabpcost").innerHTML = "(" + this.aabpcost + ")";
            document.getElementById("autoautobuypresscounter").innerHTML = this.autoautopressescount;
            refresh();
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
        if (diamond >= this.autobuydiamondcost) {
            diamond -= this.autobuydiamondcost;
            this.autodiamondcount++;
            this.autobuydiamondcost = Math.ceil(autobuydiamondcost * 1.15);
            document.getElementById("autobuydiamondcost").innerHTML = "(" + this.autobuydiamondcost + ")";
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
        if (rainbow >= this.funnelcost) {
            this.PTG();
            while (gold >= 50000)
                this.getDiamond();
            if (diamond >= 13000) {
                rainbow += Math.trunc(diamond / 13000);
                diamond = 0;
            }
            this.funnelcost = Math.ceil(this.funnelcost * 1.15);
            document.getElementById("funnelcost").innerHTML = "(" + this.funnelcost + ")";
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




