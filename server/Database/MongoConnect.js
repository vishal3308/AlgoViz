
const mongoose=require('mongoose');
module.exports=mongoose.connect('mongodb://localhost:27017/Algoviz')
// module.exports=mongoose.connect('mongodb+srv://vishal:vishalma@algoviz.h4qla.mongodb.net/?retryWrites=true&w=majority')
.catch(err=>{
    console.log("Connection Error: ",err)
});