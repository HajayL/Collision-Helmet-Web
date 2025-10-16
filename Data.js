var target = "ws://test.mosquitto.org:8081";
var topic = "NAIT/CNT/M/Test";

var connectionText = $("#connection");
var aliveText = $("#alive");
var ledOn = $("#led_on");
var ledOff = $("#led_off");

var aliveTime = 0;
var connected = false;

connectionText.html("Disconnected");
connectionText.css("color", "Red");
aliveText.html(aliveTime + "s");

$().ready(() => {
  Connect();

  setInterval(() =>
  {
    if(!connected) { return; }
    aliveTime++;
    if(aliveTime > 60)
    {
      connectionText.html("Disconnected");
      connectionText.css("color", "Red");
      aliveText.css("color", "Red");
    }
    aliveText.html(aliveTime + "s");
  }, 1000);
});

function Action(action)
{
  console.log(action);

  switch(action)
  {
    case "Connect":
      connectionText.html("Connected");
      connectionText.css("color", "Lime");
      connected = true;
      aliveTime = 0;
      break;
    
    case "Disconnect":
      connectionText.html("Disconnected");
      connectionText.css("color", "Red");
      connected = false;
      aliveTime = 0;
      break;

    case "Alive":
      aliveTime = 0;
      aliveText.html("0s");
      aliveText.css("color", "Black");
      connectionText.html("Connected");
      connectionText.css("color", "Lime");
      break;
  }
}

function Connect()
{
  const client = mqtt.connect(target, {clean: true, connectTimeout: 60000, clientId: 'srv__NAIT_M', username: '', password: ''});
  client.subscribe(topic);

  client.on('message', function (topic, message) { Action(message.toString()); });

  ledOn.click(() => {
    client.publish(topic, "on");
  });

  ledOff.click(() => {
    client.publish(topic, "off");
  });
}