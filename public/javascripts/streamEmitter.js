$(document).ready(function(){
    $('*[data-field]').each(function(i,element) {
      var name = $(element).attr("data-field");
      setInterval(function(){
        $(document).trigger("data:"+name, Math.round(10000*Math.random()));
      }, 1000+Math.round(4000*Math.random()));
    });
  });

