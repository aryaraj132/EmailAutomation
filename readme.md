# Email Automation

This Project is built using express.js server to create a mail scheduling system. 


Available at :

* [https://email-automate.araj.tk/](https://email-automate.heyaryan.in/)
<!-- * [Heroku](https://email-automation-mern.herokuapp.com/) | Working -->


## Features
* Login with registering your email or signup using Google auth
* Set up the email you want your scheduled messages to be sent from.
* Send emails to multiple recipents with CC
* Automate your emails with scheduling them on Daily / Weekly / Monthly / Yearly basis.
* You can setup Recurring mails for every 20 / 30 seconds / minutes.
* Track all active mails and past mails in History.

## Issues
* Services limited to Gmail only
* Hosting on server with insecure connection raises csp issue
    * Change your Browser Settings or Build app locally.

## Building process

1. Clone this repository
2. install Node and npm
3. run command "npm install"
4. Create a MangoDB Cluster
5. set up mangodb cluster for your local ip
6. Save credentials in your env file accordingly
```
DB_URI=
DB_NS=
PORT=5000
```
7. run command "npm start" to start server
8. run command "npm run dev" before editing any react file
9. Done !!

## Contribute
Required features and those that I am working on are mentioned in Issues section feel free to checkout and contribute in any way you'd like.

Happy Contributing :)


<h1 align="center">
   Thanks for visiting
</h1>

