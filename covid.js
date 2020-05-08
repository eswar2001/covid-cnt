$(document).ready(function () {
    $(document).bind("contextmenu", function (e) {
        e.preventDefault();
    });
    $(document).keydown(function (e) {
        if (e.which === 123) {
            return false;
        }
    });
    eval(function (p, a, c, k, e, d) {
        e = function (c) {
            return c.toString(36)
        };
        if (!''.replace(/^/, String)) {
            while (c--) {
                d[c.toString(a)] = k[c] || c.toString(a)
            }
            k = [function (e) {
                return d[e]
            }];
            e = function () {
                return '\\w+'
            };
            c = 1
        };
        while (c--) {
            if (k[c]) {
                p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c])
            }
        }
        return p
    }('(3(){(3 a(){8{(3 b(2){7((\'\'+(2/2)).6!==1||2%5===0){(3(){}).9(\'4\')()}c{4}b(++2)})(0)}d(e){g(a,f)}})()})();', 17, 17, '||i|function|debugger|20|length|if|try|constructor|||else|catch||5000|setTimeout'.split('|'), 0, {}))
    var _India;
    var _D;
    $.getJSON("https://api.covid19india.org/data.json", function (data) {
        _D = data.cases_time_series;
        _India = data.statewise;
        data = ''
        for (var i in _India) {
            if (_India[i]["deltaconfirmed"] > 0) {
                data += ' <tr class="bg-danger">' +
                    '<td><a  data-toggle="modal" data-target="#' + _India[i]["state"].split(/\s/).join('') + '">' + _India[i]["state"] + '</a></td>' +
                    '<td>' + _India[i]["active"] + '</td>' +
                    '<td>' + _India[i]["confirmed"] + '</td>' +
                    '<td>' + _India[i]["deaths"] + '</td>' +
                    '<td>' + _India[i]["deltaconfirmed"] + '</td>' +
                    '<td>' + _India[i]["deltadeaths"] + '</td>' +
                    '<td>' + _India[i]["deltarecovered"] + '</td>' +
                    '<td>' + _India[i]["lastupdatedtime"] + '</td>' +
                    '<td>' + _India[i]["recovered"] + '</td>' +
                    '</tr>';
            } else {
                data += ' <tr class="bg-success">' +
                    '<td><a data-toggle="modal" data-target="#' + _India[i]["state"].split(/\s/).join('') + '">' + _India[i]["state"] + '</a></td>' +
                    '<td>' + _India[i]["active"] + '</td>' +
                    '<td>' + _India[i]["confirmed"] + '</td>' +
                    '<td>' + _India[i]["deaths"] + '</td>' +
                    '<td>' + _India[i]["deltaconfirmed"] + '</td>' +
                    '<td>' + _India[i]["deltadeaths"] + '</td>' +
                    '<td>' + _India[i]["deltarecovered"] + '</td>' +
                    '<td>' + _India[i]["lastupdatedtime"] + '</td>' +
                    '<td>' + _India[i]["recovered"] + '</td>' +
                    '</tr>';
            }
        }
        $("#covid").append(data);
        delete(data);
    });
    $.getJSON("https://api.covid19india.org/state_district_wise.json", function (data) {
        var _state = data;
        data = '';
        for (var i in _state) {
            data += '<div id="' + i.split(/\s/).join('') + '" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true"> <div class="modal-dialog" role="document"><div class="modal-content" style="text-justify: auto; text-align: center; align-items: center;align-self:center;"><div class="modal-header"> <h5 class="modal-title">' + i + '</h5></div>';
            data += '<div class="modal-body"><table class="table table-hover"><thead><tr><td>District</td><td>Confirmed</td></tr></thead><tbody>';
            for (var j in _state[i].districtData) {
                data += '<tr><td><strong style="color:#000000">' + j + '</strong>&nbsp;&nbsp;</td><td>' +
                    _state[i].districtData[j]["confirmed"] + '</td></tr>';
            }
            data += '</tbody></table></div><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div>';
        }
        $("#card-modal").append(data);
        delete(data);
    });
    $('.modal').modal();

});
window.onload = function () {

    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: false,
        theme: "dark2",
        title: {
            text: "Daily Confirmed "
        },
        axisY: {
            includeZero: false,
            title: "Confirmed On day"
        },
        axisX: {
            intervalType: "week",
            valueFormatString: "DD-MMM",
        },
        legend: {
            verticalAlign: "bottom",
            horizontalAlign: "center"
        },
        data: [{
            type: "column",
            indexLabelFontSize: 16,
            dataPoints: []
        }]
    });
    $.getJSON("https://api.covid19india.org/data.json", function (data) {
        _D = data.cases_time_series;
        for (var i in _D) {
            var s = _D[i]["date"];
            s += ",2020";
            chart.data[0].dataPoints.push({
                y: parseInt(_D[i]["dailyconfirmed"]),
                x: new Date(s)
            });
            chart.render();
        }
    });
    chart.render();
}