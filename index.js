"use strict";

var locationBox = document.querySelector('#location');
var valueBox = document.querySelector('#valueBox');
var goButton = document.querySelector('#go');
var load = document.querySelector('.load');
var circles = document.querySelectorAll('.circle');
var tempVal = document.querySelector('#tempVal');
var humidVal = document.querySelector('#humidVal');

// Do not display the location and value initially

locationBox.style.display = 'none';
valueBox.style.display = 'none';
load.style.display = 'none';

var i = 0,Count =0;
setInterval(function(){
    i = i%4;
    if(i==0)
        ++Count;
    if(Count%2==0){
    circles[i].classList.remove('circle');
    circles[i].classList.add('circle2');
    }
    else if(Count%2 == 1)
    {
        circles[i].classList.remove('circle2');
        circles[i].classList.add('circle');
    }
    i++;
},400);


goButton.addEventListener('click',function()
{
    load.style.display = 'block';
    valueBox.style.display = 'none';
    var method = 'GET';
    var apiKey = '5095JDKYDVKOQZWZ';
    var url = 'https://api.thingspeak.com/channels/750970/feeds.json?api_key=' + apiKey + '&results=1';
    var http = new XMLHttpRequest();
    http.open(method,url);
    http.onreadystatechange = function(){
        load.style.display = 'none';
        locationBox.style.display = 'block';
        valueBox.style.display = 'block';
        if(http.readyState === XMLHttpRequest.DONE && http.status === 200)
        {
            var data = JSON.parse(http.responseText);
            tempVal.innerHTML = data['feeds'][0]['field1'] + '<sup>o</sup> C';
            humidVal.innerHTML = data['feeds'][0]['field2'] + '%';
        }
        else if(http.readyState === XMLHttpRequest.DONE)
        {
            alert('Something went Wrong\n Try Again');
        }
    }
    http.send();
});

