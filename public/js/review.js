// import { ObjectId } from "mongodb";



$(document).ready(function () {


    // this gets the uname of the logged user. ("Guest" if no one's logged in).
    // useful for validations for when a user is logged in or not.
    var helloname = $(this).find('#helloname');
    var hellonametext = $(helloname).text(); 
    


    var unameReview = $("#reviews").parent().find('.entryheadername');
    var numReviews = unameReview.length; // stores how many reviews are there in the resto

    
    if(hellonametext == "Guest"){

        //disables upvote and downvote buttons if not logged it
        $("#reviews").parent().find('.upvote').prop("disabled", true);
        $("#reviews").parent().find('.upvote').css("cursor", "not-allowed");
        $("#reviews").parent().find('.downvote').prop("disabled", true);
        $("#reviews").parent().find('.downvote').css("cursor", "not-allowed");
        $('.upvote').prop('title', 'You need to be logged in to do this.');
        $('.downvote').prop('title', 'You need to be logged in to do this.');

            
        //disables add review form if not logged in
        $("#publish-button").prop("disabled", true);
        $("#foodRatingInputID").prop("disabled", true);
        $("#serviceRatingInputID").prop("disabled", true);
        $("#environmentRatingInputID").prop("disabled", true);
        $("#reviewText").prop("disabled", true);
        $("#errorreview").html("You need to log in to add a review.");



    }else{
        //enables upvote and downvote buttons if logged it
        $("#reviews").parent().find('.upvote').prop("disabled", false);
        $("#reviews").parent().find('.downvote').prop("disabled", false);
    }

    // START VALIDATIONS FOR EDIT AND DELETE BUTTON
    j=0; // for .entrydeadername
    for(i=0; i< numReviews; i++){
        // unameRText stores the uname of each review
        var unameR = $("#reviews").parent().find('.entryheadername')[j];
        var unameRText = $(unameR).text();
        j++; 

        

        // alert("numReviews: " + numReviews + "        i: " + i   + "    " +unameRText + "   " +  hellonametext);
        
        // if the uname (author) of the review is NOT EQUAL to the uname of current logged in.
        if(unameRText != hellonametext){

            $("#reviews").parent().find('.edit')[i].remove();
            $("#reviews").parent().find('.delete')[i].remove();

            numReviews--;
            i--;
        }
        //else (if the review author is the same as the one logged in)
        else if( unameRText == hellonametext){
        }
    }
    // END VALIDATIONS FOR EDIT AND DELETE BUTTON



    





   // FIXING
   /* $('#reviewText').keyup(function () {
        // your code here
        var rtext = $('#reviewText').val();

        $.get('/getCheckReview', {reviewText: rtext}, function(result){
            if (result.reviewText == rtext){
                $('#reviewText').css('background-color', 'red');
                $('#errorreview').text('Number already registered');
                $('#register-header').prop('disabled', true);
            }
            else {
                $('#reviewText').css('background-color', '#E3E3E3');
                $('#errorreview').text('');
                $('#register-header').prop('disabled', false);
            }
        })
    });*/

    /*
    TODO:   The code below attaches a `click` event to `#register-header` button.
            The code checks if both review fields are not empty. The code
            should communicate asynchronously with the server to save
            the information in the database.

            The new contact should be displayed immediately, and without
            refreshing the page, after the values are saved in the database.

            The food rating, service rating, enviroment rating  and the review fields are reset to empty values.
    */

    $('#register-header').click(function () {
       
       var frating = $('#foodRatingInputID').val();
       var srating = $('#serviceRatingInputID').val();
       var erating = $('#environmentRatingInputID').val();
       var rtext = $('#reviewText').val();

       if (rtext !== '') {
           $.post('/restaurant', {foodrate: frating, servicerate: srating, envrate: erating, reviewText: rtext}, function(result){
                $('#foodRatingInputID').val('');
                $('#serviceRatingInputID').val('');
                $('#environmentRatingInputID').val('');
                $('#reviewText').val('');
                $('#reviews').append(result);
           });
       }
       else {
           $('#reviewText').css({
                       'border' : '1.5px solid #FF0000'
           })
           $('#errorreview').text('* Please fill up the review field');
       }
    });

  

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

        // alert("outside the get");
        

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
