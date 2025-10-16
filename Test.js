import fs from 'fs';
import mqtt from 'mqtt';

const options = {
protocol: 'mqtts',
host: 'https://test.mosquitto.org',
port: 8883,
ca: [fs.readFileSync('/path/to/ca.crt')],
cert: fs.readFileSync('/path/to/client.crt'),
key: fs.readFileSync('/path/to/client.key'),
};

const client = mqtt.connect(options);