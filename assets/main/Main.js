$(document).ready(function () {
    $.getJSON("https://api.covid19india.org/data.json", function (data) {
        _D = data.cases_time_series;
        _India = data.statewise;
        data = '';
        var active = 0;
        var confirmed = 0;
        var deaths = 0;
        var recovered = 0;
        for (var i in _India) {
            if (_India[i]["state"] === 'Total') {
                active = _India[i]["active"];
                confirmed = _India[i]["confirmed"];
                deaths = _India[i]["deaths"];
                recovered = _India[i]["recovered"];
                $('.stats').append(_India[i]["lastupdatedtime"]);
                $("#active").append(active);
                $("#confirmed").append(confirmed);
                $("#deaths").append(deaths);
                $("#recovered").append(recovered);
            } else {

                if (_India[i]["deltaconfirmed"] > 0) {
                    data += ' <tr >' +
                        '<td><a  data-toggle="modal" data-target="#' + _India[i]["state"].split(/\s/).join('') + '">' +
                        _India[i]["state"] + '</a></td>' +
                        '<td>' + _India[i]["active"] + '</td>' +
                        '<td>' + _India[i]["confirmed"] + '</td>' +
                        '<td>' + _India[i]["deaths"] + '</td>' +
                        '<td>' + _India[i]["recovered"] + '</td>' +
                        '</tr>';
                } else {
                    data += ' <tr >' +
                        '<td><a data-toggle="modal" data-target="#' + _India[i]["state"].split(/\s/).join('') + '">' +
                        _India[i]["state"] + '</a></td>' +
                        '<td>' + _India[i]["active"] + '</td>' +
                        '<td>' + _India[i]["confirmed"] + '</td>' +
                        '<td>' + _India[i]["deaths"] + '</td>' +
                        '<td>' + _India[i]["recovered"] + '</td>' +
                        '</tr>';
                }
            }
        }

        $("#covid").append(data);
        delete(data);
    });
    $.getJSON("https://api.covid19india.org/state_district_wise.json", function (data) {
        var _state = data;
        data = '';
        for (var i in _state) {
            data += '<div id="' + i.split(/\s/).join('') +
                '" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true"> <div class="modal-dialog" role="document"><div class="modal-content" style="text-justify: auto; text-align: center; align-items: center;align-self:center;"><div class="modal-header"> <h5 class="modal-title">' +
                i + '</h5></div>';
            data +=
                '<div class="modal-body"><table class="table table-hover"><thead><tr><td>District</td><td>Confirmed</td></tr></thead><tbody>';
            for (var j in _state[i].districtData) {
                data += '<tr><td><strong style="color:#000000">' + j + '</strong>&nbsp;&nbsp;</td><td>' +
                    _state[i].districtData[j]["confirmed"] + '</td></tr>';
            }
            data +=
                '</tbody></table></div><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div>';
        }
        $("#card-modal").append(data);
        delete(data);
    });
    $('.modal').modal();
    var dailyconfirmed = [];
    var dailydeceased = [];
    var dailyrecovered = [];
    var totalconfirmed = [];
    var totalconfirmed = [];
    var totaldeceased = [];
    var totalrecovered = [];
    console.log("ready");
    var datadailyconfirmed = {
        labels: [],
        series: []
    };
    var optionsdailyconfirmed = {
        fullWidth: true,
        chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        },
    }


    var datadailydeceased = {
        labels: [],
        series: []
    };

    var optionsdailydeceased = {
        fullWidth: true,
        chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }
    }

    var datadailyrecovered = {
        labels: [],
        series: []
    };
    var optionsdailyrecovered = {
        fullWidth: true,
        chartPadding: {
            top: 0,
            right: 5,
            bottom: 0,
            left: 0
        }
    };
    var responsiveOptions = [
        ['screen and (max-width: 640px)', {
            seriesBarDistance: 5,
            axisX: {
                labelInterpolationFnc: function (value) {
                    return value[0];
                }
            }
        }]
    ];

    $.getJSON("https://api.covid19india.org/data.json", function (data) {
        _D = data.cases_time_series;
        var j = 1;
        var len = 0;
        for (var i in _D) {
            len++;
        }
        console.log(len);
        for (var i in _D) {
            // if (j > len / 2) {
            dailyconfirmed.push(parseInt(_D[i]["dailyconfirmed"]));
            dailydeceased.push(parseInt(_D[i]["dailydeceased"]));
            dailyrecovered.push(parseInt(_D[i]["dailyrecovered"]));
            // datadailyconfirmed.labels.push(j.toString());
            // datadailydeceased.labels.push(j.toString());
            // datadailyrecovered.labels.push(j.toString());
            totalconfirmed.push(parseInt(_D[i]["totalconfirmed"]));
            totaldeceased.push(parseInt(_D[i]["totaldeceased"]));
            totalrecovered.push(parseInt(_D[i]["totalrecovered"]));

            // }

            j++;
        }
        datadailyconfirmed.series.push(dailyconfirmed);
        datadailydeceased.series.push(dailydeceased);
        datadailyrecovered.series.push(dailyrecovered);
        render(datadailyconfirmed, optionsdailyconfirmed, datadailydeceased, optionsdailydeceased,
            datadailydeceased, optionsdailydeceased);
    });
});