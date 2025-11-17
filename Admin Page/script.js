$(document).ready(function(){
    $("#deletepassword").hide()
    $("#arank").hide()
    $("#select").change(function(){
        console.log($("#select").val());
        if ($("#select").val() == "changepass"){
            $("#deletepassword").hide()
            $("#changepass").show()
            $("#arank").hide()
            console.log($("#select").val());
        }
        else if ($("#select").val() == "deleteaccount"){
            $("#deletepassword").show()
            $("#changepass").hide()
            $("#arank").hide()
            console.log($("#select").val());
        }
        else {
            $("#deletepassword").hide()
            $("#changepass").hide()
            $("#arank").show()
            console.log($("#select").val());
        }
    });
});