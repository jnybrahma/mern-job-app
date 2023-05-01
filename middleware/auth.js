import jwt from 'jsonwebtoken'
import { UnAuthenticatedError } from "../errors/index.js"

const auth = async(req, res, next) => {
    // const headers = req.headers
    const authHeader = req.headers.authorization
        //  console.log(headers)
        // console.log(authHeader)
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        // actually 401 
        throw new UnAuthenticatedError('Authenication Invalid')
    }
    const token = authHeader.split(' ')[1]
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
            //req.user = payload
            //console.log(payload)
        req.user = { userId: payload.userId }
        next()
    } catch (error) {
        throw new UnAuthenticatedError('Authentication invalid')
    }

}

export default auth