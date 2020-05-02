$(document).ready(function () {

    // disables email, password, and cpassword initially. so the user needs to enter username first
    function preloadFunc()
    {
        $('#password').prop('disabled', true);
    };
    window.onpaint = preloadFunc();

    //disables submit button
    function disableSubmit(){
        $('#login').prop('disabled', true);
        $('#login').css('background', 'gray');
    }

    // enables submit button
    function enableSubmit(){
        $('#login').prop('disabled', false);
        $('#login').css('background', '#007bff');

    }

    function validUsername(usname)
    {
        var valid = true;
        if(usname.val() == '') 
        {
            valid = false;
            $('#username').css({
                        'border' : '1.5px solid #FF0000'
            })
            $('#erroruser').text('* username is required');
            disableSubmit();
        }
        else {
            var uname = usname.val();

            $('#errorpassword').text("");

            //goes to registerController.getCheckUsername to check if uname is already registed.
            $.get('/getCheckUsername', {uname: uname}, function (result) {
                if(result.uname == uname){

                    $('#username').css({
                        'border' : '1px solid #DDDDDD'
                    })
                    $('#erroruser').text("");

                    $('#password').prop('disabled', false);

                    disableSubmit(); //disables submit button
                    
                }else{
                    $('#username').css({
                        'border' : '1.5px solid #FF0000'
                    })
                    $("#erroruser").text('* Invalid Username');
                    valid = false;// sets to false because the email is not valid.

                    $('#password').prop('disabled', true);

                    if(areAllFilled() == true  ){
                        enableSubmit();//enables submit button
                    }
                }
            })

            
        }
        return valid;
    }

    function validPassword(pwname)
    {
        var valid = true;
        

        if(pwname.val() == '') 
        {
            valid = false;
            $('#password').css({
                        'border' : '1.5px solid #FF0000'
            })
            $('#errorpassword').text('* password is required');
            disableSubmit();
        }
        else {
            $('#password').css({
                        'border' : '1px solid #DDDDDD'
            })
            $('#errorpassword').text("");

            if(areAllFilled() == true){
                enableSubmit();
            }

            valid = true;
        }
        return valid;

    }

    //checks if all fields are filled up
    function areAllFilled(){

        var valid ;

        if($("#username").val() != '' && $("#password").val() != ''){
                // alert("true");
            valid = true;
        }else{
            valid = false;
        }
        return valid;
    }

    $('#username').keyup(function () {
        
        validUsername($("#username"));
    });

    $('#password').keyup(function () {
        
        validPassword($("#password"));
    });

})