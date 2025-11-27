$(document).ready(function(){
  $(".stadium").hide()
  $("#select").change(function(){
    console.log($("#select").val());
    if ($("#select").val() == "userteam"){
      $(".stadium").hide()
      $(".username").show()
      console.log($("#select").val());
    }
    else {
      $(".username").hide()
      $(".stadium").show()
      console.log($("#select").val());
    }
  });

  $("#submit").click(function(){
    CallAJAX("https://localhost:7156/GetData", store, "POST", "html", SubmitDone, Error);
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
    //document.getElementById("test").innerHTML = JSON.parse(ret).message;
  }
});