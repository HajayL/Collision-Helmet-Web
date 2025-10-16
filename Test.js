import fs from 'fs';
import mqtt from 'mqtt';

const options = {
protocol: 'mqtts',
host: '354e093383a04b599092b335bddb950e.s1.eu.hivemq.cloud',
port: 8883,
ca: [fs.readFileSync('/path/to/ca.crt')],
cert: fs.readFileSync('/path/to/client.crt'),
key: fs.readFileSync('/path/to/client.key'),
};

const client = mqtt.connect(options);