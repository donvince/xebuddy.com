(function(){
    var x = new XMLHttpRequest();
    //x.open("GET", "http://download.finance.yahoo.com/d/quotes.csv?s=GBPHUF=X&f=sl1d1t1ba&e=.csv", true);
    //x.open("GET", "http://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml", true);
    x.open("GET", "http://api.fixer.io/latest", true);
    x.onreadystatechange = function (){
        if (x.readyState === 4 && x.status === 200) {
            var rates = x.responseText;
            alert(rates);
        }
    };
    x.send();
})();
