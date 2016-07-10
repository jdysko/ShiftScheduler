class FormData {
    constructor(image) {
        this.fd = image || {
                "tabSelected": 0,
                "sftabSelected": 0,
                "Grids": [],
                "Cards": [
                    {
                        "id": 0,
                        "Name": "",
                        "Header": [],
                        "SQLData": {}


                    }
                ],
                "SFGrids": [
                    {
                        "ID": 0,
                        "Name": "",
                        "Header": [],
                        "SQLData": {}
                    }
                ]

            };
        this.tabSelected = this.fd["tabSelected"];
        this.sftabSelected = this.fd["sftabSelected"];
        this.Grids = this.fd["Grids"];

        this.Cards = this.fd["Cards"];
        this.SFGrids = this.fd["SFGrids"];
        this.set = function (image) {
            this.FormData.fd = image;
        };
        this.getGridByID = function (k) {
            for (x in this.Grids.keys()) {
                if (this[x].id == k) {
                    return this[x];
                }
            }
        }
    }
}
var z = new FormData();
class EventInput {
    constructor() {
        this.eventInput = {
            "tabSelected": ""
        }
    }
}
EventInput.prototype.clearEventInput = function (key) {

    this.eventInput[key] = "";

};
EventInput.prototype.clearAllEventInput = function (key) {
    for (x in this.eventInput) {
        this.clearEventInput(x);
    }

};
EventInput.prototype.writeEventInput = function (key, val) {
    this.eventInput[key] = val;

};
EventInput.prototype.getEventInput = function () {
    EventInput.prototype.clearAllEventInput()

};
function requestData(dt) {

    return $.ajax({
        url: '/form',
        method: "GET",
        contentType: 'application/json; charset=utf-8',
        data: dt,
        success: function (data) {
            data = JSON.parse(data);
            return (data);
        }

    });
}

var Cell = React.createClass({
    render: function () {

        return (
            <td >{this.props.val}</td>
        );
    }
});
var GridRow = React.createClass({
    render: function () {
        var cells = [];

        var d = this.props.data;

        for (var x in d) {
            cells.push(<Cell val={d[x]}/>
            );
        }
        return (
            <tr id={d.id}>

                <RadioBtn  />
                {cells}

            </tr>
        );
    }
});


var RadioBtn = React.createClass({

    render: function () {

        return <input type="radio"/>;
    }


});


var KField = React.createClass({

    render: function () {

        return (<input type={this.props.type}/>);
    }

});

var Form = React.createClass({
    EventInput: new EventInput(),
    FormData: new FormData(),
    getInitialState: function () {

        return {

            tabSelected: 0,
            Grids: [],
            Cards: [],
            Subforms: []
        }
    },
    componentDidMount: function () {
        var dt = {
            route: "init"
        };

        this.serverRequest = $.ajax({
            url: '/form',
            method: "GET",
            contentType: 'application/json; charset=utf-8',
            data: dt,
            success: function (data) {
                data = JSON.parse(data);
                this.setState({
                    tabSelected: data.tabSelected,
                    Grids: data.Grids,
                    Cards: data.Cards,
                    Subforms: data.SFGrids
                });
            }.bind(this)

        });

    }
    , componentWillUnmount: function () {
        this.serverRequest.abort();
    },
    render: function () {

        return (
            <div id="form">

                <Grid Grids={this.state.Grids} tabSelected={this.state.tabSelected}/>
                { /*<FormSplitter Cards={this.state.FormData.Cards} SubForms={this.state.FormData.SFGrids}/>*/}
            </div>
        );
    }

});


var Grid = React.createClass({
    propTypes: {
        Grids: React.PropTypes.object
    },

    render: function () {
        var tabs = [];
        var grids = this.props.Grids;
        var grid = this.props.Grids[0];

        grids.map(function (e) {
            tabs.push(
                {
                    ID: e["ID"],
                    TabName: e["Name"]
                }
            )

        });

        return (<div className="Grid">
                {/*<div>{grid}</div>*/}

                <div className="tabsDiv"><TabBar tabs={tabs} tabSelected={this.props.tabSelected}/></div>
                {/*<div className="gridTable"><Table Grid={grid}/></div>*/}

            </div>
        );

    }
});
var TabBar = React.createClass({
    propTypes: {
        tabs: React.PropTypes.object,
        tabSelected: React.PropTypes.number
    },

    render: function () {
        var t = this.props.tabs;
        var tS = this.props.tabSelected;
        var tabs = [];
        var cN = "";
        t.map(function (x) {
                if (x["ID"] = tS) {
                    cN = "active";

                } else {
                    cN = "";
                }
                tabs.push(<TabBarBtn key={x["ID"]} cN={cN} Label={x["Name"]}/>);
            }
        );


        return (<div id="TabBar">
            <ul>{tabs}</ul>
        </div>);
    }
});

var TabBarBtn = React.createClass({
    propTypes: {
        cN: React.PropTypes.string,
        Label: React.PropTypes.string
    },
    onTabClick: function (evt) {
        return 1;
    },
    render: function () {
        var cN = "tabBarBtn" + this.props.cN.toString();

        return (<li onClick={this.onTabClick} className={cN}><a>{this.props.Label}</a></li>);

    }
});
var Table = React.createClass({
    propTypes: {
        Grid: React.PropTypes.object
    },
    render: function () {

        var h = this.props.Grid.hasOwnProperty("Header");
        var rows = [];
        /* this.props.grid.map(function (e) {
         rows.push(<GridRow data={e}/>);

         });*/

        return (
            <div>
                {/*this.props.grid*/}
                <table>
                    {h/* <Header header={[1,2,3]}/>*/}
                    <tbody>
                    {/*rows*/}
                    </tbody>
                </table>
            </div>
        );
    }

});
var Header = React.createClass({
        render: function () {
            var cols = [];
            cols.push(<th></th>);
            this.props.header.map(function (e) {
                cols.push(<th>{e.toString()}</th>);
            });
            return (
                <thead>
                <tr>{cols}</tr>
                </thead>);
        }
    }
);
/*var FormSplitter = React.createClass({
 render: function () {

 return (<div id="splitter">
 <Karta Cards={this.props.Cards}/>
 <SubForm Grids={this.props.Grids}/>
 </div>);
 }
 });
 var Karta = React.createClass({
 render: function () {
 var fields = [];
 var d = this.props.Cards;
 for (var x in d) {
 fields.push(<tr>
 <td> {x} </td>
 <td><KField type={d[x]}/></td>
 </tr>);

 }
 return (<div id="Karta">
 <table>{fields}</table>
 </div>);
 }
 });
 var SubForm = React.createClass({
 render: function () {
 return (
 <div id="SubformWrapper">
 <TabBar Grids={this.props}/>
 <Grid id="SfGrid" Grid={this.props}/>
 </div>);
 }

 });*/
ReactDOM.render(
    <div id="wrapper">
        <Form />

    </div>,
    document.getElementById('container')
);