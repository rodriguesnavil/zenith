import { Request, Response, NextFunction } from "express";
import UserService from "../../services/user.service";
import { UserModel } from "../../models/user/user.model";
const insertUser = async (req: Request, res: Response, next: NextFunction) => {
    let userService = new UserService(new UserModel());
    try{
        console.log("I am here")
        let payload = req.body
        let user = await userService.upsertUser(payload);
        return res.send({
            success: true,
            data: {
                user
            }
        })
    }catch (e){
        console.log(e);
        return next(e)
    }
}

export {
    insertUser
}
