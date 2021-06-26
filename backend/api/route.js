import express from "express"
const router = express.Router()

router.route("/").get((req,res)=> res.send("hello World"))

export default router