"use strict";
(function () {
    var from = [5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000, 50000];

    var currencyIndex = [
        {
            "currency": "HUF",
            "name": "Hungarian forint",
            "format": "0,0$",
            "language": "hu",
            "denominations": [
                5,
                10,
                20,
                50,
                100,
                200,
                500,
                1000,
                2000,
                5000,
                10000,
                20000
            ]
        },
        {
            "currency": "GBP",
            "name": "British Pound",
            "format": "$0,0.00",
            "language": "en-gb",
            "denominations": [
                0.1,
                0.2,
                0.5,
                0.10,
                0.20,
                0.50,
                1,
                2,
                5,
                10,
                20,
                50
            ]
        }
    ];

    var updateTable = function (){
        var tableBody = $("#data");
        tableBody.empty();

        var leftCurrency = $("#leftSelected").text();
        var rightCurrency = $("#rightSelected").text();

        var leftCurrencySettings;
        var rightCurrencySettings;

        for(var currency of currencyIndex) {
            if(currency.currency === leftCurrency) {
                leftCurrencySettings = currency;
            }
            if(currency.currency === rightCurrency) {
                rightCurrencySettings = currency;
            }
        }

        for(var i = 0; i < from.length; i++) {
            var to = fx(from[i]).from(leftCurrency).to(rightCurrency).toFixed(2);

            numeral.language(leftCurrencySettings.language);
            var fromFormatted = numeral(from[i]).format(leftCurrencySettings.format);

            numeral.language(rightCurrencySettings.language);
            var toFormatted = numeral(to).format(rightCurrencySettings.format);

            tableBody.append("<tr><td>" + fromFormatted + "</td><td>" + toFormatted + "</td></tr>");
        }
    };

    var updateDropdowns = function(){
        var ul = $("<ul />");
        for(var rate in fx.rates) {
            ul.append('<li><a href="#">' + rate + '</a></li>')
        }
        $("#left,#right").empty().append(ul.contents().clone());
    };

    $("#left,#right").click(function (e) {
        e.preventDefault();

        var column = $(this).attr("id");
        var currency = e.target.outerText;
        var selectedId = "#" + column + "Selected";
        var headerId = "#" + column + "Header";
        $(selectedId).text(currency);
        $(headerId).text(currency);
        
        updateTable();
    });

    $.getJSON("http://api.fixer.io/latest", function (data) {

        console.log(data);

        fx.rates = data.rates;
        fx.base = data.base;
        updateTable();
        updateDropdowns();
        
        $("#updated").text("Last updated: " + data.date);
    });
}());