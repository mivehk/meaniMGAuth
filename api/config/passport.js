import mongoose from "mongoose"
import passport from "passport"
import {Strategy as LocalStrategy} from "passport-local"
import { usersSchema } from "../models/iMGusers.js"
import bcrypt from "bcrypt"
//import { verify } from "crypto"
//import passportLocalMongoose from "passport-local-mongoose"

const usersModel = mongoose.model("usersModel", usersSchema, "usersDocs")


//usersModel.plugin(passportLocalMongoose)
//passport.use(usersModel.createStrategy())  

//export const passp =() =>{
export const initialize2 = (passport) =>{

    passport.use( 
        
    
    new LocalStrategy (
         {usernameField : "email"},
    //}, 
        function(email, password, done) {
            usersModel.findOne({ email: email }, function (err, user) {
                if (err) { return done(err)} 
                if (!user) {
                    return done(null, false, {
                        message: "User not found"
                    })
                } 
            const isValid= user.verifyPassword (password , user.hash , user.salt); 
                if (!isValid) {
                    return done(null, false, {
                        message: 'password is wrong'
                    })
                }
                return done(null, user)
            })
        }))

    passport.serializeUser((user, done) => done(null, user.id))
 
    passport.deserializeUser((id, done) => {
        usersModel.findById(id, (err,user) =>{
            if (err){
                return done(err)
            }
        })
        return done(null, user)
        })


}

//export default initialize
//}

/* const touchTwo = async _=>{
    return 2;
}

const touchThree = async _ =>{
    const two = await touchTwo()
}

touchThree() */
