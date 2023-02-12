
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const { getConfig } =  require('./services/configService');
const detailsService =   require('./services/detailsService');
const { init } =  require('./services/dbService');

app.use(
   bodyParser.urlencoded ({
      extended:true,
   })
);

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(cors());
app.use('/details',detailsService);

app.use((req,res,next) => {
    const error = new Error("not found")
    Error.status=404;
    next(error)
})

 
app.use((error, req, res, next) =>{

res.status(error.statusCode || 500).send ({
    error:{ status:error.statusCode || 500,
          message: error.message || 'Internal Server Error'
       }
   })

})

getConfig().then (
   (config) => {
      app.listen(config.APP_PORT, function () {
            console.log(`app listening on port ${config.APP_PORT }!`);
      });
      init();
    }

)

