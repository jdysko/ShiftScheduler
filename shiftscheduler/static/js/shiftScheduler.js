/**
 * Created by Jedrek on 2016-03-29.
 */
var shiftScheduler = shiftScheduler || {};
ss = shiftScheduler;


class Shifts {
    constructor(args) {
        this.sW = document.getElementById('shiftsWrapper');
        this.timeline_bot = ss.Utils.DOMObject(this.sW, 'div', 'timeline_bot');
        /*this.gW = ss.Utils.DOMObject(this.sW,'div',id='gridWrapper');*/
        this.DaysBar = ss.Utils.DOMObject(this.sW, 'div', id = 'DaysBar');
        this.GridFields = [];
        this.drawGrid = function (dateStart) {

            for (var i = 0; i < 9; i++) {
                for (x in this.timeline_bot.children) {

                    var a = ss.Utils.DOMObject(div, 'a', "shiftBtn", "shift_" + element.pID_Shifts);
                }
            }
        };
        this.loadShifts = function (element) {


            var div = ss.Utils.DOMObject(this.timeline_bot, 'div', "shift");
            var a = ss.Utils.DOMObject(div, 'a', "shiftBtn", "shift_" + element.pID_Shifts);
            var hS = element.HourStart;
            var hE = element.HourEnd;
            a.innerHTML = hS + " - " + hE;
            $(a).bind('click', ss.Events.shiftBtnClick);
            var w = 8;
            console.log(w);
            w = w * 100 / 24;
            div.style.width = String(w) + "%";
        }


    }
}
Shifts.prototype.load = function (dateSelected) {
    var d = new Date(r[2], r[3], r[4]);


};
Shifts.prototype.draw = function (shiftsList) {

    ss.Utils.removeChildren(this.timeline_bot);
    for (x in shiftsList) {
        if (shiftsList[x].hasOwnProperty('SessionParams') != 1) {
            this.loadShifts(shiftsList[x]);
        }


    }
};

class Days {
    constructor() {
        this.sW = document.getElementById('shiftsWrapper');


    }
}

class Personel {
    constructor(args) {
        this.pW = document.getElementById('personelWrapper');
        this.pW.addPersonelTab = function (element) {
            var f = shiftScheduler.Utils.DOMObject;
            var div = f(this, 'div', 'personeltab');
            var imgdiv = f(div, 'div', 'imgdiv');
            var descdiv = f(div, 'div', 'shiftDesc');
            var btndiv = f(div, 'div', 'reserveBtnWrapper');
            var btn = f(btndiv, 'button', 'reserveBtn', 'reservePersonel_' + element.ID_ShiftsPersonel + '_' + element.ID_Personel);
            $(btn).bind('click', ss.Events.reserveBtnClick);
            btn.innerHTML = 'Reserve';
            imgdiv.innerHTML = element.NICEAccount
        }
    }
}
Personel.prototype.removeTabs = function () {

    ss.Utils.removeChildren(this.pW);
};
Personel.prototype.loadPersonel = function (personelList) {
    this.removeTabs();
    for (x in personelList) {
        if (personelList[x].hasOwnProperty('SessionParams') != 1) {
            this.pW.addPersonelTab(personelList[x]);
        }
    }
};


shiftScheduler.Events = {
    bindCalendarBtnClick: function () {
        $('.day-contents').bind('click', ss.Events.calendarBtnClick);
    },
    calendarBtnClick: function (e) {

        var d = e.target.offsetParent.classList.toString().split(' ');
        var r = "";
        for (x in d) {
            if (d[x].indexOf("calendar-day") != -1) {
                r = d[x];
                break;
            }
        }
        r = r.split('-');
        ss.Utils.calendarBtnActive(e.currentTarget);
        ss.Binder.Shifts.load(r);

    },
    reserveBtnClick: function (e) {
        e.preventDefault();
        el = e.target.id.split('_');
        dt = {
            'pID_ShiftsPersonel': el[1],
            'pID_Personel': "getSP:=userid"
        };
        ss.Utils.pushStateToSession(e);
        $.ajax({
            url: "reserve",
            contentType: 'application/json; charset=utf-8',
            data: dt,
            success: function (data) {
                data = JSON.parse(data);
                console.log(data);
                ss.Binder.Personel.loadPersonel(data);
            }
        });
    },
    shiftBtnClick: function (e) {

        var dt = {
            'pID_Shifts': this.id.split('_')[1]
        };
        ss.Utils.pushStateToSession(e);
        ss.Utils.setActive(e.currentTarget);
        $.ajax({
            url: "personel",
            contentType: 'application/json; charset=utf-8',
            data: dt,
            success: function (data) {
                data = JSON.parse(data);
                console.log(data);
                ss.Binder.Personel.loadPersonel(data);
            }
        });
    }
};

shiftScheduler.Utils = {
    DOMObject: function (parent, name, classN, id, type) {
        var DOMObj = document.createElement(name);
        if (type) {
            DOMObj.type = type;
        }

        DOMObj.className = classN || "";
        if (typeof id != 'undefined') {
            DOMObj.id = id || "";
        }
        parent.appendChild(DOMObj);
        return DOMObj;
    },
    pushStateToSession: function (e) {


    },
    setActive: function (element, removeFrom) {
        if (removeFrom != '' && typeof removeFrom != 'undefined') {

            if (removeFrom.classList.contains('active') == 1) {
                removeFrom.classList.remove('active');
            }
        }
        element.classList.add('active');
    },
    calendarBtnActive: function (element) {
        var rfa = document.getElementsByClassName('active');
        var rf = "";

        for (x in rfa) {
            if (typeof rfa[x] === 'object') {
                if (rfa[x].offsetParent.classList.contains('day')) {
                    rf = rfa[x];
                }
            }
        }
        ss.Utils.setActive(element, rf);
    },
    removeChildren: function (element) {
        while (element.hasChildNodes()) {
            element.removeChild(element.lastChild)
        }
    },
    createDatesArray: function (dateStart) {
        var r = [];


        return r;
    }
};
ss.Controls = {
    Grid: function () {

    }
};

class Binder {
    constructor() {
        this.Shifts = new Shifts();
        this.Personel = new Personel();
        ss.Binder = this;
    }
}
shiftScheduler.init = function () {
    b = new Binder();
};