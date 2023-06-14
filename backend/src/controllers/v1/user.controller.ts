import { Request, Response, NextFunction } from "express";
import UserService from "../../services/user.service";
import { UserModel } from "../../models/user/user.model";
const insertUser = async (req: Request, res: Response, next: NextFunction) => {
    let userService = new UserService(new UserModel());
    try{
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
const getReviewers = async (req:Request,res:Response, next:NextFunction) => {
    let userService = new UserService(new UserModel());
    try{
        let user = await userService.getReviewers();
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
const proposeReviewer = async (req:Request,res:Response,next:NextFunction) => {
    let userService = new UserService(new UserModel());
    try {
        let response = await userService.proposeReviewer(req.body);
        return res.send({
            success: true,
            proposalId: response
        })
    }catch (e){
        console.log(e);
        return next(e)
    }
}
const voteReviewer = async (req:Request,res:Response,next:NextFunction) => {
    let userService = new UserService(new UserModel());
    try {
        let response = await userService.voteReviewer(req.body);
        return res.send({
            success: true,
            proposalState: response
        })
    }catch (e){
        console.log(e);
        return next(e)
    }
}
const queueReviewer = async (req:Request,res:Response,next:NextFunction) => {
    let userService = new UserService(new UserModel());
    try {
        let response = await userService.queueReviewer(req.body);
        return res.send({
            success: true,
            newReputationValue: response
        })
    }catch (e){
        console.log(e);
        return next(e)
    }
}
const executeReviewer = async (req:Request,res:Response,next:NextFunction) => {
    let userService = new UserService(new UserModel());
    try {
        let response = await userService.executeReviewer(req.body);
        return res.send({
            success: true,
            newReputationValue: response
        })
    }catch (e){
        console.log(e);
        return next(e)
    }
}
export {
    insertUser, getReviewers, proposeReviewer, voteReviewer, executeReviewer, queueReviewer
}
