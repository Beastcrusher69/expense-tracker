require("dotenv").config();
const jwt = require('jsonwebtoken');
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

const uri = process.env.MONGO_URI;
console.log("uri>>> ",uri)

mongoose.connect(uri,
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

app.post("/signup",async (req,res)=>{

    let cred = req.body; 
    let username = cred.username;
    let password = cred.password;

    if(!username || !password){
        res.send("please fill the fields");
        return;
    }

    let ExistingUser = await Users.findOne({username});
    console.log("ExistingUser>>>> ",ExistingUser)
    
    if(ExistingUser){
        res.send("username already exists");
        return;
    }
    
    Users.create({
        username , password , expenseData : []
    })

    res.send({
        code:"1"
    });

})

app.post("/login" , async (req,res)=>{

    let cred = req.body; 
    let username = cred.username;
    let password = cred.password;
    let payload = { username };

    if(!username || !password){
        res.send("please fill the fields");
        return;
    }

    let User = await Users.findOne(cred);

    if(!User){
        res.send("username or password is incorrect")
        return;
    }

    let token = jwt.sign(payload , process.env.ACCESS_TOKEN_SECRET);
    
    res.json({ "success":true,token });
    
})

app.listen(port ,()=>{
    console.log("server listening on port ",port)
})