$(document).ready(function () {



    function preloadFunc()
    {
        
       
        var isLoggedIn= true;

        // goes to homeController
        $.get('/getCurrentUser', {isLoggedIn: isLoggedIn}, function (result) {

            alert( $("#web-name").val() );
            if(result){
                $('#header-login').prop('hidden', true);
            }
            
        
        });

        // if($('#hello-uname').val() != "Guest"){
        //     alert($('#hello-uname').val());
        //     $('#header-login').prop('hidden', true);
        // }

       
       
    };

    window.onpaint = preloadFunc();

    $(document).onload(function(){
        alert( $("#web-name").val() );
    });


    



})