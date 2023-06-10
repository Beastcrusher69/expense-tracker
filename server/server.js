const express = require('express');
const cors = require('cors');
const app = express();
const port = 1000;
const corsOptions={
    origin : "*",
    credentials:true,
    optionSuccessStatus:200
}

app.use(cors(corsOptions));

app.get('/users',(req,res)=>{
    res.send([{purpose:'jay',expense:'200'},{purpose:'jay',expense:'200'},{purpose:'jay',expense:'200'}])
})

app.listen(port ,()=>{
    console.log("server listening on port ",port)
})