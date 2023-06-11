const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = 1000;
const corsOptions={
    origin : "*",
    credentials:true,
    optionSuccessStatus:200
}
const MONGO_URI = "mongodb+srv://jay:snidbKgn8wuKCjYT@cluster0.gvpezfm.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI,{ useNewUrlParser : true , useUnifiedTopology : true});

const dataSchema = mongoose.Schema({
    purpose : String ,
    expense : String
},
{
    versionKey : false
});

const Data = mongoose.model("Data", dataSchema);

Data.create({ purpose : "bicycle service" , expense : "200"});
// Data.create({ purpose : "maggi" , expense : "28"});
// Data.create({ purpose : "top ramen" , expense : "30"});
// Data.create({ purpose : "bicycle" , expense : "10000"});

// password => QnQZCMlrObeLyavD

app.use(cors(corsOptions));

app.post('/expense-data',(req,res)=>{

    Data.create({purpose : req.body.purpose, expense : req.body.expense});
    console.log("post");

})

app.get('/expense-data',async (req,res)=>{

    let dataArr = await Data.find({});

    console.log(dataArr);
    
    // res.send( )
});

app.listen(port ,()=>{
    console.log("server listening on port ",port)
})