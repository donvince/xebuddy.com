"use strict";
(function () {
    var defaultCurrencySettings = {
        "format": "0,0.00",
        "language": "en-gb",
        "denominations": [
            0.01,
            0.02,
            0.05,
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
    };

    var currencyIndex = [
        {
            "currency": "AUD",
            "name": "Australian Dollar",
            "format": "$0,0.00",
            "language": "en-au",
            "denominations": [
                0.01,
                0.02,
                0.05,
                0.10,
                0.20,
                0.50,
                1,
                2,
                5,
                10,
                20,
                50,
                100
            ]
        },
        {
            "currency": "BGN",
            "name": "Bulgarian Lev",
            "format": "0,0.00$",
            "language": "bg",
            "denominations": [
                0.01,
                0.02,
                0.05,
                0.10,
                0.20,
                0.50,
                1,
                2,
                5,
                10,
                20,
                50,
                100
            ]
        },
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
                0.01,
                0.02,
                0.05,
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

        // //template
        // {
        //     "currency": "",
        //     "name": "",
        //     "format": "0,0$",
        //     "language": "",
        //     "denominations": [
        //         5,
        //         10,
        //         20,
        //         50,
        //         100,
        //         200,
        //         500,
        //         1000,
        //         2000,
        //         5000,
        //         10000,
        //         20000
        //     ]
        // },




        // "": 1.4352,
        // "BGN": 1.9558,
        // "BRL": 3.5497,
        // "CAD": 1.423,
        // "CHF": 1.073,
        // "CNY": 7.31,
        // "CZK": 27.044,
        // "DKK": 7.4399,
        // "GBP": 0.85423,
        // "HKD": 8.2341,
        // "HRK": 7.53,
        // "HUF": 308.89,
        // "IDR": 14254.41,
        // "ILS": 4.1041,
        // "INR": 72.509,
        // "JPY": 117.74,
        // "KRW": 1246.9,
        // "MXN": 21.5845,
        // "MYR": 4.6938,
        // "NOK": 9.0563,
        // "NZD": 1.5033,
        // "PHP": 52.878,
        // "PLN": 4.4205,
        // "RON": 4.5117,
        // "RUB": 67.96,
        // "SEK": 9.7973,
        // "SGD": 1.5126,
        // "THB": 37.653,
        // "TRY": 3.5717,
        // "USD": 1.0617,
        // "ZAR": 14.9242


    ];

    var updateTable = function () {
        var tableBody = $("#data");
        tableBody.empty();

        var leftCurrency = $("#leftSelected").text();
        var rightCurrency = $("#rightSelected").text();

        var leftCurrencySettings = defaultCurrencySettings;
        var rightCurrencySettings = defaultCurrencySettings;

        for (var currency of currencyIndex) {
            if (currency.currency === leftCurrency) {
                leftCurrencySettings = currency;
            }
            if (currency.currency === rightCurrency) {
                rightCurrencySettings = currency;
            }
        }

        for (var i = 0; i < leftCurrencySettings.denominations.length; i++) {
            var to = fx(leftCurrencySettings.denominations[i]).from(leftCurrency).to(rightCurrency).toFixed(2);

            numeral.language(leftCurrencySettings.language);
            var fromFormatted = numeral(leftCurrencySettings.denominations[i]).format(leftCurrencySettings.format);

            numeral.language(rightCurrencySettings.language);
            var toFormatted = numeral(to).format(rightCurrencySettings.format);

            tableBody.append("<tr><td>" + fromFormatted + "</td><td>" + toFormatted + "</td></tr>");
        }
    };

    var updateDropdowns = function () {
        var ul = $("<ul />");
        for (var rate in fx.rates) {
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
} ());