import { Request, Response, NextFunction } from "express";
import { LightHouseService } from "../../services/lighthouse.service";

const uploadVolume = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let lightHouseService = new LightHouseService();
  try {
    let payload = req.body
    let response = await  lightHouseService.uploadVolume(payload.filename)
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

export {uploadVolume}