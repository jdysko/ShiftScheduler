/**
 * Created by Jedrek on 2016-04-18.
 */
var ShiftLink = React.createClass({
    render: function () {
        return ( <div className="shiftLink">shiftlink</div>);
    }
});
var gridDay = React.createClass({
    render: function () {

        return (
            <td>gridDay: {this.props.gridList.dayNo}</td>

        )
    }
});
var weekDays = React.createClass({
    render: function () {
        return (
            <tr>
                <th>Mon</th>
                <th>Tue</th>
                <th>Wed</th>
                <th>Thu</th>
                <th>Fri</th>
                <th>Sat</th>
                <th>Sun</th>
            </tr>
        )
    }
});
var gridRow = React.createClass({
    render: function () {
        var days = [];

        this.props.days.forEach(function (dayNo) {
            days.push(<gridDay dayNo={dayNo}></gridDay>);
        });

        return (
            <tr>{days}</tr>
        )
    }
});
var grid = React.createClass({
    render: function () {
        var rows = this.props.dayRows;

        return (
            <table>
                <tbody>
                <weekDays/>
                {rows}</tbody>
            </table>
        )
    }
});

var ssWrapper = React.createClass({
    render: function () {
        return (
            <div id="ssWrapper">
                <grid ></grid>
            </div>
        )
    }
});
var source = [];
ReactDOM.renderComponent(<ssWrapper gridList={source}/>, document.getElementByID("ssWrapper"));