import express from "express"
import {func01_apiget , func02_apipost , func03_registerget, func04_registerpost, func05_loginget, func06_loginpost , func07_profileget, func08_profilepost} from "../controllers/iMGCtrls.js"
import {register, login} from "../controllers/authenti.js"
import {} from "dotenv/config"
import connectEnsureLogin from "connect-ensure-login"

import jwt from "express-jwt"
//import { initialize2 } from "../config/passport.js"
//import passport  from "passport"


 var auth = jwt({
        secret:'MY_SECRET',
        //requestProperty: 'payload',
        //resultProperty: 'payload',
        userProperty: 'payload',
        algorithms:['HS256']
    })


const routes = (app) =>{

    app.get("/", (req,res)=>{ res.redirect("/api/")})

    app.route("/api/")
        .get((req,res, next)=>{
            console.log (`Request from : ${ req.originalUrl}`);
	        console.log(`Request type: ${req.method}`);
            //console.log(localStorage)
            next()
        }, func01_apiget)
        .post((req,res, next)=>{
            console.log (`Request from : ${ req.originalUrl}`);
	        console.log(`Request type: ${req.method}`);
            next()
        }, func02_apipost)

        app.get("/api/register",(req,res, next)=>{
            console.log (`Request from : ${ req.originalUrl}`);
	        console.log(`Request type: ${req.method}`);
            next()
        }, func03_registerget)
        app.post("/api/register", (req,res, next)=>{
            console.log (`Request from : ${ req.originalUrl}`);
	        console.log(`Request type: ${req.method}`);
            next()
        },register)
        
        
        app.route("/api/login")
        .get((req,res, next)=>{
            console.log (`Request from : ${ req.originalUrl}`);
	        console.log(`Request type: ${req.method}`);
            next()
        }, func05_loginget)
        .post((req,res, next)=>{
            console.log (`Request from : ${ req.originalUrl}`);
	        console.log(`Request type: ${req.method}`);
            next()
        }, login )

        app.get("/api/profile/:userid" ,auth,(req,res,err, next)=>{
            console.log (`Request from : ${ req.originalUrl}`);
	        console.log(`Request type: ${req.method}`);
            //console.log(localStorage)
            //console.log(req.headers.authorization)
            //console.log(req.headers.authorization.split(' ')[0])
            if (err.name === 'UnauthorizedError'){
                res.status(301)
                res.json({"message" : err.name+ ": " + err.message})
            }  
            //res.status(301) 
            next()
        } ,func07_profileget)
        app.post("/api/profile/:userid",(req,res, next)=>{
            console.log (`Request from : ${ req.originalUrl}`);
	        console.log(`Request type: ${req.method}`);
            next()
        }, func08_profilepost)



}

export default routes
