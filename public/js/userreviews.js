// import { ObjectId } from "mongodb";

$(document).ready(function () {

    
    
    
    
    $('#reviews').on('click', '.edit', function () {

        // stores the reviewID of the specific review
        var reviewID = $(this).parent().parent().parent().parent().parent().parent().find('.reviewID').text();

        // number of reviews
        var numReviews = $('#reviews').find('.reviewID').length;
        var reviewIDList = []; // initializes the reviewIDList

        //creates arrayList of the reviewID
        //to determine the index of the reviewID of the specific review
        for(i = 0; i<numReviews; i++){
            var indiv =  $("#reviews").parent().find('.reviewID')[i];
            reviewIDList[i] = $(indiv).text();
        }

        //index of the reviewID of the specific review
        var index = reviewIDList.indexOf(reviewID);

        // alert("index: " + index + "    reviewIDList: " +reviewIDList + "          reviewID: " + reviewID);

        
        var foodRatingInputID = $(this).parent().parent().parent().parent().parent().parent().find('.foodrate').text();
        var serviceRatingInputID = $(this).parent().parent().parent().parent().parent().parent().find('.servicerate').text();
        var environmentRatingInputID = $(this).parent().parent().parent().parent().parent().parent().find('.envrate').text();
        var reviewText = $.trim($(this).parent().parent().parent().parent().parent().parent().find('#review-text').text());
    
        // alert("reviewText: " + reviewText);


        document.querySelector('.bg-modal').style.display = 'flex';
        $("#modalfoodRatingInputID").prop("value", foodRatingInputID);
        $("#modalserviceRatingInputID").prop("value", serviceRatingInputID);
        $("#modalenvironmentRatingInputID").prop("value", environmentRatingInputID);
        $("#modalreviewText").prop("value", reviewText);
        $("#modalreviewID").prop("value", reviewID);

        $("#modalfoodRatingOutputID").html(foodRatingInputID);
        $("#modalserviceRatingOutputID").html(serviceRatingInputID);
        $("#modalenvironmentRatingOutputID").html(environmentRatingInputID);


      
    });

    
    


    //disable save button of edit review when reviewText is empty while typing
    $('#modalreviewText').keyup(function () {
        // alert($("#modalreviewText").val());
        if ($("#modalreviewText").val() == ""){
            $('.savebutton').prop("disabled", true);
            $('#modalerrorreview').text('* Please fill up the review field');
        }else{
            $('.savebutton').prop("disabled", false);
            $('#modalerrorreview').text('');
        }
    });

    // for close button ng modal edit review
    document.querySelector('#closeBtn').addEventListener('click', function(){
        document.querySelector('.bg-modal').style.display = 'none';
    });

    $('.savebutton').click(function(){
        // alert(window.location.href);

        var url = window.location.href;
        document.querySelector('.bg-modal').style.display = 'none';
        // window.location.reload(false); 
        
        // alert(url);

    // window.location.href = url.toString();

        
    });

    $('#reviews').on('click', '.upvote', function () {

        // reviewID contains the _id of that review useful for backend
        var revID = $(this).parent().find('.reviewID');
        var reviewID = $(revID).text(); 
        
        // window.alert("reviewID: " +reviewID);

        // $.get('/getIncrementVote', {reviewID: 123}, function(result) {
        //     // alert("result: " + result);
        //     alert("get from review.js");
        // });
        

        if ($(this).css("background-position") == "0px -25px")
        {

            $(this).css("background-position", "0px 2px");

            var reviewID = $(this).parents("#reviews-entry").find(".reviewID").text();

            $(this).parents("#updownvotes").find(".num-votes").text( parseInt( $(this).parents("#updownvotes").find(".num-votes").text() ) + 1 );

            if($(this).parent().find(".downvote").css("background-position") == "0px -30px")
            {
                $(this).parent().find(".downvote").css("background-position", "0px -2px");
                $(this).parents("#updownvotes").find(".num-votes").text( parseInt( $(this).parents("#updownvotes").find(".num-votes").text() ) + 1 );
            }
        }

        else if ($(this).css("background-position") == "0px 2px")
        {
           

            $(this).css("background-position", "0px -25px");
            $(this).parents("#updownvotes").find(".num-votes").text( parseInt( $(this).parents("#updownvotes").find(".num-votes").text() ) - 1 );
        }

        //var nvotes = parseInt( $(this).parents("#updownvotes").find(".num-votes").text() );
        // var nvotes = ("sampletext");

        

     });


    $('#reviews').on('click', '.downvote', function () {

        // reviewID contains the _id of that review useful for backend
        var revID = $(this).parent().find('.reviewID');
        var reviewID = $(revID).text(); 
        // window.alert(reviewID);
      
       if ($(this).css("background-position") == "0px -2px"){
           $(this).css("background-position", "0px -30px");

           var reviewID = $(this).parents("#reviews-entry").find(".reviewID").text();

           $(this).parents("#updownvotes").find(".num-votes").text( parseInt( $(this).parents("#updownvotes").find(".num-votes").text() ) - 1 );
           
           if($(this).parent().find(".upvote").css("background-position") == "0px 2px")
           {
             $(this).parent().find(".upvote").css("background-position", "0px -25px");
             $(this).parents("#updownvotes").find(".num-votes").text( parseInt( $(this).parents("#updownvotes").find(".num-votes").text() ) - 1 );
           }

           var votes = parseInt( $(this).parents("#updownvotes").find(".num-votes").text() );
       }

       else if ($(this).css("background-position") == "0px -30px")
       {
         $(this).css("background-position", "0px -2px");
         $(this).parents("#updownvotes").find(".num-votes").text( parseInt( $(this).parents("#updownvotes").find(".num-votes").text() ) + 1 );
       }

        var nvotes = parseInt( $(this).parents("#updownvotes").find(".num-votes").text() );
        //window.alert("nvotes: " + nvotes);

        $.post('/downvote', {votes: nvotes}, function(result) {
            if (result){
                window.alert("database affected");
            }
        })

     });

    $('#reviews').on('click', 'button[name="deletebtn"]', function () {
        var reviewID = $(this).parents("#reviews-entry").find(".reviewID").text();

        $(this).parents("#reviews-entry").remove();

    });





})
