const express = require('express');
const mongoose = require('mongoose')
const User = require('./models/user.js')
const Complaint = require('./models/complaint.js')
const bcrypt = require('bcrypt');
const cors = require('cors')
const jwt = require('jsonwebtoken');
const multer  = require('multer')
const {storage} = require('./cloudConfig.js')
const upload = multer({ storage })

const app = express();
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

mongoose.connect("mongodb+srv://prataparyan761:wfJCrK3NNPBAL5zX@cluster5.vh8lydx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster5").then(()=>{
    console.log('connected')
}).catch((err)=>console.log(err))

app.listen(3000,()=>{
    console.log("server is listening on port 3000")
})

// Sign up
app.post('/signup', async (req,res)=>{
    console.log(req.body)
    let {name,email,password,role} = req.body;
    let data = await User.findOne({email:email})
    if(data){
        return res.json({"message":"user already existed"})
    }
    bcrypt.genSalt(10,  function(err, salt) {
        bcrypt.hash(password, salt, async function(err, hash) {
            let newUser = await User.create({
                name,
                email,
                password:hash,
                role,
            })

            await newUser.save();
        });
    });
    res.json({"message":"successfuly register"})
})

//signin
app.post("/signin",async (req,res)=>{
    let {email,password} = req.body;
    let user = await User.findOne({email:email});
    if(!user){
       return res.json({"message":"user not exist"});
    }
    bcrypt.compare(password,user.password,(err,result)=>{
        if(result === true){
            let data  = {
                signInTime: Date.now(),
                email
            }

            const token = jwt.sign(data, 'secret')
            if(user.role === "student"){
                return res.json({"message":"success",token,name:user.name});
            }else{
                return res.json({"message":"admin-success",token,name:user.name});
            }
            
        }else{
           return res.json({"message":"Invalid password"});
        }
    })

    
})


//Complaint
app.post('/complaint',upload.single('image'),async (req,res)=>{

    let URL = req.file.path;
    console.log(req.body)

    let {title,description,category,name} =  req.body;
    let newComplaint = await Complaint.create({
        title,
        description,
        image:URL,
        studentName:name,
    })
    await newComplaint.save()
    res.json({'message':"complaint added"})
})  


//allcomplaint
app.post('/allcomplaint',async (req,res)=>{
    let name = req.body.name
    let allcomplaints = await Complaint.find({studentName:name})
    console.log(allcomplaints)
    res.json({"message":"success",allcomplaints})
})

//admin
app.get('/allComplains',async (req,res)=>{
    let data = await Complaint.find({})
    res.json({'message':"success",data})
})

app.post("/updateStatus",async (req,res)=>{
    let {status,title} = req.body;
    let complain = await Complaint.findOneAndUpdate({title:title},{status:status})

    await complain.save();
    res.json({"message":"success"})
    
})

