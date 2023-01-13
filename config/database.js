const mongoose = require("mongoose");

const MONGO_URI=MONGOKEY;

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
