const express = require("express")
const router = express.Router()
const User = require("./modals/userModal.js")
const bcrypt = require("bcrypt")

router.post("/register", async (req,res)=>{
    try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt)
    const user = await new User({
        username:req.body.username,
        email:req.body.email,
        password:hashedPass
    })
    await user.save()
    res.status(200).json(user)}
    catch(err){console.error(err);res.status(500).send("Not registered").json(err)}
})

router.post("/login", async (req,res)=>{
    try {
        const user = await User.findOne({email:req.body.email})
        !user && res.status(404).send("user not found")
        const validatePass = await bcrypt.compare(req.body.password, user.password)
        !validatePass && res.status(401).send("Password Did not match")
        res.status(200).json(user)
    }
    catch(err){console.error(err);res.status(401).send("user not found").json(err)}
})



router.get("/",(req,res)=> res.send("hello World"))
module.exports = router