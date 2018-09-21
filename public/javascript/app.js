$(document).ready(function(){
    $(".sidenav").sidenav();

/*
    $(".checkArticles").each(function() {
    if ($(this).attr("data-target") !== true ) {
    $(this).show().children().show();
    console.log(this);
    } else {
        $(this).hide();
    }
});
    */
   $(".checkArticles").each(function() {
       var target = $(this).attr("data-target");
       // console.log("target:", target );
        if(target === "true") {
            $(this).show().children().show();
        } else {
            $(this).hide();
        }
});
    
    $(".saveBtn").on("click", function() {
        var storeID = $(this).attr("data-target");
        console.log("storeID:", storeID);
        
    $.ajax({
        method: "POST",
        url: "/saveID",
        data: {
             body: storeID
          }
      })
      .catch(function(err) {
        console.log(err);
      })

    });

});