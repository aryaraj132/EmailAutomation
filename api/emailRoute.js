const express = require("express")
const router = express.Router()
const schedule = require('node-schedule');
const User = require("./modals/userModal.js")
const Email = require("./modals/emailModal.js")

router.post("/new-email", async (req,res)=>{
    try {
        const user = await new Email({
            userID:req.body.userID,
            sendTo:req.body.sendTo,
            CC:req.body.cc,
            Subject:req.body.subject,
            Body:req.body.mailBody
    })
    await user.save()
    res.status(200).json(user)}
    catch(err){console.error(err);res.status(500).send("Not registered").json(err)}
})

router.get('/start',(req,res)=>{
    const rule = new schedule.RecurrenceRule();
    rule.second = new schedule.Range(0, 59);
    const job = schedule.scheduleJob('test',rule, function(){
        console.log('The answer to life, the universe, and everything!');
      });
      res.send("Working")
})

router.get('/end',(req,res)=>{
    let current_job = schedule.scheduledJobs['test'];
    current_job.cancel();
      res.send("ended")
})

router.get("/",(req,res)=> res.send("hello World"))
module.exports = router