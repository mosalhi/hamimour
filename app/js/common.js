$(document).ready(function() {
    "use strict";
    console.log( "ready!" );

$(".carousel").carousel({
    interval:5000
});


$('#elastislide').elastislide({
    orientation : 'horizontal',
    speed : 700,
    easing : 'ease-in-out',
    minItems : 3,
    start : 0,
});
var slider = $('#bxslider');
slider.bxSlider({
  	  nextSelector: '#slider-next',
		  prevSelector: '#slider-prev',
		  nextText: '<img src="img/next.png" height="95" width="45"/>',
		  prevText: '<img src="img/prev.png" height="95" width="45"/>',
          onSliderLoad: function(){
             $("#siteslides").css("visibility", "visible");
          },
		  auto:true,
		  autoStart:true,
		  speed:1000
  });







});/*ready*/
