const mongoose = require("mongoose");

const MONGO_URI='mongodb+srv://xyz123:OPnQXI1NAUz45TsY@jwtpractice.yk8b3q9.mongodb.net/?retryWrites=true&w=majority';

exports.connect = () =>{
    mongoose.set('strictQuery', true)
    mongoose.connect(MONGO_URI).then(
        ()=>{
            
            console.log('successful database');
        }
    ).catch((error)=>{
        console.log(error);
        process.exit(1);
    })

};