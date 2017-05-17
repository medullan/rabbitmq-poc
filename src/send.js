#!/usr/bin/env node

var amqp = require('amqplib');

amqp.connect('amqp://localhost')
.then(function(conn) {
  conn.createChannel().then(function( ch) {
    var q = 'task_queue';
    var msg = 'Hello World2!';

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
