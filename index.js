const express=require('express')
    , app = express()
    , http =require('http')
    , server = http.createServer(app)
    , bodyParser = require('body-parser')
    , PORT = process.env.PORT||8111;

app.use(function(req, res, next) {
 	res.header("Access-Control-Allow-Origin", "*");
 	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 	next();
});

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

app.get('/',(req,res)=>{
  var speech = ''
    , intent = req.body.result && req.body.result.metadata.intentName ? req.body.result.metadata.intentName : "noIntent"
 	, contexts = req.body.result && req.body.result.contexts ? req.body.result.contexts : "noContexts"

  if (intent) {

  }

  function responseToAPI(speech){
   	return res.json({
   	speech: speech,
   	displayText: speech,
   	source: 'webhook-asda-assistant',
   	contextOut: contextOut
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
