import mongoose from 'mongoose';

const driverScema = new mongoose.Schema({

    username : {type : String, required : true},
    email : {type :String, required : true, unique : true},
    phone_num : {type : String, required : true, unique : true},
    password : {type : String, required : true}
}, {timestamps : true});

export default mongoose.model('Driver', driverScema);