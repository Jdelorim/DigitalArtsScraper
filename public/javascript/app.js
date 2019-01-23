"use strict";


$(document).ready(function () {
    $(".sidenav").sidenav();
    $(".modal").modal();

    // $(".modal-trigger").on('click', function(){
    //     var comments = $('#mycomments').val().trim();
    //     console.log('comments', comments);
    // });
   
    
    $(".checkArticles").each(function () {
        var target = $(this).attr("data-target");
       
        if (target === "true") {
            $(this).show().children().show(); 
            var headline = $(this).find('h4').text();
        //    console.log('headline:', headline);

           $(".modal-trigger").on('click', function(){
           
            
               $('.commentBtn').on('click', function(){
                var storeID = $(this).attr("newid");
                var saveme = true;
                var saveIdasString = storeID.toString();
                console.log("saveIDasstring:", saveIdasString);
                var comments = $('#mycomments'+ saveIdasString).val().trim();
                console.log("comments:", comments);
                
       
                console.log("storeID-comment:", storeID);
        
                $.ajax({
                        method: "POST",
                        url: "/saveComment",
                        data: {
                            ID: storeID,
                            saveme: saveme,
                            comment: comments
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    })
                
               });
            
            $('.putHeadline').text(headline);
        });
            $('.deleteBtn').on('click', function(){
                var storeID = $(this).attr("data-target");
       
                console.log("storeID:", storeID);
        
                $.ajax({
                        method: "POST",
                        url: "/delfromsaved",
                        data: {
                            ID: storeID,
                            saveme: false
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    })
        
        
              
                $(this).hide().parent().hide().parent().hide();
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
                    ID: storeID,
                    saveme: true
                }
            })
            .catch(function (err) {
                console.log(err);
            })

    });



});