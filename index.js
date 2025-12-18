let mongoose = require("mongoose")
let express = require("express")
let cors = require("cors")
const rt = require("./routes/rt")
mongoose.connect("mongodb+srv://ksaditya444_db_user:tV5HzSlkfuGPI6CX@cluster0.aue1cul.mongodb.net/?appName=Cluster0").then(() => {
    console.log("ok")
}).catch((err) => {
    console.log(err)
})
let app = express()
app.use(express.json())
app.use(cors())
app.use("/", rt)
app.listen(5000, () => {
    console.log("server running on 5000")
})