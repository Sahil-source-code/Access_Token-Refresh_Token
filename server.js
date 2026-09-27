import app from "./src/app/app.js"
import connectDB from "./src/config/db.js"

app.listen(3000,(req,res)=>{
    console.log("server running on port")
})
await connectDB()