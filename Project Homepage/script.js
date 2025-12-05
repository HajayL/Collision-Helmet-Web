$(document).ready(function(){
  $("#submit").click(function(){
    console.log("in");
    let store = {};
    let Username = document.getElementById("yourusername").value;
    let Password = document.getElementById("yourpassword").value;
    store = {Username, Password};

    CallAJAX("https://localhost:7156/Login", store, "POST", "html", SubmitDone, Error);
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
    if (JSON.parse(ret).id >= 0){
      window.location.href = "../User Data Display/index.html?id="+JSON.parse(ret).id
    }
    else{
      document.getElementById("test").innerHTML = JSON.parse(ret).message;
    }
  }
});