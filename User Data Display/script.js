let currentData = {};
let lock = false;
let riskHigh = 0;

$("#dataDisplay").hide();

$(document).ready(function(){
  let urlParams = new URLSearchParams(window.location.search);
   let UserID = urlParams.get('id');

  function fetchData() {
    let store = {};
   
    store = {UserID};
    CallAJAX("https://localhost:7156/GetData", store, "POST", "json", SubmitDone, Error);
  } 

  $("#relateBtn").click(() => {
    window.location.href = "../User Relation/index.html?id="+UserID;
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

  
  function SubmitDone(resp){

    let data = resp.data;
    //console.log(data);

    let helmets = Object.keys(data);

    let selString = "<option value='None' disabled>None</option>";

    currentData = {};

    for(let i = 0; i < helmets.length; i++){
      selString += "<option value='" + helmets[i] + "'>" + helmets[i] + "</option>\n";

      currentData[helmets[i]] = {accelX: [], accelY: [], accelZ: [], gyroX: [], gyroY: [], gyroZ: [], temp: [], time: []};
    }

    $("#helmetSelect").html(selString);

    if(resp.success && helmets.length > 0){
      $("#dataDisplay").show();

      for(let h = 0; h < helmets.length; h++){
        for(let i = data[helmets[h]].length - 1; i >= 0; i--){
          currentData[helmets[h]].accelX[currentData[helmets[h]].accelX.length] = (parseInt(data[helmets[h]][i].accel.x)*0.976/1000).toFixed(2);
          currentData[helmets[h]].accelY[currentData[helmets[h]].accelY.length] = -(parseInt(data[helmets[h]][i].accel.y)*0.976/1000).toFixed(2);
          currentData[helmets[h]].accelZ[currentData[helmets[h]].accelZ.length] = (parseInt(data[helmets[h]][i].accel.z)*0.976/1000).toFixed(2);
          currentData[helmets[h]].gyroX[currentData[helmets[h]].gyroX.length] = (parseInt(data[helmets[h]][i].gyro.x)*0.07*(Math.PI/180)).toFixed(2);
          currentData[helmets[h]].gyroY[currentData[helmets[h]].gyroY.length] = (parseInt(data[helmets[h]][i].gyro.y)*0.07*(Math.PI/180)).toFixed(2);
          currentData[helmets[h]].gyroZ[currentData[helmets[h]].gyroZ.length] = (parseInt(data[helmets[h]][i].gyro.z)*0.07*(Math.PI/180)).toFixed(2);
          currentData[helmets[h]].temp[currentData[helmets[h]].temp.length] = (parseInt(data[helmets[h]][i].temp)/10).toFixed(1);
          currentData[helmets[h]].time[currentData[helmets[h]].time.length] = data[helmets[h]][i].time;
        }
      }
      
      DisplayData($("#helmetSelect").val());

    }else{
      $("#dataDisplay").hide();
    }

    /*
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
        let riskp = Percent()
        document.getElementById("risk").innerHTML = riskp + "%";

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
      */
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

  function GetRisk(index){
    let riskList = [];

    for(let i = 0; i < currentData[index].accelX.length; i++){
      let accel = Math.sqrt(Math.pow(currentData[index].accelX[i], 2) + Math.pow(currentData[index].accelY[i], 2) + Math.pow(currentData[index].accelZ[i], 2));
      let gyro = Math.sqrt(Math.pow(currentData[index].gyroX[i], 2) + Math.pow(currentData[index].gyroY[i], 2) + Math.pow(currentData[index].gyroZ[i], 2));

      riskList[riskList.length] = Percent(accel, gyro);
    }
    
    return riskList;
  }

  function DisplayData(index){
    let risks = GetRisk(index);

    let riskp = risks[risks.length - 1];

    if(riskp > riskHigh){
      riskHigh = riskp;
    }

    let risk = $("#riskDisplay");
    risk.html(riskHigh + "%");

    if(riskHigh <= 10){
      risk.css("color", "green");
    } 

    else if(riskHigh <= 25){
      risk.css("color", "orange");
    }

    else {
      risk.css("color", "red");
    }

    riskGraph.Plot(risks, currentData[index].time);
    tempGraph.Plot(currentData[index].temp, currentData[index].time);
    accelXGraph.Plot(currentData[index].accelX, currentData[index].time);
    accelYGraph.Plot(currentData[index].accelY, currentData[index].time);
    accelZGraph.Plot(currentData[index].accelZ, currentData[index].time);
    gyroXGraph.Plot(currentData[index].gyroX, currentData[index].time);
    gyroYGraph.Plot(currentData[index].gyroY, currentData[index].time);
    gyroZGraph.Plot(currentData[index].gyroZ, currentData[index].time);
  }

  fetchData();
  setInterval(fetchData, 5000);

});

