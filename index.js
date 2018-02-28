const express=require('express')
    , app = express()
    , http =require('http')
    , server = http.createServer(app)
    , bodyParser = require('body-parser')
    , PORT = process.env.PORT||8111
    , amqp = require('amqplib/callback_api');

app.use(function(req, res, next) {
 	res.header("Access-Control-Allow-Origin", "*");
 	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 	next();
});

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

app.post('/',(req,res)=>{
    console.log('inside intent');
  var speech = ''
    , intent = req.body.result && req.body.result.metadata.intentName ? req.body.result.metadata.intentName : "noIntent"
 	, contexts = req.body.result && req.body.result.contexts ? req.body.result.contexts : "noContexts"

  if (intent === 'Instruct Bot') {
    console.log('inside if');
  amqp.connect('amqp://moggqonv:YSi2cX9QAgKzdawLMa2EPVb1-NB-VvRR@orangutan.rmq.cloudamqp.com/moggqonv', function(err, conn) {
    conn.createChannel(function(err, ch) {
      var q = 'hello';
      var msg = req.body.result.resolvedQuery;

      ch.assertQueue(q, {durable: false});
      // Note: on Node 6 Buffer.from(msg) should be used
      ch.sendToQueue(q, new Buffer(msg));
      console.log(" [x] Sent %s", msg);
      speech = 'response came form webhook';
      responseToAPI(speech);
    });
    setTimeout(function() { conn.close(); process.exit(0) }, 500);
  });
  }
  else if(intent === 'noIntent'){
    console.log('no intent captured');
  }
  else{
    console.log('Something went wrong');
  }

  function responseToAPI(speech){
   	return res.json({
   	speech: speech,
   	displayText: speech,
   	source: 'webhook-asda-assistant',
   	});
 	}
})

server.listen(PORT,(err,res) =>{
    if (err) {
      console.log(err);
    } else {
      console.log("Server starts running at ",PORT);
    }
  });
