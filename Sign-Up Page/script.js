$(document).ready(function(){
  $("#submit").click(function(){
    console.log("in");
    let store = {};
    let Username = document.getElementById("yourusername").value;
    let Password = document.getElementById("yourpassword").value;
    let Conpassword = document.getElementById("yourconfirmpassword").value;
    let AccountType = document.getElementById("select").value;
    store = {Username, Password, AccountType};

    if (Conpassword == Password){
      CallAJAX("https://localhost:7156/Signup", store, "POST", "html", SubmitDone, Error);
    }
    else{
      document.getElementById("test").innerHTML = "Passwords dont match :(";
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

  function SubmitDone(ret){
    document.getElementById("test").innerHTML = JSON.parse(ret).message;
    if (JSON.parse(ret).success == true){
      console.log("in");
      window.location.href = "../Project Homepage/index.html";
    }
  }
});