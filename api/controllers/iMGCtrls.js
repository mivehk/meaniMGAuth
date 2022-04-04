import mongoose from "mongoose"
import { usersSchema } from "../models/iMGusers.js"

import "../config/passport.js"
import bcrypt from "bcrypt"
import passport  from "passport"
import { initialize2 } from "../config/passport.js"
import {register , login} from "./authenti.js"
//import passportLocalMongoose from "passport-local-mongoose"


const UsersModel = mongoose.model("UsersModel", usersSchema, "usersDocs")


//passport.use(UsersModel.createStrategy())

export const func01_apiget = (req,res) =>{
    res.render("index")
    
    console.log(`function_01_apiget ran`)
}

export const func02_apipost = (req,res) =>{
    
    console.log(`function_02_apipost ran`)
}

export const func03_registerget = (req,res) =>{
    res.render("register")
    
    console.log(`registering user ${req.body.email}`)
}

export const func04_registerpost = (req,res) =>{
    
   try{
 /*    const hash= await bcrypt.hash(req.body.password, 10)

    let newUsersModel = new UsersModel(req.body)
    newUsersModel.hash= hash;
    newUsersModel.save(
            //res.render("profile",  {sarvar07: cluster, template:"profile"} )
           
            //res.redirect(`/api/profile/${cluster._id}`)
            //func07(req.body)
       // if (cluster.length !=0){  
    
        ) 
        res.redirect(`/api/profile/${newUsersModel._id}`) */

       /*  let newUsersModel = new UsersModel(req.body)
        const saltHash = newUsersModel.setPassword(req.body.password)
        const salt = saltHash.salt
        const hash = saltHash.hash
        console.log(saltHash)

        newUsersModel = {
            fullname: req.body.fullname,
            email: req.body.email,
            hash:hash,
            salt:salt
        }

        newUsersModel.save().then((user)=>{
            console.log("register_post, Alla, did you turn all of these voices on?")
            res.render(`/api/profile/${newUsersModel._id}`,  {sarvar07: user, template:"profile"} )
        }) */

    /*     var user = new usersModel()

        user.fullname = req.body.fullname
        user.email = req.body.email
    
        user.setPassword(req.body.password)
    
        //add the input validation and error handling code
        user.save(function(){
            var token = user.generateJwt()
            res.status(200)
            res.json({
                "token": token
            })
        })

 */

    var user = new UsersModel()

    user.fullname = req.body.fullname
    user.email = req.body.email

    user.setPassword(req.body.password)

    //add the input validation and error handling code
    user.save(function(){
        var token = user.generateJwt()
        res.status(200)
        res.render("profile",  {sarvar07: user, template:"profile"} )
        /* res.json({
            "token": token
        }) */
    })


   }catch{
        res.redirect('/api/register')
   }      
     /*    UsersModel.findById(req.payload._id).exec(function(err,user){
            res.status(200).json(user)
               console.log(`Found a user`)  */
        
        //})
    }


export const func05_loginget = (req,res) =>{
    
    //passport.authenticate('local')
    res.render("login")
    
    console.log(`function_05_loginget ran`)
}

export const func06_loginpost = async (req,res ) =>{
    /*try{
        await UsersModel.findById({_id:req.body._id}, (cluster)=>{
        passport.authenticate('local' , {failureRedirect: '/login'
        , successRedirect: `/profile/${cluster._id}`
        })
      
    }
    )
    //res.render("profile",  {sarvar07: req.body, template:"profile"} )
    console.log(`function_06_loginpost ran`)
    }
     catch{
        console.log(`Error Jang of function 06 `)
    }
    //res.render("profile",  {sarvar07: req.body, template:"profile"} )
     */
 /*    passport.authenticate("local", function (err,user,info){
        var token
        if (err){
            res.status(404).json(err)
            return
        }
        if(user){
            token= user.generateJwt()
            res.status(200)
            res.json({"token": token})
        } else {
            res.status(401).json(info)
        }
    })(req,res)  */  
}

export const func07_profileget = (req,res) =>{

    UsersModel.find({_id:req.params.userid}, (err,cluster)=>{
        if (err){res.status(401).json({"message":"errored world - 07"})}
        else if (cluster.length == 0){
            console.log(`no such a user exists`)
            res.redirect("/")
            console.log(cluster)
        }else if (cluster.length !=0){
            UsersModel.findById(req.params.userid).exec(function(err,user){
                //res.status(200).json(user)
                console.log(cluster.length)
                console.log(user)
                console.log(`Found a user`)
                res.render("profile",  {sarvar07: user, template:"profile"} )
            }) 
            console.log(req.payload)
            console.log(`func07_profileget ran`)
            /* UsersModel.findById(req.payload._id).exec(function(err,user){
                if (err){res.status(401).json({"message":"no auth"})}
                else {
                    //res.render("profile", {sarvar07: user, template:"profile"} )
                    console.log(user)
                    console.log(payload)
                    res.status(200).json(user)
                }                
            })   */         
        }
    }) 
    
}

export const func08_profilepost = (req,res) =>{
    
    console.log(`function_08_profilepost ran`)
}