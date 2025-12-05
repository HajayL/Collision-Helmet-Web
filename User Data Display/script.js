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
      if(temp.userInfo[9][3] != undefined){
        document.getElementById("ax").innerHTML = (parseInt(temp.userInfo[9][2])*0.122/1000).toFixed(2);
        document.getElementById("ay").innerHTML = (parseInt(temp.userInfo[9][3])*0.122/1000).toFixed(2);
        document.getElementById("az").innerHTML = (parseInt(temp.userInfo[9][4])*0.122/1000).toFixed(2);
        document.getElementById("gx").innerHTML = parseInt(temp.userInfo[9][5]);
        document.getElementById("gy").innerHTML = parseInt(temp.userInfo[9][6]);
        document.getElementById("gz").innerHTML = parseInt(temp.userInfo[9][7]);
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
        document.getElementById("test").innerHTML = temp.userInfo[9];
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