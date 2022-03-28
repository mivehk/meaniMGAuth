import express from "express"
import {func01 , func02 , func03, func04, func05, func06 , func07, func08} from "../controllers/iMGCtrls.js"
import {register, login} from "../controllers/authenti.js"

import jwt from "express-jwt"


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
        }, func01)
        .post((req,res, next)=>{
            console.log (`Request from : ${ req.originalUrl}`);
	        console.log(`Request type: ${req.method}`);
            next()
        }, func02)

        app.get("/api/register",(req,res, next)=>{
            console.log (`Request from : ${ req.originalUrl}`);
	        console.log(`Request type: ${req.method}`);
            next()
        }, func03)
        app.post("/api/register", (req,res, next)=>{
            console.log (`Request from : ${ req.originalUrl}`);
	        console.log(`Request type: ${req.method}`);
            next()
        },func04)
        
        
        app.route("/api/login")
        .get((req,res, next)=>{
            console.log (`Request from : ${ req.originalUrl}`);
	        console.log(`Request type: ${req.method}`);
            next()
        }, func05)
        .post((req,res, next)=>{
            console.log (`Request from : ${ req.originalUrl}`);
	        console.log(`Request type: ${req.method}`);
            next()
        }, func06)

        app.get("/api/profile/:userid",auth ,(req,res,err, next)=>{
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
        } ,func07)
        app.post("/api/profile/:userid",(req,res, next)=>{
            console.log (`Request from : ${ req.originalUrl}`);
	        console.log(`Request type: ${req.method}`);
            next()
        }, func08)



}

export default routes
