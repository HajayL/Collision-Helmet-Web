$(document).ready(function(){
  function fetchData() {
    console.log("in");
    let store = {};
 
   let urlParams = new URLSearchParams(window.location.search);    let UserID = urlParams.get('id');
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
    document.getElementById("test").innerHTML = temp.userInfo[0][0];
    if(Object.keys(temp).length == 1){
      if(temp.userInfo[0][3] != undefined){
        document.getElementById("ax").innerHTML = temp.userInfo[0][3];
        document.getElementById("ay").innerHTML = temp.userInfo[0][4];
        document.getElementById("az").innerHTML = temp.userInfo[0][5];
        document.getElementById("gx").innerHTML = temp.userInfo[0][6];
        document.getElementById("gy").innerHTML = temp.userInfo[0][7];
        document.getElementById("gz").innerHTML = temp.userInfo[0][8];
        //let riskp = Percent()
        //document.getElementById("risk").innerHTML = riskp + "%";

        let risk = document.getElementById("risk");
        risk.style.color = "white";

        if(riskp <= 10){
          risk.style.backgroundColor = "green";
        } 

        else if(riskp <= 25){
          risk.style.backgroundColor = "orange";
        }

        else {
          risk.style.backgroundColor = "red";
        }
        $("#stat").show();
      }
      
      else{
        document.getElementById("test").innerHTML = document.getElementById("test").innerHTML +  "<br>No Data Available for this ID";
        $("#stat").hide();
      }
    }
  }

  function Percent(accel, gyro) {
    const b0 = -10.2;
    const b1 = 0.0433;
    const b2 = 0.000873;
    const b3 = -9.2e-7;

    const z = b0 + b1 * accel + b2 * gyro + b3 * accel * gyro;
    const final = 1 / (1 + Math.exp(-z));
    return (final * 100).toFixed(2);
  } 

  setInterval(fetchData, 500);
});