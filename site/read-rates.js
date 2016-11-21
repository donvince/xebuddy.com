"use strict";
(function () {
    var from = [5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000, 50000];

    $.getJSON("http://api.fixer.io/latest", function (data) {
        fx.rates = data.rates;

        var tableBody = $("#data");
        tableBody.empty();

        for(var i = 0; i < from.length; i++) {
            var to = fx(from[i]).from("HUF").to("GBP").toFixed(2);
            tableBody.append("<tr><td><h2>" + from[i] + "</h2></td><td><h2>" + to + "</h2></td></tr>");
        }
    });
}());