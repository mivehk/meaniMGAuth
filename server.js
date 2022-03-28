import express from "express"
import routes from "./api/routes/iMGRoutes.js"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import path from "path"
import passport from "passport"



import { fileURLToPath } from "url"
import {dirname} from "path"
//import { markAsUntransferable } from "worker_threads"


const __filename=fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

let coffeTime = Date.now()
let after = (hereis) => {console.log(`${hereis} \n Elapsed: ${ Date.now()- coffeTime}`)}

const app= express()
const port = 6789

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/iMGAuthdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(passport.initialize())


routes(app)


app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "./views/"))


app.use(express.static(path.join(__dirname,"./public")))

app.listen(port, ()=>{
    console.log(`Your Server is Running on Port ${port}`)
})

after ("server.js ran");