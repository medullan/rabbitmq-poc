#!/usr/bin/env node

var amqp = require('amqplib');
const connectionString = process.env.AMQ_CONNECTION || `amqp://localhost`;
amqp.connect(connectionString)
.then(function(conn) {
  console.log(`Connected to ${connectionString}`);
  conn.createChannel().then(function( ch) {
    var q = 'task_queue';
    var msg = process.argv.slice(2).join(' ') || 'Hello World2!';

    ch.assertQueue(q, {durable: true});
    // Note: on Node 6 Buffer.from(msg) should be used
    ch.sendToQueue(q, new Buffer(msg))
    
    console.log(" [x] Sent %s", msg);
  })
  .catch((err) => {
    console.log('Create Ch err', err)
  });
  setTimeout(function() { conn.close(); process.exit(0) }, 1000);
})
.catch((err) => {
  console.log('Connection err', err)
});
