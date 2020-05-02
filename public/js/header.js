$(document).ready(function () {

    // this gets the uname of the logged user. ("Guest" if no one's logged in).
    // useful for validations for when a user is logged in or not.
    var helloname = $(this).find('#helloname');
    var hellonametext = $(helloname).text(); 

    //if someone is logged in
    if(hellonametext != "Guest"){
        $("#header-login").css("visibility", "hidden");
        $("#header-register").css("visibility", "hidden");
        $("#hello-uname").prop("disabled", false);

    }
    //else (no one is logged in ("Guest"))
    else{
        $("#header-login").css("visibility", "visible");
        $("#header-register").css("visibility", "visible");
        $("#hello-uname").prop("disabled", true);

        $("#hello-uname").click(function(){
            alert("You need to be logged in.");
        });

    }

})