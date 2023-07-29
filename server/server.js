require("dotenv").config();
const jwt = require('jsonwebtoken');
const express = require('express');
const cookieParser = require('cookie-parser')
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = 1000;
const corsOptions={
    // origin : "https://expense-tracker-iota-six.vercel.app" ,
    origin : "http://localhost:5173",
    credentials:true,
    optionSuccessStatus:200
}

const uri = process.env.MONGO_URI;

mongoose.connect(uri,
    { useNewUrlParser : true , useUnifiedTopology : true},)
    .then( console.log("connected"))
                .catch((err)=> console.log(err));
                
                const dataSchema = mongoose.Schema({
                    purpose : String ,
                    expense : String ,
                    imageUrl : String
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
app.use(cookieParser());

function AuthenticateToken(req,res,next){

    let token;

    try{
    token = req.cookies.jwtToken;
    }
    catch{(err)=>{}}

    if(!token){
        res.sendStatus(401);
        console.log(401);
        return;
    }

    else{

        try{
            jwt.verify(token , process.env.ACCESS_TOKEN_SECRET)
        }    
        catch{
        res.sendStatus(498);
        console.log(498);

        return;
        }

        req.token = token ; 

        next();
    }

}

app.get("/signup",(req,res)=>{

    res.send("hello world");
})

//authentication required

app.post('/expense-data',
AuthenticateToken,
async (req,res)=>{

    let newExpense = req.body;

    console.log(newExpense);

        let {username} = jwt.verify(req.token , process.env.ACCESS_TOKEN_SECRET);
        console.log(username);

        await Users.updateOne({ username },{
            $push : { expenseData : newExpense}
        });
        
        res.json({ success : "data sent successfully"});
        return;

})

app.get('/expense-data', 
AuthenticateToken,
async (req,res)=>{

        let {username} = jwt.verify(req.token , process.env.ACCESS_TOKEN_SECRET);
        console.log(username);

        try{
            let {expenseData} = await Users.findOne({ username });

            console.log("get>> " , expenseData)

            res.json({expenseData , username});
        }
        catch{(err) => console.log(err)}

    return;

});

app.delete("/expense-data/:id",AuthenticateToken, async(req,res)=>{

    let id = req.params.id;

    let {username} = jwt.verify(req.token , process.env.ACCESS_TOKEN_SECRET);
        console.log(username);

        await Users.updateOne({ username },{
            $pull : { expenseData : { _id : id}}
        });

    res.json({"success" : "successfully deleted"})

})

app.put("/change-password",AuthenticateToken , async (req,res)=>{

    let fields = req.body;
    let token = req.token ; 
    let payload = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET);
    let {username} = payload;

    let foundUser = await Users.findOne({username});

    if(fields.password === foundUser.password){

        if(fields.newPassword === foundUser.password){
            res.json({
                code:"1",
                message:"new password should be different then the current password"
            })
        }
        else{
            let newFoundUser = await Users.findOneAndUpdate({username},{ password : fields.newPassword},{ new : true});
            res.json({
                code : "2",
                message : "password changed successfully"
            })
        }
    }
    else{
        res.json({
            code:"1",
            message:"password is incorrect"
        })
    }
 
})

app.delete("/delete-account",AuthenticateToken,async (req , res)=>{

    let {username} = jwt.verify(req.token , process.env.ACCESS_TOKEN_SECRET);

    let deleted = await Users.deleteOne({username});

    res.send("deleted");

    console.log(deleted);
})

//authentication not required

app.post("/signup",async (req,res)=>{

    let cred = req.body; 
    let username = cred.username;
    let password = cred.password;

    if(!username || !password){
        res.json({
            code: "1",
            message:"please fill the fields"
        });
        return;
    }
    let ExistingUser = await Users.findOne({username});
    
    if(ExistingUser){
        res.json({
                code: "1",
                message:"username already exists"
            });
        return;
    }
    
    Users.create({
        username , password , expenseData : []
    })

    res.send({
        code:"2",
        message:"successfully signed up"
    });

})

app.post("/login" , async (req,res)=>{

    let cred = req.body; 
    let username = cred.username;
    let password = cred.password;
    let payload = { username };

    if(!username || !password){
        res.json({
            code: "1",
            message:"please fill the fields"
        });
        return;
    }

    let User = await Users.findOne(cred);

    if(!User){
        res.json({
            code: "1",
            message:"username or password is incorrect"
        })
        return;
    }

    let token = jwt.sign(payload , process.env.ACCESS_TOKEN_SECRET);

    res.cookie("jwtToken",token,{httpOnly:true , sameSite:"none" , secure:true});

    res.json({ code:"2",
            });
    
})

app.get("/login" , (req,res)=>{

    console.log(req.cookies);
})

app.listen(port ,()=>{
    console.log("server listening on port ",port)
})
