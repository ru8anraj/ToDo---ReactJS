const express = require('express')
    , app = express()
    , http = require('http')
    , server = http.createServer(app)
    , PORT = process.env.PORT || 4545;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
 	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 	next();
});


app.use(express.static('./../../'));

// app.get('/', (req, res) => {
//   res.send('Hello!');
// });

server.listen(PORT, (err, res) => {
  if (err) {
    console.log('error in starting the server - > ', err);
  } else {
    console.log('server started in ', PORT);
  }
});
