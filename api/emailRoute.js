const express = require("express")
const router = express.Router()
const nodemailer = require("nodemailer");
const schedule = require('node-schedule');
const User = require("./modals/userModal.js")
const Email = require("./modals/emailModal.js")
const EmailHistory = require("./modals/emailHistoryModal")
const Sender = require("./modals/senderModal.js")

router.post("/new-email", async (req,res)=>{
    try {
        let Unique_name = ''
        const sender = await Sender.findOne({senderID:req.body.userID})
        if(!sender){
            res.status(404).statusMessage="Sender Data Not Set"
            res.send()
        }else{
        const emails = await EmailHistory.find({userID:req.body.userID})
        const mails = await Email.find({userID:req.body.userID})
        try{const user = await User.findById(req.body.userID)
        Unique_name = user.username + emails.length}
        catch{
            Unique_name = req.body.userID + '_' + emails.length
        }
        const email = await new Email({
            uniqueName:Unique_name,
            userID:req.body.userID,
            sendTo:req.body.sendTo,
            CC:req.body.CC,
            Subject:req.body.subject,
            Body:req.body.mailBody,
            isHTML:req.body.html,
            ScheduleType:req.body.scheduleType,
            ScheduleValue:req.body.schedule
        })
    await email.save()
        const emailHist = await new EmailHistory({
            uniqueName:Unique_name,
            userID:req.body.userID,
            sendTo:req.body.sendTo,
            CC:req.body.CC,
            Subject:req.body.subject,
            Body:req.body.mailBody,
            isHTML:req.body.html,
            ScheduleType:req.body.scheduleType,
            ScheduleValue:req.body.schedule
    })
    await emailHist.save()
    const rule = new schedule.RecurrenceRule();
    if(req.body.scheduleType=='Recurring'){
        if(req.body.schedule.type=='minute'){
            rule.minute = req.body.schedule.val;
        }else{
            rule.second = req.body.schedule.val;
        }
    }else if(req.body.scheduleType=='Daily'){
        rule.hour = req.body.schedule.hour
        rule.minute = req.body.schedule.minute
    }else if(req.body.scheduleType=='Weekly'){
        rule.dayOfWeek = req.body.schedule.dayOfWeek
        rule.hour = req.body.schedule.hour
        rule.minute = req.body.schedule.minute
    }else if(req.body.scheduleType=='Monthly'){
        rule.date = req.body.schedule.date
        rule.hour = req.body.schedule.hour
        rule.minute = req.body.schedule.minute
    }else if(req.body.scheduleType=='Yearly'){
        rule.month = req.body.schedule.month
        rule.date = req.body.schedule.date
        rule.hour = req.body.schedule.hour
        rule.minute = req.body.schedule.minute
    }
    const job = schedule.scheduleJob(Unique_name,rule, async function(Unique_name){
        try{const mail = await EmailHistory.findOne({uniqueName:Unique_name})
        let count = mail.Count
        count += 1
        var transporter = nodemailer.createTransport({  
            service: 'gmail',  
            auth: {  
              user: sender.email,  
              pass: sender.password  
            }  
          });
          if(mail.isHTML){
              let info = await transporter.sendMail({  
                from: 'Test <aryaraj@gmail.com>',  
                to: mail.sendTo,  
                cc: mail.CC.toString(),
                subject: mail.Subject,  
                html: mail.Body  
              });
          }else{
            let info = await transporter.sendMail({  
                from: 'Test <aryaraj@gmail.com>',  
                to: mail.sendTo,  
                cc: mail.CC.toString(),
                subject: mail.Subject,  
                text: mail.Body  
              });
          }
        const email = await EmailHistory.findByIdAndUpdate(mail._id,{Count:count})
        console.log('Mail ',Unique_name,' sent.');}
        catch(err){
            console.log(err);
        }
      }.bind(null,Unique_name));
    res.status(200).json({'info':'Mail Scheduled Successfully'})}}
    catch(err){console.error(err);res.status(500).statusMessage="Not Created";res.send()}
})
router.get('/cancel-schedule/:id',async (req,res)=>{
    try {
        const mail = await Email.findById(req.params.id)
        let current_job = schedule.scheduledJobs[mail.uniqueName];
        const email = await Email.findByIdAndDelete(req.params.id)
        try{current_job.cancel();}
        catch{null}
        res.status(200).json({"info":"Task Stopped"})
    }
    catch(err){console.error(err);res.status(200).statusMessage="Not Cancelled";res.send()}
})
router.get('/get-mails/:id',async (req,res)=>{
    try {
        const mails = await Email.find({userID:req.params.id})
        res.status(200).json(mails)
    }
    catch(err){console.error(err);res.status(500).statusMessage="Not Found";res.send()}
})
router.get('/get-mailHist/:id',async (req,res)=>{
    try {
        const mails = await EmailHistory.find({userID:req.params.id})
        res.status(200).json(mails)
    }
    catch(err){console.error(err);res.status(500).statusMessage="Not Found";res.send()}
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