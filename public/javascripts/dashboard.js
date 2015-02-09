function bindElement (elementName, $element) {
    // change the value set in mixin to an updated value
    $element.text("N/A");

    $(document).on('data:'+elementName,function(event,dataValue){
      $element.text(dataValue);
    });
}

function findBindElements()  {
    // Step 1: Query for DOM elements to bing
    $( '*[data-field]' ).each(function(i,element) {
      //Step 2: Bind element, named data-field, from mixin
      bindElement($(element).attr("data-field"), $(element));
    });
}

$(document).ready(function() {
    findBindElements();
});


