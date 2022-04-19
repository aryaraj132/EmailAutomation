const express = require("express")
const router = express.Router()
const User = require("./modals/userModal.js")
const Sender = require("./modals/senderModal.js")
const bcrypt = require("bcryptjs")

router.post("/register", async (req,res)=>{
    try {
    const Emailuser = await User.findOne({email:req.body.email})
    const Usernameuser = await User.findOne({username:req.body.username})
    if(Emailuser){
        res.status(403).statusMessage="Email already exist";res.send()
    }else if(Usernameuser){
        res.status(403).statusMessage="Username already exist";res.send()
    }
    else{
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt)
    const user = await new User({
        username:req.body.username,
        email:req.body.email,
        password:hashedPass
    })
    await user.save()
    res.status(200).json({'info':"New user registered. Please login"}).send()}}
    catch(err){console.error(err);res.status(500).statusMessage="Not Registered";res.send()}
})

router.post("/login", async (req,res)=>{
    try {
        const user = await User.findOne({email:req.body.email})
        if(!user){
            res.status(404).statusMessage="User Not Found"
            res.send()}
        else{
            const validatePass = await bcrypt.compare(req.body.password, user.password)
            if(!validatePass){
                res.status(401).statusMessage="Password Did not match"
                res.send()
            }
            else{
                const {password, ...other} = user._doc
                res.status(200).json(other).send()
            }
        }
    }
    catch(err){console.error(err);res.status(401)
        res.send()}
})
router.post("/sender-info", async (req,res)=>{
    try {
        const sender = await Sender.findOne({senderID:req.body.userID})
        if(sender){
            sender.senderID = req.body.userID
            sender.email = req.body.email
            sender.password = req.body.password
            sender.save()
        }
        else{
        const NewSender = await new Sender({
            senderID:req.body.userID,
            email:req.body.email,
            password:req.body.password
        })
        await NewSender.save()
         }
        res.status(200).json({'info':"Senders Detail Added Successfully"}).send()
        }
        catch(err){console.error(err);res.status(500).statusMessage="Not Registered";res.send()}
})



router.get("/",(req,res)=> res.send("hello World"))
module.exports = router