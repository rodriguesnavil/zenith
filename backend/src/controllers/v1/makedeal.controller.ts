import { Request, Response,NextFunction } from "express";
import MakeDealService from "../../services/makeDeal.service"

const makeDeal = async (req:Request,res:Response,next:NextFunction) => {
    try{
    let makeDealService = new MakeDealService()
    let payload = req.body
    let response = await makeDealService.makeDeal(payload)
    return res.send({
        success: true,
        data: {
            response,
        },
      });
    } catch (e) {
      console.log(e);
      return next(e);
    }
  };
export {makeDeal}