import express from "express"
import {func01 , func02 , func03, func04, func05, func06 , func07, func08} from "../controllers/iMGCtrls.js"

import jwt from "express-jwt"

 var auth= jwt({
        secret:"MY_SECRET",
        userProperty: "payload",
        algorithms:['HS256']
    })


const routes = (app) =>{
       

   
    
    app.route("/api/")
        .get((req,res,next)=>{
            console.log (`Request from : ${ req.originalUrl}`);
	        console.log(`Request type: ${req.method}`);
            next()
        }, func01)
        .post((req,res,next)=>{
            console.log (`Request from : ${ req.originalUrl}`);
	        console.log(`Request type: ${req.method}`);
            next()
        }, func02)

        app.route("/api/register")
        .get((req,res,next)=>{
            console.log (`Request from : ${ req.originalUrl}`);
	        console.log(`Request type: ${req.method}`);
            next()
        }, func03)
        .post((req,res,next)=>{
            console.log (`Request from : ${ req.originalUrl}`);
	        console.log(`Request type: ${req.method}`);
            next()
        }, func04)
        
        
        app.route("/api/login")
        .get((req,res,next)=>{
            console.log (`Request from : ${ req.originalUrl}`);
	        console.log(`Request type: ${req.method}`);
            next()
        }, func05)
        .post((req,res,next)=>{
            console.log (`Request from : ${ req.originalUrl}`);
	        console.log(`Request type: ${req.method}`);
            next()
        }, func06)

        app.route("/api/profile/:userid")
        .get((req,res,next,err)=>{
            console.log (`Request from : ${ req.originalUrl}`);
	        console.log(`Request type: ${req.method}`);
            if (err.name === 'UnauthorizedError'){
                res.status(666601)
                res.json({"message" : err.name+ ": " + err.message})
            }    
            next()
        },auth,func07)
        .post((req,res,next)=>{
            console.log (`Request from : ${ req.originalUrl}`);
	        console.log(`Request type: ${req.method}`);
            next()
        }, func08)



}

export default routes
