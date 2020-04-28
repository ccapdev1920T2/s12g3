// import { ObjectId } from "mongodb";



$(document).ready(function () {

    /*
    TODO:   The code below attaches a `keyup` event to `#number` text field.
            The code checks if the current number entered by the user in the
            text field does not exist in the database.

            If the current number exists in the database:
            - `#number` text field background color turns to red
            - `#error` displays an error message `Number already registered`
            - `#submit` is disabled

            else if the current number does not exist in the database:
            - `#number` text field background color turns back to `#E3E3E3`
            - `#error` displays no error message
            - `#submit` is enabled
    */
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

    $('#reviews').on('click', '.upvote', function () {

        // reviewID contains the _id of that review useful for backend
        var revID = $(this).parent().find('.reviewID');
        var reviewID = $(revID).text(); 
        window.alert(reviewID);

        // $.get('/getIncrementVote', {reviewID: 123}, function(result) {
        //     alert("result: " + result);
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
        window.alert(reviewID);
      
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
    
    /*
    TODO:   The code below attaches a `click` event to `.remove` buttons
            inside the `<div>` `#contacts`.
            The code deletes the specific contact associated to the
            specific `.remove` button, then removes the its parent `<div>` of
            class `.contact`.
    */
    /*$('#reviews').on('click', '#remove', function () {
        // your code here
        var uInfo = $(this).parent().find('.text')[1];
        var uReview = $(uInfo).text();
        var parent = $(this).parent();
        $.get('/restaurant/delete/:reviewID', {reviewText: uReview}, function(result) {
            if (result){
                parent.remove();
            }
        })
    });*/

})
