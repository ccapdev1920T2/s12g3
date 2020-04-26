$(document).ready(function () {

    // disables email, password, and cpassword initially. so the user needs to enter username first
    function preloadFunc()
    {
        $('#email').prop('disabled', true);
        $('#password').prop('disabled', true);
        $('#cpassword').prop('disabled', true);
    };
    window.onpaint = preloadFunc();

    

    //disables submit button
    function disableSubmit(){
        $('#signup').prop('disabled', true);
        $('#signup').css('background', 'gray');


    }

    // enables submit button
    function enableSubmit(){
        $('#signup').prop('disabled', false);
        $('#signup').css('background', '#007bff');

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
            //goes to registerController.getCheckUsername to check if uname is already registed.
            $.get('/getCheckUsername', {uname: uname}, function (result) {
                if(result.uname == uname){
                    $('#username').css({
                        'border' : '1.5px solid #FF0000'
                    })
                    $("#erroruser").text('* username is taken');
                    valid = false;// sets to false because the email is not valid.

                    disableSubmit(); //disables submit button
                    
                }else{
                    $('#username').css({
                        'border' : '1px solid #DDDDDD'
                    })
                    $('#erroruser').text("");

                    $('#email').prop('disabled', false);

                    if(areAllFilled() == true  ){
                        enableSubmit();//enables submit button
                    }
                }
            })

            
        }
        return valid;
    }

    function validEmail(emlname)
    {
        var valid = true;

        if(emlname.val() == '') 
        {
            $('#email').css({
                        'border' : '1.5px solid #FF0000'
            })
            $("#erroremail").text('* email is required');
            valid = false; // sets to false because the email is not valid.

            disableSubmit();
        }
        else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emlname.val()) == false){
            valid = false; // sets to false because the email is not valid.
            $('#email').css({
                'border' : '1.5px solid #FF0000'
            })
            $("#erroremail").text('* invalid email format');

            disableSubmit();

        }
        else
        {
            var email = emlname.val();
            
            

            //goes to registerController.getCheckEmail to check if email is already registed.
            $.get('/getCheckEmail', {email: email}, function (result) {

                if(result.email == email){
                    $('#email').css({
                        'border' : '1.5px solid #FF0000'
                    })
                    $("#erroremail").text('* email is already registered in the system.');
                    valid = false;// sets to false because the email is not valid.

                    disableSubmit();
                }
                else{

                     $('#email').css({
                        'border' : '1px solid #DDDDDD'
                    });
                    $('#erroremail').text("");
                    valid = true;

                    
                    $('#password').prop('disabled', false);
                    $('#cpassword').prop('disabled', false);
                   

                    if(areAllFilled() == true ){
                        enableSubmit();
                    }

                }
            
            })

        }

        return valid;
    }

    // checks email format
    // used in function validEmail()
    function validateEmailFormat(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        // alert(re.test(String(email).toLowerCase()));
        return re.test(String(email));
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

            if(areAllFilled() == true && validCPassword($("#cpassword"))){
                enableSubmit();
            }

            valid = true;
        }
        return valid;

    }

    function validCPassword(cpwname)
    {
        var valid = true;

        if(cpwname.val() == '') 
        {
            valid = false;
            $('#cpassword').css({
                        'border' : '1.5px solid #FF0000'
            })
            $('#errorcpassword').text('* confirmed password is required');
            disableSubmit();
        }
        else if(cpwname.val() != $('#password').val()){
            valid = false;
            $('#password').css({
                        'border' : '1.5px solid #FF0000'
            })
            $('#cpassword').css({
                        'border' : '1.5px solid #FF0000'
            })
            $('#errorcpassword').text('* password and confirmed password do not match');
            disableSubmit();

        }
        else{
            $('#password').css({
                'border' : '1.5px solid #DDDDDD'
            })
            $('#cpassword').css({
                        'border' : '1px solid #DDDDDD'
            })
            $('#errorcpassword').text("");

            if(areAllFilled() == true ){
                enableSubmit();
            }
            valid = true;
        }
        return valid;
    }

    //checks if all fields are filled up
    function areAllFilled(){

        var valid ;

        // var validusername = validUsername($("#username"));
        // var validemail = validEmail($("#email"));
        // var validp = validPassword($("#password"));
        // var validcp = validCPassword($("#cpassword"));
    

        if($("#username").val() != '' && $("#email").val() != '' && $("#password").val() != '' && $("#cpassword").val() != '' 
            ){
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


    $('#email').keyup(function () {
        
        validEmail($("#email"));
    });

    $('#password').keyup(function () {
        
        validPassword($("#password"));
    });

    $('#cpassword').keyup(function () {
        
        validCPassword($("#cpassword"));
    });
 
 



})