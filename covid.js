$(document).ready(function () {
    var _India;
    var _D;
    $.getJSON("https://api.covid19india.org/data.json", function (data) {
        _D = data.cases_time_series;
        _India = data.statewise;
        data = ''
        for (var i in _India) {
            // console.log('hi');

            if (_India[i]["deltaconfirmed"] > 0) {
                data += ' <tr class="bg-danger">' +
                    '<td>' + _India[i]["state"] + '</td>' +
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
                    '<td>' + _India[i]["state"] + '</td>' +
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
        data = ''
        for (var i in _D) {
            data += '<div class="card border-primary mb-3"><div class="card-header">' + _D[i]["date"] + '</div><div class="card-body text-primary">' +
                '&nbsp;&nbsp;<span><strong>deceased on date: </strong></span>&nbsp;&nbsp;' + _D[i]["dailydeceased"] +
                ',&nbsp;&nbsp;<span><strong>confirmed on date:</strong></span>&nbsp;&nbsp;' + _D[i]["dailyconfirmed"] +
                ',&nbsp;&nbsp;<span><strong>recovered on date:</strong></span>&nbsp;&nbsp;' + _D[i]["dailyrecovered"] +
                ',&nbsp;&nbsp;<span><strong>total confirmed:  </strong></span>&nbsp;&nbsp;' + _D[i]["totalconfirmed"] +
                ',&nbsp;&nbsp;<span><strong>total deceased:   </strong></span>&nbsp;&nbsp;' + _D[i]["totaldeceased"] +
                ',&nbsp;&nbsp;<span><strong>total recovered:  </strong></span>&nbsp;&nbsp;' + _D[i]["totalrecovered"] +
                '</div>' + '</div>  ';
        }
        $("#covid-daily").append(data);
    });
});
