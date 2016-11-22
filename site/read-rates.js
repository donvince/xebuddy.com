"use strict";
(function () {
    var from = [5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000, 50000];

    var updateTable = function (){
        var tableBody = $("#data");
        tableBody.empty();

        var leftCurrency = $("#leftSelected").text();
        var rightCurrency = $("#rightSelected").text();

        for(var i = 0; i < from.length; i++) {
            var to = fx(from[i]).from(leftCurrency).to(rightCurrency).toFixed(2);
            tableBody.append("<tr><td>" + from[i] + "</td><td>" + to + "</td></tr>");
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
        var headerId = "#" + column + "Selected";
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