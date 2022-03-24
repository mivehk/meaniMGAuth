import mongoose from "mongoose"
import passport from "passport"
import LocalStrategy from "passport-local"
import { usersSchema } from "../models/iMGusers.js"

const usersModel = mongoose.model("usersModel", usersSchema, "usersDocs")

//export const passp =() =>{

passport.use( new LocalStrategy.Strategy({
    usernameField : "email"
},
function (username, password, done){
    usersModel.findOne({ email: username}, function (err, user){
        if (err){return done(err)}
        if (!user){
            return done (null, false,{
                message: "User not found"
            })
        }
        if (!user.validPassword(password)){
            return done (null, false, {
                message: 'password is wrong'
            })   
        }
        return done(null, user)
    })
}
))

//}
