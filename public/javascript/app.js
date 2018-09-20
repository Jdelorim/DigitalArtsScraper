$(document).ready(function(){
    //console.log('hi');
    var result;

    $(".sidenav").sidenav();
   

    $(".saveBtn").on("click", function() {
        var storeID = $(this).attr("data-target");
        //console.log("-----", storeID);
   

        
    $.ajax({
        method: "POST",
        url: "./saveID",
        data: {
            result: storeID
          }
      })
      .catch(function(err) {
        console.log(err);
      })

    });

});