const express = require("express");
const serverless = require("serverless-http");
const app = express();
const router = express.Router();
const axios = require('axios')
const cors = require('cors')

app.use(cors({
    origin: '*'
}))

require('dotenv').config()


app.get(':endpoint([\\/\\w\\.-]*)', function (req, res) {
    // Remove any trailing slash from base url
    const endpoint = (process.env.API_BASE_URL).replace(/\/$/, "") + req.params.endpoint
    
    axios.get(endpoint).then(response => {
        res.json(response.data)
    }).catch(error => {
        res.json(error)
    })
})


app.listen(process.env.PORT || 3000, function(){
    console.log("Express Reverse Proxy Correios Running!");
  });

app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);
