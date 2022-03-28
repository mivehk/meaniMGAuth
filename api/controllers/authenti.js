import passport from "passport"
import mongoose from "mongoose"
import { usersSchema } from "../models/iMGusers.js"

const usersModel = mongoose.model("usersModel", usersSchema , "usersDocs")


/* var sendJSONresponse = function(res, status, content){
    res.status(status)
    res.json(content)
}
 */

export const register = (req,res)=>{
    var user = new usersModel()

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
}

export const login = (req,res) =>{
    passport.authenticate("local", function (err,user,info){
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
    })(req,res)
}