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
const MONGO_URI = "mongodb+srv://jaykapadia389:RUtqBkXGWS4ypBLb@cluster0.jwgyx6y.mongodb.net/expensesDB?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI,
                { useNewUrlParser : true , useUnifiedTopology : true},)
                .then( console.log("connected"))
                .catch((err)=> console.log(err));

const dataSchema = mongoose.Schema({
    purpose : String ,
    expense : String
},
{
    versionKey : false
});

const userSchema = mongoose.Schema({
    username : "String",
    password : "String",
    expenseData : [dataSchema]
})

const Data = mongoose.model("Data", dataSchema);
const Users = mongoose.model("Users", userSchema);

app.use(cors(corsOptions));
app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.post('/expense-data',(req,res)=>{

    let newExpense = req.body;
    Data.create(newExpense);
    res.json({ success : "data sent successfully"}); 

})

app.get('/expense-data',async (req,res)=>{

    let dataArr = await Data.find({});

    res.send(dataArr);

});

app.delete("/expense-data/:id",async(req,res)=>{
    let id = req.params.id;

     await Data.deleteOne({_id : id});

    res.json({"success" : "successfully deleted"})

})

app.post("/signup",(req,res)=>{

    let cred = req.body; 

    console.log(req.body);

    res.redirect("http://localhost:5173/expense-tracker")
       
    // res.json({"success" : "data received"});

})

app.listen(port ,()=>{
    console.log("server listening on port ",port)
})