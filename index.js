const mongoose = require("mongoose");
const dotenv = require("dotenv")
const path = require('path');
const express = require("express")
const cors = require("cors")
const helmet = require("helmet");
const morgan = require("morgan");
const userRoutes = require("./api/userRoute.js")
const emailRoutes = require("./api/emailRoute.js")
const reactRouts = require("./src/reactRoutes.js")
dotenv.config()

const port = process.env.PORT || 8000

const app = express()

app.use(cors())
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))
app.set('view engine', 'ejs');

app.use('/static', express.static(path.join(__dirname, 'public')))
app.use("", reactRouts)
app.use("/api/v1/user", userRoutes)
app.use("/api/v1/email", emailRoutes)
app.use("*",(req, res) => res.status(404).json({error:"Not Found"}))

// const MongoClient = mongodb.MongoClient

// MongoClient.connect(
//     process.env.DB_URI,
//     {
//         poolSize: 50,
//         wtimeout: 2500,
//         useNewUrlParse: true
//     }
// ).catch(err => {
//     console.error(err.stack);
//     process.exit(1)
// }).then( async client=>{
//     app.listen(port, ()=>{
//         console.log(`listening on port ${port}`);
//     })
// })

mongoose.connect(process.env.DB_URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology:true,
            useCreateIndex:true
        })

app.listen(port, ()=>{
            console.log(`listening on port ${port}`);
        })