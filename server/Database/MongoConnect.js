const dotenv=require('dotenv');
dotenv.config();
const mongoose=require('mongoose');
// module.exports=mongoose.connect('mongodb://localhost:27017/Algoviz')
module.exports=mongoose.connect(process.env.MONGO_URL).then(()=>console.log("Online database Connected"))
.catch(err=>{
    console.log("Connection Error: ",err)
});