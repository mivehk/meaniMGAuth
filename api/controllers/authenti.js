import passport from "passport"
import mongoose from "mongoose"
import { usersSchema } from "../models/iMGusers.js"
import { PatientsSchema, BMPSchema } from "../models/iMGmodels.js"
import { initialize2 } from "./../../api/config/passport.js"
import {func07_profileget} from "./iMGCtrls.js"

const usersModel = mongoose.model(`usersDocs`, usersSchema , `usersDocs`)

/* var sendJSONresponse = function(res, status, content){
    res.status(status)
    res.json(content)
}
 */
initialize2(passport)
 //func07_profileget()

export const register = (req,res)=>{

    let usn1= req.body.email
    let usn= usn1.split("@")[0]
    
    const PModel = mongoose.model(`${usn}Patient` , PatientsSchema, `${usn}Patient`);
    const BMPModel = mongoose.model(`${usn}BMP`, BMPSchema ,`${usn}BMP`);
    
    var user = new usersModel()

    user.fullname = req.body.fullname
    user.email = req.body.email

    user.setPassword(req.body.password)

    //add the input validation and error handling code
    user.save(function(){
        var token = user.generateJwt()
        res.status(200)
        res.render(`/api/profile/${user._id}`,  {sarvar07: user, template:"profile"} )
        res.json({
            "token": token
        })

    })
}

export const login = (req,res) =>{
    passport.authenticate("local", function (err,user,info){
        var token
        if (err){
            res.status(404).json(err)
            return
        }
        if(user){
            //token= user.generateJwt()
            res.status(200)
            
            //res.json({"token": token})
           res.render(`profile`,  {sarvar07: user, template:"profile"} )
        } else {
            res.status(401).json(info)
        }
    })
    (req,res)
    
    //next()

}
//func07_profileget(req,res)
/* export const func07_profileget = (req,res) =>{

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
       /* }
    }) 
    
} */