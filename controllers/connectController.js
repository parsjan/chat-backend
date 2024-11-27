import user from "../model/userModal.js";

const connect=async(req,res)=>{
    console.log(req.ip);  
    const ip=req.ip;
    const result=new user({
        ip:ip,
        flag:true
    })
}

export default connect;