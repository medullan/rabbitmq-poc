#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

const connectionString = process.env.AMQ_CONNECTION || `amqp://localhost`;
const prefetch = parseInt(process.env.AMQ_PREFETCH) || 1;

amqp.connect(connectionString, function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'task_queue';

    ch.assertQueue(q, {durable: true});
    ch.prefetch(prefetch);
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
    ch.consume(q, function(msg) {
      var secs = msg.content.toString().split('.').length - 1;

      console.log(" [x] Received %s", msg.content.toString());
      setTimeout(function() {
        console.log(" [x] Done");
        ch.ack(msg);
      }, secs * 1000);
    }, {noAck: false});
  });
});

/**
 * 
 **/