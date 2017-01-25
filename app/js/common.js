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
$('#myForm').validator({
    feedback: {
      success: 'fa fa-check-circle',
      error: 'fa fa-times-circle'
    }
});


$("form").submit(function(e) {
    var ths = $(this);
    if (e) {
        e.preventDefault();
    }
    $.ajax({
        type: "POST",
        url: "mail.php",
        data: $(this).serialize()
    }).done(function() {
        alert("Спасибо за взятку!");
        setTimeout(function() {
        //ths.trigger("reset");
        window.location.reload();
        // $("#section-register .has-success .glyphicon").addClass("hidden");
        // $(".select2-selection__rendered").addClass("hidden");
        //$("form")[0].reset();
        }, 500);
    });
    return false;
});


});/*ready*/
