/**
 * Created by Andrzej Dyśko on 2016-06-12.
 */


var shiftScheduler = shiftScheduler || {};
ss = shiftScheduler;

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
    createDiv: function (parent, classN, id) {
        return ss.Utils.DOMObject(parent, 'div', classN, id)
    },

    ajaxRequest: function (root, dt, success) {
        $.ajax({
            url: root,
            contentType: 'application/json; charset=utf-8',
            data: dt,
            success: success
        });
    },
    removeChildren: function (element) {
        while (element.hasChildNodes()) {
            element.removeChild(element.lastChild)
        }
    }

};
shiftScheduler.Objects = {

    Binder: function () {
        return document.getElementById('Binder').objectReference;
    },
    Weekdays: function () {
        this.wd = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

        return this.wd;
    },
    Months: function () {
        this.m = {
            0: "January", 1: "February", 2: "March", 3: "April"
            , 4: "May", 5: "June", 6: "July", 7: "August", 8: "September"
            , 9: "October", 10: "November", 11: "December"
        };
        return this.m;
    },
    Years: function () {
        this.y = [2014, 2015, 2016, 2017];
        return this.y;
    }
};
shiftScheduler.Events = {
    DayClicked: function (e) {
        var s = e.currentTarget;
        s = s.id.split('_');

        dt = {

            dayClicked: s[1],
            month: ss.Objects.Binder().Calendar.month,
            year: ss.Objects.Binder().Calendar.year
        };
        var data = {
            dayClicked: s[1],
            month: ss.Objects.Binder().Calendar.month,
            year: ss.Objects.Binder().Calendar.year
        };
        ss.Events.showReservationWindow(data);
        //ss.Utils.ajaxRequest('dayclicked',dt,ss.Events.showReservationWindow);

    },
    showReservationWindow: function (data) {
        //data = JSON.parse(data);
        var sb = ss.Objects.Binder();
        sb.ReservationWindow.show(data);
    }

};
class DateTab {
    constructor(parent) {
        this.div = ss.Utils.createDiv(parent.div, 'divDateTab');
        var s = '';
        var tab = ss.Objects.Months();
        for (var x in tab) {
            if (x == parent.month) {
                var tn = document.createTextNode(tab[x].toString() + ' ' + parent.year.toString());
                this.div.appendChild(tn);
            }

        }

    }
}
class DayTabs {
    constructor(p) {
        this.div = ss.Utils.createDiv(p, 'divDayTabs');
        var tab = ss.Objects.Weekdays();
        for (var x in tab) {
            var dt = ss.Utils.createDiv(this.div, 'div' + tab[x].toString());
            var w = 100 / 7;
            dt.style.width = w.toString() + '%';
            var tn = document.createTextNode(tab[x].toString());
            dt.appendChild(tn);
            dt.appendChild(tn);
        }
    }
}
class CalendarDay {
    constructor(parent, dayNo) {
        this.div = ss.Utils.DOMObject(parent, 'div', 'divCalendarDay', 'CalendarDay_' + dayNo.toString());
        var tn = document.createTextNode(dayNo.toString());
        this.div.appendChild(tn);
        $(this.div).on('click', ss.Events.DayClicked);
    }
}
class CalendarRow {

    constructor(parent, rowNo) {


        this.div = ss.Utils.createDiv(parent, 'divCalendarRow', 'CalendarRow_' + rowNo.toString());


    }

}

class Calendar {
    constructor() {
        this.div = ss.Utils.createDiv(ss.Objects.Binder().div, 'divCalendar', 'Calendar');
        this.divTable = ss.Utils.createDiv(this.div, 'divCalendarTable');

        var now = new Date();
        this.month = now.getMonth();
        this.year = now.getFullYear();

        this.DayTabs = Object.create(new DayTabs(this.div));
        this.drawGrid(this.month, this.year);
        this.DateTab = Object.create(new DateTab(this));
        this.div.insertBefore(this.DayTabs.div, this.divTable);
        this.div.insertBefore(this.DateTab.div, this.DayTabs.div);

    }
}

Calendar.prototype.drawGrid = function (month, year) {
    if (this.divTable.hasChildNodes) {
        ss.Utils.removeChildren(this.divTable);
    }
    month = month || 0;
    year = year || 0;
    if (year == 0 && month == 0) {
        var now = new Date();
        this.month = now.getMonth();
        this.year = now.getFullYear();
    }
    /*Drawing calendar grid*/
    /*prev month*/
    var pdim;
    switch (month) {
        case 0:
            var d = new Date(year - 1, 11, 0);
            pdim = d.getDate();
            break;
        default:
            pdim = new Date(year, month - 1, 0).getDate();
            break;
    }
    /*curr month*/
    var d2 = new Date(year, month, 0);
    var dim = new Date(year, month, 0).getDate();
    var fwd = new Date(year, month, 1).getDay();

    var i = Object.keys(ss.Objects.Weekdays()).length;
    var j = 4;
    var s = 1;
    var c = 1;

    for (var x = 0; x <= j; x++) {
        var cr = new CalendarRow(this.divTable, x);
        for (var z = 0; z < i; z++) {
            var dayNo;
            if (s == 1) {

                if (z + 1 == fwd || (z == 0 && fwd == 0)) {
                    dayNo = 1;
                    c = 1;
                    s = 0;
                }

                else {
                    dayNo = pdim - fwd + c;
                }
            } else if (c > dim) {

                c = 1;
                dayNo = c;
            }
            else {
                dayNo = c;
            }
            var cd = new CalendarDay(cr.div, dayNo);
            c++;
        }
    }

    console.log(dim)
};
class NavigationBar {
    constructor() {
        var tabY = ss.Objects.Years();
        var tabM = ss.Objects.Months();
        this.div = ss.Utils.createDiv(ss.Objects.Binder().div, 'divNavBar');
        this.ul = ss.Utils.DOMObject(this.div, 'ul', 'expList');

        for (var x = 0 in tabY) {
            var li_y = ss.Utils.DOMObject(this.ul, 'li', 'liNavBar', 'liYear_' + tabY[x].toString());
            var tn_y = document.createTextNode(tabY[x].toString());
            li_y.appendChild(tn_y);
            var ul_m = ss.Utils.DOMObject(li_y, 'ul', 'ulNavBar');

            for (var z = 0 in tabM) {
                var li_m = ss.Utils.DOMObject(ul_m, 'li', 'liNavBar', 'liMonth_' + z.toString() + '_' + tabY[x].toString());
                var tn_m = document.createTextNode(tabM[z].toString());
                li_m.appendChild(tn_m);
                $(li_m).on('click', function (e) {
                    var s = e.target.id.split('_');
                    var m = s[1];
                    var y = s[2];
                    ss.Objects.Binder().Calendar.drawGrid(parseInt(m), parseInt(y));
                })
            }

        }
        this.prepList = function () {
            $('.expList').find('li:has(ul)')
                .click(function (event) {
                    if (this == event.target) {
                        $(this).toggleClass('expanded');
                        $(this).children('ul').toggle('medium');
                    }
                    return false;
                })
                .addClass('collapsed')
                .children('ul').hide();
        };
        this.prepList();
    }
}
class SchedulerBinder {
    constructor(c) {
        this.div = ss.Utils.DOMObject(c, 'div', 'divBinder', 'Binder');
        this.div.objectReference = this;
        this.NavBar = Object.create(new NavigationBar());
        this.Calendar = Object.create(new Calendar());
        this.ReservationWindow = Object.create(new ReservationWindow(0));

    }

}
class ReservationWindowDay {
    constructor(parent, dayNo) {
        this.div = ss.Utils.DOMObject(parent, 'div', 'divReservationWindowDay', 'ReservationWindowDay' + dayNo.toString());
        var tn = document.createTextNode(dayNo.toString());
        this.div.appendChild(tn);
    }
}
class ReservationWindow {
    constructor(dayClicked) {
        this.dayClicked = dayClicked;
        this.divModal = ss.Utils.createDiv(document.body, 'divModal');
        this.div = ss.Utils.createDiv(this.divModal, 'divReservationWindow', 'Reserve_' + this.dayClicked.toString());


    }
}
ReservationWindow.prototype.drawShifts = function (data) {

    for (var x = 0; x < 4; x++) {
        Object.create(new ReservationWindowDay(this.div, x))
    }

};
ReservationWindow.prototype.show = function (data) {

    this.drawShifts(data);
    this.divModal.style.visibility = 'visible';
    this.divModal.style.display = 'block';
    $(window).on('click', function (e) {
        var dM = ss.Objects.Binder().ReservationWindow.divModal;
        if (e.target == dM) {
            dM.style.display = "none";
            dM.unbind(this);
        }
    })

};