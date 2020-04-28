$(document).ready(function () {


    // this gets 
    var helloname = $(this).find('#helloname');
    var hellonametext = $(helloname).text(); 


    if(hellonametext != "Guest"){
        $("#header-login").css("visibility", "hidden");
        $("#header-register").css("visibility", "hidden");
        $("#hello-uname").prop("disabled", false);

    }else{
        $("#header-login").css("visibility", "visible");
        $("#header-register").css("visibility", "visible");
        $("#hello-uname").prop("disabled", true);

        $("#hello-uname").click(function(){
            alert("You need to be logged in.");
          });

    }

    



})