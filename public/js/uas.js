$(document).ready(function () {
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
       
       var name = $('#name').val();
       var email = $('#email').val();
       var sex = $('#sex').val();
       var uaddress = $('#user_address').val();
       var ucuisine = $('#user_cuisine').val();
       var ulikes = $('#user_likes').val();
       var pword = $('#pword').val();
       var npword = $('#npassword').val();
       var cnpword = $('#cnpassword').val();

       if (rtext !== '') {
           $.post('/useraccountsetting', {uname: name, email: email}, function(result){
                $('#name').val('');
                $('#email').val('');
           });
       }
       else {
           $('#email').css({
                       'border' : '1.5px solid #FF0000'
           })
           $('#erroremail').text('* Please fill up the review field');
       }
    });

})
