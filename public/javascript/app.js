$(document).ready(function () {
    $(".sidenav").sidenav();
    $(".modal").modal();

    $(".modal-trigger").on('click', function(){
        var comments = $('#comments').val().trim();
        console.log('comments', comments);
    });
   
    
    $(".checkArticles").each(function () {
        var target = $(this).attr("data-target");
       
        if (target === "true") {
            $(this).show().children().show(); 

            
           var headline = $(this).find('h4').text();
           console.log('headline:', headline);
           $(".modal-trigger").on('click', function(){
            var comments = $('#comments').val().trim();
            $('.putHeadline').text(headline);

            $('.deleteBtn').on('click', function(){
                $(this).hide();
            });
        });

        } else {
            $(this).hide();
        }
    });

    $(".saveBtn").on("click", function () {
        var storeID = $(this).attr("data-target");
        console.log("storeID:", storeID);

        $.ajax({
                method: "POST",
                url: "/saveID",
                data: {
                    body: storeID
                }
            })
            .catch(function (err) {
                console.log(err);
            })

    });

});