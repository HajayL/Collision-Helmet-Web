$(document).ready(function(){
    $(".deletepassword").hide()
    $(".deleteusername").hide()
    $(".pin").hide()
    $(".deleteactions").hide()
    $("#select").change(function(){
        console.log($("#select").val());
        if ($("#select").val() == "changepass"){
            $(".deletepassword").hide()
            $(".deleteusername").hide()
            $(".pin").hide()
            $(".deleteactions").hide()
            $(".changepassword").show()
            $(".changeusername").show()
            $(".oldpin").show()
            $(".newpin").show()
            $(".changeactions").show()
            console.log($("#select").val());
        }
        else{
            $(".deletepassword").show()
            $(".deleteusername").show()
            $(".pin").show()
            $(".deleteactions").show()
            $(".changepassword").hide()
            $(".changeusername").hide()
            $(".oldpin").hide()
            $(".newpin").hide()
            $(".changeactions").hide()
            console.log($("#select").val());
        }
    });

    $("#submitrst").click(function(){
        console.log("in");
        let store = {};
        let Username = document.getElementById("yourresetusername").value;
        let OldPassword = document.getElementById("youroldpassword").value;
        let NewPassword = document.getElementById("yournewpassword").value;
        let Admin = false;
        store = {Username, OldPassword, NewPassword, Admin};

        CallAJAX("https://localhost:7156/ChangePass", store, "POST", "html", SubmitDone, Error);
    });

    $("#submitdel").click(function(){
        console.log("in");
        let store = {};
        let Username = document.getElementById("yourdeleteusername").value;
        let Password = document.getElementById("yourdeletepassword").value;
        let Admin = false;
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