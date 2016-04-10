var objShareThis = SHARETHIS.addEntry({
    title: document.title,
    summary: document.title
}, { button: false, offsetLeft: -276 });

$(document).ready(function() {

    $("#lnkShareEmail").click(function(event) {
        addthis_open(this, 'email', document.title, document.title);
        //$("#at16p").css("top", "240px");
        //$("#at16p").css("left", "900px");    
    });

    $("#lnkShareThis").click(function(event) {
        $("#stwrapper").css("top", "251px");
        $("#stwrapper").css("left", "787px");
        $("#stwrapper").css("visibility", "visible");
        $("#stframe").css("visibility", "visible");
        // $("#stframe").contents().find("#send_page").addClass("hidden");
    });

    $("#sharethis_0").css("display", "none");
    
    
    


    

});



  