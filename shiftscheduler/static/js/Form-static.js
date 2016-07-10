var FormApp = FormApp || {};
fa = FormApp;

FormApp.Utils = {
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
    }
};

FormApp.StaticData = {
    tabs: ['tab1', 'tab2', 'tab3'],
    gridData: [
        {
            ID: 0,
            col1: 1,
            col2: 2
        },
        {
            ID: 1,
            col1: 'asd',
            col2: 'zxc'
        }
    ]

};

class Grids {

    constructor(f) {
        this.tabs = [];
        this.gridData = fa.StaticData.gridData;
        this.gridData.map(function (e) {
            console.log(e)
        });
        this.header = [];
        this.formReference = f;
        this.div = FormApp.Utils.DOMObject(f.div, 'div', 'gridDiv', '');
        this.tabsDiv = fa.Utils.DOMObject(this.div, 'div', 'tabsDiv', '');
        this.gridTable = fa.Utils.DOMObject(this.div, 'div', 'gridTable');
        this.loadGrid = function () {
            for (x in this.gridData.keys) {
                if (typeof x != undefined) {
                    var tr = new GridRow(this.gridTable, this.gridData[x])
                }
            }
        }
    }
}

Grids.prototype.getGrids = function () {
    return 0;
};

class GridRow {
    constructor(parent, rowData) {
        this.ID = rowData["ID"];
        this.header = parent.header;
        this.row = fa.Utils.DOMObject(parent.gridTable, 'tr', 'gridRow', 'gr_' + this.ID.toString());

        for (x in rowData.keys) {
            var td = fa.Utils.DOMObject(this.row, 'td', 'gridCell', '');
            td.innerHTML = rowData[x];
        }
    };

}
class Card {

    constructor(f) {
        this.formReference = f;
        this.Fields = [];
        this.Fields.parentReference = this;
        this.Vals = [];
        this.div = fa.Utils.DOMObject(f.div, 'div', 'cardDiv');
        this.fieldsTable = fa.Utils.DOMObject(this.div, 'table', 'fieldsTable');
        this.Fields.map(function (e) {
            var label = e[0];
            /*var type = fa.Utils.getFieldType(e[1]);*/
            var row = fa.Utils.DOMObject(this.parentReference.fieldsTable, 'tr', 'fieldsRow');
            var fieldTd = fa.Utils.DOMObject(row, 'td', 'fieldTd');
            var labelTd = fa.Utils.DOMObject(row, 'td', 'labelTd');
            var n = document.createTextNode(label)

        })
    };
}
class Subforms {
    constructor() {
        return 1;
    }

}
class Form {

    constructor(container) {
        this.div = fa.Utils.DOMObject(container, 'div', 'formDiv', '');
        this.div.parentReference = this;
        this.Grids = new Grids(this);
        /*  this.Card = new Card(this);
         this.Subforms = new Subforms(this);*/

    }
}

Form.prototype.init = function (container) {
    $(container).append(new Form(container));
};

Form.prototype.init();