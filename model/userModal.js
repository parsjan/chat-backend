import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    ip: {
        type: String,
        required: true,
    },
    flag: {
        type: Boolean,
        required: true,
    }
})

const User = mongoose.model('User', userSchema);

export default User;