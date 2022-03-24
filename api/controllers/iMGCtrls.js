import mongoose from "mongoose"
import { usersSchema } from "../models/iMGusers.js"
import { iMGSchema } from "../models/iMGmodels.js"
import "../config/passport.js"

const UsersModel = mongoose.model("UsersModel", usersSchema, "usersDocs")
const iMGModel = mongoose.model ("iMGModel", iMGSchema, "iMGDocs")

export const func01 = (req,res) =>{
    res.render("index")
    
    console.log(`function 01 ran`)
}

export const func02 = (req,res) =>{
    
    console.log(`function 02 ran`)
}

export const func03 = (req,res) =>{
    res.render("register")
    
    console.log(`registering user ${req.body.emails}`)
}

export const func04 = (req,res) =>{
    
    /* console.log(`function 04 ran`)
    res.json({
        "message": "User registered: "+ req.body.email 
    }) */
    let newUsersModel = new UsersModel(req.body)
    newUsersModel.save((err,cluster)=>{
        if (err){
            console.log(`Hello Errored World`)
            /* res.status(401).json({
                "message" : "unauthorizedError: private profile"
            }) */
            res.redirect("/")
           
        }else{
            //res.render("profile",  {sarvar07: cluster, template:"profile"} )
            res.redirect(`/api/profile/${cluster._id}`)
            //func07(req.body)
        }
       // if (cluster.length !=0){  
        })
     /*    UsersModel.findById(req.payload._id).exec(function(err,user){
            res.status(200).json(user)
               console.log(`Found a user`)  */
        
        //})
    }


export const func05 = (req,res) =>{
    res.render("login")
    
    console.log(`function 05 ran`)
}

export const func06 = (req,res) =>{
    
    console.log(`function 06 ran`)
}

export const func07 = (req,res) =>{

    UsersModel.find({_id:req.params.userid}, (err,cluster)=>{
        if (err){res.status(401).json({"message":"errored world"})}
        else if (cluster.length == 0){
            console.log(`no such a user exists`)
            res.redirect("/")
            console.log(cluster)
        }else if (cluster.length !=0){
          /*   UsersModel.findById(req.params.userid).exec(function(err,user){
                //res.status(200).json(user)
                console.log(cluster.length)
                console.log(user)
                 console.log(`Found a user`)
                res.render("profile",  {sarvar07: user, template:"profile"} )
            })  */
            UsersModel.findById(req.payload._id).exec(function(err,user){
                if (err){res.status(401).json({"message":"no auth"})}
                else {
                    //res.render("profile", {sarvar07: user, template:"profile"} )
                    res.status(200).json(user)
                }                
            })           
        }
    }) 
    
}

export const func08 = (req,res) =>{
    
    console.log(`function 06 ran`)
}