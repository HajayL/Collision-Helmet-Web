$(document).ready(function(){
  let urlParams = new URLSearchParams(window.location.search);
  let uID = urlParams.get('id');

  CallAJAX("https://localhost:7156/GetCode", {UserID: uID}, "POST", "json", (resp) => {
    if(resp.success){
      $("#code").val(resp.code);
      $("#connectedTxt").html("Connected: " + resp.attached);
    }else{
      $("#connectedTxt").hide();
    }
  }, Error);

  $("#genCode").click(() => {
    CallAJAX("https://localhost:7156/GenerateCode", {UserID: uID}, "POST", "json", (resp) => {
      if(resp["success"]){
        $("#code").val(resp.code);
        $("#connectedTxt").html("Connected: 0");
      }
    }, Error);
  });

  $("#attachCodeBtn").click(() => {
    CallAJAX("https://localhost:7156/AttachCode", {UserID: uID, Code: $("#attachCode").val()}, "POST", "json", (resp) => {
      if(resp["success"]){
        $("#attachCode").val("Success");
      }else{
        $("#attachCode").val("Failure");
      }
    }, Error);
  });

  $("#dataDisplay").click(() => {
    window.location.href = "../User Data Display/index.html?id="+uID;
  });

  function SubmitDone(ret){
    //document.getElementById("test").innerHTML = JSON.parse(ret).message;
  }
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