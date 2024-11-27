import mongoose from "mongoose";
import moment from "moment-timezone";

const messageSchema= new mongoose.Schema({
    id:{
        type:Number,
        unique: true,
    },
    message: {
        type: String,
        required: true,
    },
    ip: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: () => moment().tz("Asia/Kolkata").toDate(),
    },
})

messageSchema.pre("save", async function (next) {
    if (!this.isNew) return next(); // Skip if the document already exists
  
    const lastMessage = await this.constructor.findOne().sort("-id");
    this.id = lastMessage ? lastMessage.id + 1 : 1;
    next();
  });

const message= mongoose.model('Message', messageSchema)


export default message;