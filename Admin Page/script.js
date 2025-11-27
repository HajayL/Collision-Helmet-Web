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

    $("#submitrst").click(function(){
        console.log("in");
        let store = {};
        let Username = document.getElementById("yourresetusername").value;
        let OldPassword = '';
        let NewPassword = document.getElementById("yournewpassword").value;
        let Admin = true;
        store = {Username, OldPassword, NewPassword, Admin};

        CallAJAX("https://localhost:7156/ChangePass", store, "POST", "html", SubmitDone, Error);
    });

    $("#submitdel").click(function(){
        console.log("in");
        let store = {};
        let Username = document.getElementById("yourdeleteusername").value;
        let Password = '';
        let Admin = true;
        store = {Username, Password, Admin};

        CallAJAX("https://localhost:7156/Delete", store, "POST", "html", SubmitDone, Error);
    });

    function CallAJAX(url, postData, type, dataType, fxnSuccess, fxnError) {
        let ajaxOptions = {};
        ajaxOptions['url'] = url;
        ajaxOptions['data'] = JSON.stringify(postData);
        ajaxOptions['type'] = type;
        ajaxOptions['dataType'] = dataType;
        ajaxOptions['contentType'] = "application/json";
        let concorde = $.ajax(ajaxOptions);
        concorde.done(fxnSuccess);
        concorde.fail(fxnError);
    }

    function SubmitDone(ret){
        document.getElementById("test").innerHTML = JSON.parse(ret).message;
    }
});