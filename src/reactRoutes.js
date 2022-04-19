const express = require("express")
const router = express.Router()

router.get('/create', (req, res)=>{
    res.set("Content-Security-Policy", "default-src 'self';frame-src 'self' https://accounts.google.com ;base-uri 'self';font-src 'self' http: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self' https://apis.google.com http: 'unsafe-eval' 'unsafe-inline';script-src-attr 'none';style-src 'self' http: 'unsafe-inline';");
    res.render('index');   
});
router.get('/history', (req, res)=>{
    res.set("Content-Security-Policy", "default-src 'self';frame-src 'self' https://accounts.google.com ;base-uri 'self';font-src 'self' http: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self' https://apis.google.com http: 'unsafe-eval' 'unsafe-inline';script-src-attr 'none';style-src 'self' http: 'unsafe-inline';");
    res.render('index');   
});
router.get('/', (req, res)=>{
    res.set("Content-Security-Policy", "default-src 'self';frame-src 'self' https://accounts.google.com ;base-uri 'self';font-src 'self' http: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self' https://apis.google.com http: 'unsafe-eval' 'unsafe-inline';script-src-attr 'none';style-src 'self' http: 'unsafe-inline';");
    res.render('index');   
});
router.get('/register', (req, res)=>{
    res.set("Content-Security-Policy", "default-src 'self';frame-src 'self' https://accounts.google.com ;base-uri 'self';font-src 'self' http: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self' https://apis.google.com http: 'unsafe-eval' 'unsafe-inline';script-src-attr 'none';style-src 'self' http: 'unsafe-inline';");
    res.render('index');   
});
router.get('/login', (req, res)=>{
    res.set("Content-Security-Policy", "default-src 'self';frame-src 'self' https://accounts.google.com ;base-uri 'self';font-src 'self' http: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self' https://apis.google.com http: 'unsafe-eval' 'unsafe-inline';script-src-attr 'none';style-src 'self' http: 'unsafe-inline';");
    res.render('index');   
});
router.get('/sender', (req, res)=>{
    res.set("Content-Security-Policy", "default-src 'self';frame-src 'self' https://accounts.google.com ;base-uri 'self';font-src 'self' http: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self' https://apis.google.com http: 'unsafe-eval' 'unsafe-inline';script-src-attr 'none';style-src 'self' http: 'unsafe-inline';");
    res.render('index');   
});

module.exports = router