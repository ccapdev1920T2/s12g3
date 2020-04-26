$(document).ready(function () {

    function validUsername(usname, val)
    {
    var valid = val;
        if(usname.val() == '') 
        {
            valid = false;
            $('#username').css({
                        'border' : '1.5px solid #FF0000'
            })
            $('#erroruser').text('* username is required');
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
                }else{
                    $('#username').css({
                        'border' : '1px solid #DDDDDD'
                    })
                    $('#erroruser').text("");
                }
            })

            
        }
        return valid;
    }
    
    function validEmail(emlname, val)
    {
    var valid = val;
        if(emlname.val() == '') 
        {
            $('#email').css({
                        'border' : '1.5px solid #FF0000'
            })
            $("#erroremail").text('* email is required');
            valid = false; // sets to false because the email is not valid.
        }
        else{
            var email = emlname.val();

            //goes to registerController.getCheckEmail to check if email is already registed.
            $.get('/getCheckEmail', {email: email}, function (result) {

                if(result.email == email){
                    $('#email').css({
                        'border' : '1.5px solid #FF0000'
                    })
                    $("#erroremail").text('* email is already registered in the system.');
                    valid = false;// sets to false because the email is not valid.
                }
                else{

                     $('#email').css({
                        'border' : '1px solid #DDDDDD'
                    });
                    $('#erroremail').text("");

                }
            
            })

        }

        return valid;
    }
    
    function validPassword(pwname, val)
    {
    var valid = val;
        if(pwname.val() == '') 
        {
            valid = false;
            $('#password').css({
                        'border' : '1.5px solid #FF0000'
            })
            $('#errorpassword').text('* password is required');
        }
        else {
            $('#password').css({
                        'border' : '1px solid #DDDDDD'
            })
            $('#errorpassword').text("");
        }
        return valid;
    }
    
    function validCPassword(cpwname, val)
    {
    var valid = val;
        if(cpwname.val() == '') 
        {
            valid = false;
            $('#cpassword').css({
                        'border' : '1.5px solid #FF0000'
            })
            $('#errorcpassword').text('* confirmed password is required');
        }
        else {
            $('#cpassword').css({
                        'border' : '1px solid #DDDDDD'
            })
            $('#errorcpassword').text("");
        }
        return valid;
    }
    

    // function checkEmail(chkemail, val) {
    //     var valid = val;
    //     var atIndex = chkemail.val().indexOf('@');
    //     var dotIndex = chkemail.val().lastIndexOf('.');

    //     if(atIndex == -1 || dotIndex == -1 || atIndex > dotIndex) {
    //         valid = false;
    //         $('#email').css({
    //                     'border' : '1.5px solid #FF0000'
    //         })
    //         $("#erroremail").text('* Invalid email format');
    //     }
    //     else {
    //         $('#email').css({
    //                     'border' : '1px solid #DDDDDD'
    //         })
    //         $('#erroremail').text("");
    //     }
    //     return valid;
    // }


    
    
    function passwordEqual(pword, cpword, val) {
        var valid = val;

        if(pword.val() != cpword.val()) {
            valid = false;
            $('#password').css({
                        'border' : '1.5px solid #FF0000'
            })
            $('#cpassword').css({
                        'border' : '1.5px solid #FF0000'
            })
            $('#errorcpassword').text('* password and confirmed password do not match');
        } 
        return valid;
    }
    
    $("#signup").click(function(){
        valid = true;
        var valid1 = validUsername($("#username"), valid);
        var valid2 = validEmail($("#email"), valid);
        var valid3 = validPassword($("#password"), valid);
        var valid4 = validCPassword($("#cpassword"), valid);
        //     if (valid) {
        //     valid = checkEmail($("#email"), valid);
        //     }
        var valid5 = passwordEqual($("#password"), $("#cpassword"), valid);
            // if (valid == false )
            // {
            //     event.preventDefault();
            // }

        
    });

    /*$("#signup").click(function(event){
        event.preventDefault();
        if ( !(validUsername()
            && validEmail()
            && validPassword()
            && validCPassword()
            && checkEmail()
            && passwordEqual() ))
        {
            event.preventDefault();
        }
    });*/



 
 



})