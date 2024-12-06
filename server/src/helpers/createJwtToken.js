import jwt from 'jsonwebtoken'

const creeateJwtToken=(id)=>{
return jwt.sign({id},process.env.JWT_SECRET)
}


const verifyToken = (token)=>{
return jwt.verify(token,process.env.JWT_SECRET)
}
export  {creeateJwtToken,verifyToken}