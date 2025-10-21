/*
const mqtt = require('mqtt');

var options = {
    host: '354e093383a04b599092b335bddb950e.s1.eu.hivemq.cloud',
    port: 8883,
    protocol: 'mqtts',
}

// initialize the MQTT client
var client = mqtt.connect(options);

// setup the callbacks
client.on('connect', function () {
    console.log('Connected');
});

client.on('error', function (error) {
    console.log(error);
});

client.on('message', function (topic, message) {
    // called each time a message is received
    console.log('Received message:', topic, message.toString());
});

// subscribe to topic 'my/test/topic'
client.subscribe('my/test/topic');

// publish message 'Hello' to topic 'my/test/topic'
client.publish('my/test/topic', 'Hello');
*/

import mqtt from 'mqtt';

const client = mqtt.connect('wss://354e093383a04b599092b335bddb950e.s1.eu.hivemq.cloud:8883', {
    // Optional: Add authentication details if required by your broker
    username: '',
    password: '',
    // Optional: Other connection options
    clean: true, // Set to true to start a clean session
    clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8)
});

client.on('connect', () => {
    console.log('Connected to MQTT broker securely via WSS!');
    // Subscribe to a topic
    client.subscribe('my/topic', (err) => {
        if (!err) {
            console.log('Subscribed to my/topic');
            // Publish a message
            client.publish('my/topic', 'Hello from secure MQTT!');
        }
    });
});

client.on('message', (topic, message) => {
    console.log(`Received message on topic "${topic}": ${message.toString()}`);
});

client.on('error', (err) => {
    console.error('MQTT client error:', err);
});

client.on('close', () => {
    console.log('Disconnected from MQTT broker.');
});