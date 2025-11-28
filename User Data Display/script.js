$(document).ready(function(){
  function fetchData() {
    console.log("in");
    let store = {};
    let urlParams = new URLSearchParams(window.location.search);
    let UserID = urlParams.get('id');
    store = {UserID};
    CallAJAX("https://localhost:7156/GetData", store, "POST", "html", SubmitDone, Error);
  } 

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
    let temp = JSON.parse(ret);
    document.getElementById("test").innerHTML = temp.userInfo;
    if(Object.keys(temp).length == 1){
      document.getElementById("test").innerHTML = document.getElementById("test").innerHTML +  "<br>No Data Available for this ID";
    }
  }

  setInterval(fetchData, 500);
});