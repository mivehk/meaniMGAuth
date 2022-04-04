import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import crypto from "crypto"

export const usersSchema = new mongoose.Schema({

   /*  _id:{
        type:mongoose.Schema.Types.ObjectId
    }, */
    fullname:{
        type: String,
        required: true

    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    hash: String,
    salt: String,
    

}, {collection: 'usersDocs'})

 usersSchema.methods.setPassword= function(password){
    this.salt= crypto.randomBytes(16).toString('hex')
    this.hash =crypto.pbkdf2Sync (password , this.salt, 1000, 64, 'sha512').toString('hex')
}

usersSchema.methods.verifyPassword= function(password){
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex')
    return this.hash === hash
}

usersSchema.methods.generateJwt= function(){
    var expiry= new Date()
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
    _id: this._id,
    email: this.email,
    fullname: this.fullname,
    exp: parseInt(expiry.getTime() / 1000),
    }, "MY_SECRET" )   //Better to keep my secret local env, not in DB 
}